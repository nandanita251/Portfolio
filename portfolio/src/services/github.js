import axios from 'axios';

// The target GitHub username
const GITHUB_USERNAME = 'nandanita251';
const BASE_URL = 'https://api.github.com';

/**
 * Fetches the most recently updated repositories for the user.
 * @param {number} limit - Number of repositories to fetch (default: 6)
 * @returns {Promise<Array>} Array of repository objects
 */
export const fetchRepositories = async (limit = 6) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    throw error;
  }
};