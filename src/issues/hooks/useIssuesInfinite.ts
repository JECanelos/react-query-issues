import { useInfiniteQuery } from '@tanstack/react-query';

import { getIssues } from '../actions';
import { State } from '../interfaces';

interface Options {
  labels: string[];
  state: State;
  per_page?: number;
}

export const useIssuesInfinite = ({ state, labels, per_page = 5 }: Options)  => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, labels: labels.sort() }],
    queryFn: ({ pageParam, queryKey }) => {
      // const [,, args] = queryKey;
      // const { state, labels } = args as Options;
      return getIssues(state, labels, pageParam, per_page);
    },
    staleTime: 1000 * 60, // 1 minute
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.length === per_page ? allPages.length + 1 : undefined,
  });

  return {
    issuesQuery,
  };
};
