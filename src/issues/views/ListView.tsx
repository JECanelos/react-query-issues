import { useState } from 'react';

import { LoadingSpinner } from '../../shared';
import { IssueList, LabelPicker } from '../components';
import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [labels, setLabels] = useState<string[]>([]);

  const { issuesQuery, page, hasNextPage, previousPage, nextPage } = useIssues({ state, labels });

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
          <>
            <IssueList
              issues={issuesQuery.data ?? []}
              activeState={state}
              onStateChange={setState}
            />

            <div className="flex justify-between items-center">
              <button
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
                onClick={previousPage}
                disabled={page === 1}
              >
                Anteriores
              </button>
              <span>Página {page}</span>
              <button
                className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:opacity-50"
                onClick={nextPage}
                disabled={!hasNextPage}
              >
                Siguientes
              </button>
            </div>
          </>
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
