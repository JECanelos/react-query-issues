import { useQuery } from '@tanstack/react-query';

import { githubApi } from '../../api';
import { sleep } from '../../helpers';
import { Label } from '../interfaces';

const getLabels = async (): Promise<Label[]> => {
  await sleep(2);

  const { data } = await githubApi.get<Label[]>('/labels');
  return data;
};

export const useLabels = () => {
  return useQuery(
    ['labels'],
    () => getLabels(),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );
};
