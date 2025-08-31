export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string;
  languages_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export interface GitHubLanguages {
  [key: string]: number;
}

export interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

export interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
}

export interface GitHubContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  size?: number;
  download_url?: string;
}

export interface AnalyzedRepo {
  repo: GitHubRepo;
  languages: GitHubLanguages;
  contributors: GitHubContributor[];
  recentCommits: GitHubCommit[];
  contents: GitHubContent[];
  summary: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'dir';
  path: string;
  size?: number;
  connections: string[];
}

export interface CommitActivity {
  date: string;
  count: number;
  level: number;
}

export interface AnalyzedRepo {
  repo: GitHubRepo;
  languages: GitHubLanguages;
  contributors: GitHubContributor[];
  recentCommits: GitHubCommit[];
  contents: GitHubContent[];
  summary: string;
  commitActivity: CommitActivity[];
}