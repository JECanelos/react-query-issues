import { useInfiniteQuery } from '@tanstack/react-query';

import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { Issue, State } from '../interfaces';

interface Params {
  state?: State;
  labels: string[];
  page?: number;
}

interface QueryParams {
  pageParam?: number;
  queryKey: (string | Params)[];
}

const getIssues = async ({ pageParam = 1, queryKey }: QueryParams): Promise<Issue[]> => {
  await sleep(2);

  const [, args] = queryKey;
  const { state, labels } = args as Params;

  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));
  params.append('page', pageParam.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssuesInfinite = ({ state, labels }: Params) => {
  const issuesQuery = useInfiniteQuery(
    ['issues', { state, labels }],
    getIssues,
    { getNextPageParam: (lastPage, pages) => lastPage.length > 0 ? pages.length + 1 : undefined }
  );

  return {
    issuesQuery,
  };
};
