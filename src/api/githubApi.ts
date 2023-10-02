import axios from 'axios';

export const githubApi = axios.create({
  baseURL: 'https://api.github.com/repos/facebook/react',
  headers: {
    Authorization: `Bearer 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`,
  },
});
