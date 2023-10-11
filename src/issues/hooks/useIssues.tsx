import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { Issue, State } from '../interfaces';

interface Params {
  state?: State;
  labels: string[];
  page?:  number;
}

const getIssues = async ({ labels, state, page = 1 }: Params): Promise<Issue[]> => {
  await sleep(2);

  const params = new URLSearchParams();
  if (state) params.append('state', state);
  if (labels.length > 0) params.append('labels', labels.join(','));
  params.append('page', page.toString());
  params.append('per_page', '5');

  const { data } = await githubApi.get<Issue[]>('/issues', { params });
  return data;
};

export const useIssues = ({ state, labels }: Params) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [state, labels]);

  const issuesQuery = useQuery(
    ['issues', { state, labels, page }],
    () => getIssues({ labels, state, page })
  );

  const prevPage = () => {
    if (page > 1) setPage(page => page - 1);
  };

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page => page + 1);
  };

  return {
    // Properties
    issuesQuery,

    // Getter
    page,

    // Methods
    prevPage,
    nextPage,
  };
};
