import { useState } from 'react';

import { LoadingIcon } from '../../shared/components';
import { IssueList, LabelPicker } from '../components';
import { useIssuesInfinite } from '../hooks';
import { State } from '../interfaces';

export const ListViewInfinite = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setstate] = useState<State>();

  const { issuesQuery } = useIssuesInfinite({ state, labels: selectedLabels });

  const onLabelChange = (labelName: string) => {
    setSelectedLabels(
      selectedLabels.includes(labelName) ? selectedLabels.filter(label => label !== labelName) : [...selectedLabels, labelName]
    );
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data?.pages.flat() || []}
            state={state}
            handleStateChange={newState => setstate(newState)}
          />
        )}

        <button
          className="btn btn-outline-primary mt-2"
          disabled={!issuesQuery.hasNextPage || issuesQuery.isFetchingNextPage}
          onClick={() => issuesQuery.fetchNextPage()}
        >
          Load More...
        </button>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
