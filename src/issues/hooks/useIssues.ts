import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getIssues } from '../actions';
import { State } from '../interfaces';

interface Options {
  labels: string[];
  state: State;
  per_page?: number;
}

export const useIssues = ({ state, labels, per_page = 5 }: Options)  => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, labels: labels.sort(), page, per_page }],
    queryFn: () => getIssues(state, labels, page, per_page),
    staleTime: 1000 * 60, // 1 minute
  });

  useEffect(() => setPage(1), [state]);
  useEffect(() => setPage(1), [labels]);

  const hasNextPage = issuesQuery.data?.length === per_page;

  const nextPage = () => {
    if (hasNextPage) setPage(prev => prev + 1);
  };
  const previousPage = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  return {
    issuesQuery,

    page,
    hasNextPage,

    nextPage,
    previousPage,
  };
};
