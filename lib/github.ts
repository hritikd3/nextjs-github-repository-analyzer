import { Octokit } from 'octokit';
import { GitHubRepo, GitHubLanguages, GitHubContributor, GitHubCommit, GitHubContent } from '@/types/github';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)/,
    /^([^\/]+)\/([^\/]+)$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      const [, owner, repo] = match;
      return { 
        owner: owner.trim(), 
        repo: repo.replace(/\.git$/, '').trim() 
      };
    }
  }

  return null;
}

export async function fetchRepoData(owner: string, repo: string) {
  try {
    console.log(`Fetching data for ${owner}/${repo}`);
    
    const [repoResponse, languagesResponse, contributorsResponse, commitsResponse] = await Promise.all([
      octokit.rest.repos.get({ owner, repo }),
      octokit.rest.repos.listLanguages({ owner, repo }),
      octokit.rest.repos.listContributors({ owner, repo, per_page: 10 }),
      octokit.rest.repos.listCommits({ owner, repo, per_page: 100 }),
    ]);

    return {
      repo: repoResponse.data,
      languages: languagesResponse.data,
      contributors: contributorsResponse.data,
      commits: commitsResponse.data,
    };
  } catch (error: any) {
    console.error('Error fetching GitHub data:', error);
    throw new Error(`GitHub API Error: ${error.message}`);
  }
}

export async function fetchRepoContents(owner: string, repo: string, path: string = '') {
  try {
    const response = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error: any) {
    console.error('Error fetching repo contents:', error);
    return [];
  }
}

export function generateRepoSummary(repoData: any): string {
  const { repo, languages, contributors } = repoData;
  const primaryLanguage = Object.keys(languages)[0] || 'Unknown';
  const contributorCount = contributors.length;
  
  const badges = [];
  
  if (repo.stargazers_count > 1000) badges.push('⭐ Popular');
  if (repo.forks_count > 100) badges.push('🍴 Well-Forked');
  if (contributorCount > 5) badges.push('👥 Collaborative');
  if (repo.open_issues_count < 10) badges.push('🧹 Clean Issues');
  
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceUpdate < 7) badges.push('🔥 Active');
  
  return `A ${primaryLanguage} project with ${repo.stargazers_count} stars and ${contributorCount} contributors. ${badges.join(' • ')}`;
}