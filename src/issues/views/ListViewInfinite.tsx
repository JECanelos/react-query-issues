import { useState } from 'react';

import { LoadingSpinner } from '../../shared';
import { IssueList, LabelPicker } from '../components';
import { useIssuesInfinite } from '../hooks';
import { State } from '../interfaces';

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [labels, setLabels] = useState<string[]>([]);

  const { issuesQuery } = useIssuesInfinite({ state, labels });

  const issues = issuesQuery.data?.pages.flat() ?? [];

  const onLabelChange = (label: string) => {
    if (labels.includes(label)) {
      setLabels(labels.filter(l => l !== label));
    } else {
      setLabels([...labels, label]);
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueList
              issues={issues}
              activeState={state}
              onStateChange={setState}
            />

            <button
              className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
              disabled={issuesQuery.isFetchNextPageError || !issuesQuery.hasNextPage}
              onClick={() => issuesQuery.fetchNextPage()}
            >
              {issuesQuery.isFetchingNextPage
                ? 'Cargando...'
                : issuesQuery.hasNextPage ? 'Cargar más' : 'No hay más issues'
              }
            </button>
          </div>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          selectedLabels={labels}
          onLabelChange={onLabelChange}
        />
      </div>
    </div>
  );
};
