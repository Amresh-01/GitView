import React, { useState } from "react";
import {
  Github,
  Search,
  ExternalLink,
  BookOpen,
  Star,
  Users,
  Eye,
  Calendar,
  GitFork,
} from "lucide-react";

const GitHubExplorer = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchUserData = async (username) => {
    setLoading(true);
    setError("");
    setSearchPerformed(true);

    try {
      // Fetch user profile
      const userResponse = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userResponse.ok) {
        throw new Error(
          userResponse.status === 404
            ? "User not found"
            : "Failed to fetch user data, As Api is rate limited. Please try again later."
        );
      }
      const userData = await userResponse.json();

      // Fetch user repositories
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
      );
      if (!reposResponse.ok) {
        throw new Error("Failed to fetch repositories");
      }
      const reposData = await reposResponse.json();

      setUser(userData);
      setRepositories(reposData);
    } catch (err) {
      setError(err.message);
      setUser(null);
      setRepositories([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRepos = async (username) => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`
    );
    const repos = await res.json();

    return repos.filter((repo) => !repo.fork && !repo.archived);
  };

  const fetchLanguageStats = async (username) => {
    const repos = await fetchRepos(username);
    const languageBytes = {};

    for (const repo of repos) {
      const res = await fetch(repo.languages_url);
      const langData = await res.json();

      for (const [lang, bytes] of Object.entries(langData)) {
        languageBytes[lang] = (languageBytes[lang] || 0) + bytes;
      }
    }

    const totalBytes = Object.values(languageBytes).reduce((a, b) => a + b, 0);
    const percentages = Object.entries(languageBytes).map(([lang, bytes]) => [
      lang,
      (bytes / totalBytes) * 100,
    ]);

    return percentages.sort((a, b) => b[1] - a[1]);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (username.trim()) {
      fetchUserData(username.trim());
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getLanguageStats = () => {
    if (!repositories.length) return {};

    const languageCounts = {};
    repositories.forEach((repo) => {
      if (repo.language) {
        languageCounts[repo.language] =
          (languageCounts[repo.language] || 0) + 1;
      }
    });

    return Object.entries(languageCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  };

  const getTotalStars = () => {
    return repositories.reduce(
      (total, repo) => total + repo.stargazers_count,
      0
    );
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-200 rounded-lg p-6 mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 bg-gray-300 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 rounded w-48"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-300 rounded"></div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-4">
            <div className="h-6 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 bg-gray-300 rounded mb-3 w-3/4"></div>
            <div className="flex space-x-4">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <Github className="w-12 h-12 text-white mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              GitView
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Discover public repositories and developer profiles
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white w-5 h-5" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
                placeholder="Enter GitHub username..."
                className="w-full pl-10 pr-4 py-3 border text-white bg-transparent border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !username.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            <p className="font-medium">Error: {error}</p>
          </div>
        )}

        {loading && <LoadingSkeleton />}

        {/* Results */}
        {!loading && searchPerformed && !error && user && (
          <div className="space-y-8">
            {/* User Profile Dashboard */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <img
                  src={user.avatar_url}
                  alt={user.name || user.login}
                  className="w-24 h-24 rounded-full border-4 border-blue-100"
                />
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                    {user.name || user.login}
                  </h2>
                  <p className="text-gray-600 mb-2">@{user.login}</p>
                  {user.bio && <p className="text-gray-700 mb-3">{user.bio}</p>}
                  {user.location && (
                    <p className="text-gray-600">📍 {user.location}</p>
                  )}
                  {user.blog && (
                    <a
                      href={
                        user.blog.startsWith("http")
                          ? user.blog
                          : `https://${user.blog}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-1"
                    >
                      🌐 Website <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 text-center">
                  <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-blue-800">
                    {user.public_repos}
                  </p>
                  <p className="text-blue-600 text-sm font-medium">
                    Repositories
                  </p>
                </div>
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 text-center">
                  <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-yellow-800">
                    {getTotalStars()}
                  </p>
                  <p className="text-yellow-600 text-sm font-medium">
                    Total Stars
                  </p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-green-800">
                    {user.followers}
                  </p>
                  <p className="text-green-600 text-sm font-medium">
                    Followers
                  </p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 text-center">
                  <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-purple-800">
                    {user.following}
                  </p>
                  <p className="text-purple-600 text-sm font-medium">
                    Following
                  </p>
                </div>
              </div>
            </div>

            {/* Language Stats */}

            <img
              src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&hide_border=true&title_color=00d4ff&text_color=c9d1d9&bg_color=0d1117`}
              alt="Top Languages"
              className="rounded-xl shadow-lg w-full max-w-xs h-auto object-contain mx-auto"
            />

            {/* Repositories */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Public Repositories ({repositories.length})
              </h3>

              {repositories.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No public repositories found</p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {repositories.map((repo) => (
                    <div
                      key={repo.id}
                      className="bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-semibold text-gray-800 line-clamp-1">
                            <a
                              href={repo.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-blue-600 transition-colors"
                            >
                              {repo.name}
                            </a>
                          </h4>
                          {repo.language && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              {repo.language}
                            </span>
                          )}
                        </div>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {repo.description || "No description available"}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <Star className="w-4 h-4 mr-1" />
                              {repo.stargazers_count}
                            </span>
                            <span className="flex items-center">
                              <GitFork className="w-4 h-4 mr-1" />
                              {repo.forks_count}
                            </span>
                          </div>
                          <span className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {formatDate(repo.updated_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* main when search is not available */}
        {!loading && !searchPerformed && (
          <div className="text-center py-16">
            <Github className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              Ready to explore GitHub?
            </h2>
            <p className="text-gray-500">
              Enter a GitHub username to discover their repositories and profile
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GitHubExplorer;
