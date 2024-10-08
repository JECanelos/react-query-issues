import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { GithubIssue } from '../interfaces';

export const getIssueComments = async (issueNumber: number): Promise<GithubIssue[]> => {
  await sleep(1.5);
  const { data } = await githubApi.get<GithubIssue[]>(`/issues/${issueNumber}/comments`);

  return data;
};
