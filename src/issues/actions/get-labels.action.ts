import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { GithubLabel } from '../interfaces';

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1.5);
  const { data } = await githubApi.get<GithubLabel[]>('/labels?per_page=100');

  return data;
};
