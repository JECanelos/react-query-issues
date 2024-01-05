import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { Issue } from '../interfaces';

export const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
  });

  const commentsQuery = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: !!issueQuery.data,
  });

  return {
    issueQuery,
    commentsQuery,
  };
};
