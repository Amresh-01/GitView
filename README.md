# GitView - https://gitview1.netlify.app/


![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
[![GitHub API](https://img.shields.io/badge/GitHub-API-black?style=for-the-badge&logo=github)](https://docs.github.com/en/rest)

A Real-time GitHub Explorer application built with React that provides live repository search, user profiles, and comprehensive GitHub data using the GitHub API.

## 📸 Screenshots

### Desktop View

<img width="1365" height="678" alt="desktop-landing-page" src="https://github.com/user-attachments/assets/4964ebdb-7fbd-44db-8d42-c730af3ab5b4" />
<img width="1365" height="680" alt="desktop-repo-page" src="https://github.com/user-attachments/assets/2616f1ff-e984-4769-93fd-4e8c34a4b58c" />
<img width="1365" height="682" alt="desktop-repo" src="https://github.com/user-attachments/assets/dd692330-f125-40a3-8189-702e11ccd568" />


### Mobile View

<img width="199" height="442" alt="mobile-repo" src="https://github.com/user-attachments/assets/816edcf2-fb16-47fa-a883-c48053f5d1dc" />
<img width="201" height="442" alt="Mobile-landing-page" src="https://github.com/user-attachments/assets/a31f1c8a-de99-44ee-910b-8e6504d971bf" />


### Live Demo
🚀 [View Live Application](https://gitview1.netlify.app/)

## 🚀 Features

- 🔍 **Real-time Repository Search**: Instantly search GitHub repositories with live results
- 👤 **User Profile Explorer**: View comprehensive user profiles and statistics
- 🏢 **Organization Insights**: Browse organization repositories and member data
- 📊 **Repository Analytics**: Stars, forks, issues, and contribution data
- 🌟 **Trending Repositories**: Discover popular and trending projects
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- ⚡ **Fast Performance**: Built with Vite for optimal loading speeds
- 🎨 **Clean UI**: Modern and intuitive user interface

## 🛠️ Technologies Used

- **Frontend Framework**: React.js
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **API**: GitHub REST API v3
- **HTTP Client**: Axios/Fetch API
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router DOM


## 🖥️ Usage

1. **Search Repositories**: Use the search bar to find repositories by name, description, or topics
2. **View Repository Details**: Click on any repository to see detailed information, file structure, and statistics
3. **Explore User Profiles**: Search for users and view their repositories, contributions, and activity
4. **Browse Organizations**: Discover organizations and their public repositories
5. **Filter Results**: Apply filters for language, stars, creation date, and more

## 🌐 API Reference

This application uses the [GitHub REST API](https://docs.github.com/en/rest) to fetch repository and user data.

### Key Endpoints Used:
- `GET /search/repositories` - Search for repositories
- `GET /search/users` - Search for users
- `GET /users/{username}` - Get user profile information
- `GET /repos/{owner}/{repo}` - Get repository details
- `GET /users/{username}/repos` - Get user repositories

**Rate Limits**:
- **Authenticated requests**: 5,000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

## 📁 Project Structure

```
GitView/
├── public/
│   └── index.html
├── screenshots/
│   ├── desktop-view.png
│   ├── mobile-view.png
│   ├── search-feature.png
│   └── video-thumbnail.png
├── demo/
│   └── gitview-demo.mp4
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── SearchBar/
│   │   ├── RepositoryCard/
│   │   ├── UserProfile/
│   │   └── FilterPanel/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Repository/
│   │   ├── User/
│   │   └── Search/
│   ├── services/
│   │   └── githubApi.js
│   ├── hooks/
│   │   ├── useGitHub.js
│   │   └── useDebounce.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Available Scripts

In the project directory, you can run:

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint to check code quality

## 🎯 Key Features Implementation

  Real-time Repository Search
 
  User Profile Fetching

  Tailwind CSS Configuration

## 📊 Data Displayed

### Repository Information
- **Repository Name & Description**
- **Programming Language**
- **Stars, Forks, and Watchers Count**
- **Open Issues Count**
- **Last Updated Date**
- **License Information**
- **Owner/Organization Details**

### User Profile Data
- **Profile Picture & Bio**
- **Follower/Following Count**
- **Public Repository Count**
- **Location & Company**
- **GitHub Join Date**
- **Contribution Activity**


## 🔧 Customization

You can customize the application by:

- Adding more search filters (date range, file size, etc.)
- Implementing repository comparison features
- Adding code visualization and analysis
- Implementing starred repositories tracking
- Adding trending topics and languages
- Creating repository bookmarking functionality

## 🚀 Deployment

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to Netlify

3. Add environment variables in Netlify dashboard:
   - `VITE_GITHUB_TOKEN`: Your GitHub Personal Access Token

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Add environment variables in Vercel dashboard

## 🔐 Environment Variables

```bash
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_API_BASE_URL=https://api.github.com
```

**Security Note**: Never commit your `.env` file to version control. The GitHub token should be kept private.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
