import { NextRequest, NextResponse } from 'next/server';
import { fetchRepoData, fetchRepoContents, generateRepoSummary, parseGitHubUrl } from '@/lib/github';
import { CommitActivity } from '@/types/github';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Repository URL is required' }, { status: 400 });
    }

    console.log('Received URL:', url);

    const parsed = parseGitHubUrl(url);
    if (!parsed) {
      return NextResponse.json({ error: 'Invalid GitHub URL format' }, { status: 400 });
    }

    const { owner, repo } = parsed;
    console.log('Parsed owner/repo:', owner, repo);

    // Check if GitHub token is available
    if (!process.env.GITHUB_TOKEN) {
      console.error('GitHub token not found in environment variables');
      return NextResponse.json({ error: 'GitHub token not configured' }, { status: 500 });
    }

    // Fetch all repository data
    const repoData = await fetchRepoData(owner, repo);
    const contents = await fetchRepoContents(owner, repo);

    // Generate summary
    const summary = generateRepoSummary(repoData);

    // Process commit activity for heatmap
    const commitActivity: CommitActivity[] = processCommitActivity(repoData.commits);

    const response = {
      repo: repoData.repo,
      languages: repoData.languages,
      contributors: repoData.contributors,
      recentCommits: repoData.commits.slice(0, 10),
      contents: contents,
      summary,
      commitActivity,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('GitHub API Error:', error);
    
    if (error.message?.includes('Not Found')) {
      return NextResponse.json({ error: 'Repository not found' }, { status: 404 });
    }
    
    if (error.message?.includes('rate limit') || error.message?.includes('403')) {
      return NextResponse.json({ error: 'Rate limit exceeded or access denied' }, { status: 403 });
    }

    return NextResponse.json({ 
      error: 'Failed to fetch repository data', 
      details: error.message 
    }, { status: 500 });
  }
}

function processCommitActivity(commits: any[]): CommitActivity[] {
  const activityMap = new Map<string, number>();
  
  commits.forEach(commit => {
    const date = new Date(commit.commit.author.date).toISOString().split('T')[0];
    activityMap.set(date, (activityMap.get(date) || 0) + 1);
  });

  const activity = [];
  const now = new Date();
  
  // Generate last 365 days
  for (let i = 364; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split('T')[0];
    const count = activityMap.get(dateStr) || 0;
    
    activity.push({
      date: dateStr,
      count,
      level: count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 10 ? 3 : 4,
    });
  }

  return activity;
}