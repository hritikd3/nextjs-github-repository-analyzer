# GitHub Repository Analyzer 🚀

A stunning, interactive web application that analyzes GitHub repositories and presents comprehensive insights through beautiful visualizations. Built with Next.js 14, TypeScript, and modern web technologies.

![GitHub Repository Analyzer](https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop)

## ✨ Features

### 🔍 Repository Analysis
- **Smart URL Parsing**: Automatically extracts owner/repo from any GitHub URL format
- **Comprehensive Data Fetching**: Repository details, languages, contributors, commits, and file structure
- **Real-time Processing**: Live analysis with beautiful loading animations

### 📊 Interactive Visualizations
- **Technology Stack Radar**: Interactive radar chart showing language distribution
- **Contribution Heatmap**: GitHub-style activity visualization for the last 365 days
- **Dependency Graph**: Force-directed D3.js graph showing file relationships
- **Contributor Statistics**: Bar charts and rankings of top contributors
- **Repository Overview**: Key metrics with animated counters and badges

### 🎨 Design & UX
- **Futuristic Dark Theme**: Cyber-inspired design with neon accents and glowing effects
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Glass Morphism**: Modern UI with backdrop blur and transparency effects
- **Responsive Design**: Optimized for all screen sizes from mobile to desktop
- **Interactive Elements**: Hover states, loading spinners, and dynamic feedback

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Data Visualization**: D3.js
- **UI Components**: Radix UI + shadcn/ui
- **API Integration**: GitHub REST API via Octokit
- **Font**: Poppins (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- GitHub Personal Access Token

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-repository-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure GitHub Token**
   
   Create a `.env.local` file in the root directory:
   ```env
   GITHUB_TOKEN=your_github_personal_access_token_here
   ```

   To get a GitHub token:
   - Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
   - Generate a new token with `public_repo` scope
   - Copy the token to your `.env.local` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📖 Usage

1. **Enter Repository URL**: Paste any GitHub repository URL in the input field
   - Full URLs: `https://github.com/owner/repo`
   - Short format: `owner/repo`

2. **View Analysis**: The app will fetch and display:
   - Repository statistics (stars, forks, issues, etc.)
   - Technology stack breakdown
   - Contributor rankings and statistics
   - Commit activity heatmap
   - File dependency visualization
   - AI-generated summary with smart badges

3. **Interact with Visualizations**:
   - Hover over chart elements for detailed information
   - Drag nodes in the dependency graph
   - Click on contributor profiles to view their GitHub pages

## 🏗️ Project Structure

```
├── app/
│   ├── api/github/          # GitHub API route
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main page component
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── ContributionHeatmap.tsx
│   ├── ContributorStats.tsx
│   ├── DependencyGraph.tsx
│   ├── LoadingSpinner.tsx
│   ├── RepositoryDashboard.tsx
│   ├── RepositoryInput.tsx
│   ├── RepositoryOverview.tsx
│   └── TechStackRadar.tsx
├── lib/
│   ├── github.ts            # GitHub API utilities
│   └── utils.ts             # General utilities
├── types/
│   └── github.ts            # TypeScript type definitions
└── .env.local               # Environment variables
```

## 🎯 Key Components

### RepositoryInput
- Beautiful input form with validation
- Loading states and error handling
- Gradient buttons with hover effects

### RepositoryOverview
- Repository metadata and statistics
- Owner information and links
- Smart badges based on repository metrics

### TechStackRadar
- Interactive radar chart using Recharts
- Language percentage calculations
- Gradient fills and animations

### ContributionHeatmap
- GitHub-style contribution visualization
- 365-day activity tracking
- Interactive hover tooltips

### DependencyGraph
- Force-directed graph using D3.js
- Draggable nodes and dynamic connections
- File type differentiation

### ContributorStats
- Top contributor rankings
- Interactive bar charts
- Avatar integration and profile links

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | Yes |

### GitHub Token Permissions

Your GitHub token needs the following scopes:
- `public_repo` - Access to public repositories

## 🎨 Customization

### Theme Colors
The app uses a custom color palette defined in `tailwind.config.ts`:
- Primary: Cyan (`#38bdf8`)
- Secondary: Purple (`#a855f7`)
- Background: Dark gradients
- Accents: Neon effects

### Animations
Framer Motion configurations can be customized in individual components:
- Entry animations with staggered delays
- Hover effects and micro-interactions
- Loading state animations

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `GITHUB_TOKEN` environment variable in Vercel dashboard
4. Deploy automatically

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for repository data
- [Recharts](https://recharts.org/) for beautiful chart components
- [D3.js](https://d3js.org/) for advanced data visualizations
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [shadcn/ui](https://ui.shadcn.com/) for accessible UI components

## 🐛 Troubleshooting

### Common Issues

**"Failed to fetch repository data"**
- Verify your GitHub token is correctly set in `.env.local`
- Ensure the repository URL is valid and accessible
- Check if you've hit GitHub API rate limits

**Charts not rendering**
- Ensure all required dependencies are installed
- Check browser console for JavaScript errors
- Verify the data structure matches expected formats

**Styling issues**
- Clear browser cache and restart development server
- Ensure Tailwind CSS is properly configured
- Check for conflicting CSS rules

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify your GitHub token has the correct permissions
3. Ensure the repository you're analyzing is public
4. Try with a different repository to isolate the issue

---

Built with ❤️ using Next.js 14 and modern web technologies