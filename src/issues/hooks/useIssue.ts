import { useQuery } from '@tanstack/react-query';

import { getIssue, getIssueComments } from '../actions';

export const useIssue = (issueNumber: number)  => {
  const issueQuery = useQuery({
    queryKey: ['issues', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60, // 1 minute
  });

  // Fetch in parallel
  // const issueCommentsQuery = useQuery({
  //   queryKey: ['issues', issueNumber, 'comments'],
  //   queryFn: () => getIssueComments(issueNumber),
  //   staleTime: 1000 * 60, // 1 minute
  // });

  // Fetch sequentially
  const issueCommentsQuery = useQuery({
    queryKey: ['issues', issueQuery.data?.number, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    staleTime: 1000 * 60, // 1 minute
    enabled: !!issueQuery.data,
  });

  return {
    issueQuery,
    issueCommentsQuery,
  };
};
