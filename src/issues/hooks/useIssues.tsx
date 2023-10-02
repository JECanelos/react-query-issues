import { useQuery } from '@tanstack/react-query';
import { githubApi } from '../../api';
import { Issue } from '../interfaces';

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>('/issues');
  return data;
};

export const useIssues = () => {
  return useQuery(
    ['issues'],
    () => getIssues(),
  ); 
};
