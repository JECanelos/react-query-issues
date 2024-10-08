import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { GithubIssue, State } from '../interfaces';

export const getIssues = async (
  state: State,
  labels: string[],
  page: number,
  per_page: number
): Promise<GithubIssue[]> => {
  await sleep(1.5);

  const params = new URLSearchParams();
  params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));
  params.append('page', page.toString());
  params.append('per_page', per_page.toString());
  const { data } = await githubApi.get<GithubIssue[]>('/issues', { params });

  return data;
};
