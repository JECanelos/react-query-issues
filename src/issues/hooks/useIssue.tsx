import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { Issue } from '../interfaces';

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(`/issues/${issueNumber}/comments`);
  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(
    ['issues', issueNumber],
    () => getIssue(issueNumber)
  );

  const commentsQuery = useQuery(
    ['issues', issueNumber, 'comments'],
    () => getIssueComments(issueQuery.data!.number),
    { enabled: !!issueQuery.data }
  );

  return {
    issueQuery,
    commentsQuery,
  };
};