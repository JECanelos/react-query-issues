import { useState } from 'react';

import { LoadingIcon } from '../../shared/components';
import { IssueList, LabelPicker } from '../components';
import { useIssues } from '../hooks';
import { State } from '../interfaces';

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [state, setstate] = useState<State>();

  const { issuesQuery, page, prevPage, nextPage } = useIssues({ state, labels: selectedLabels });

  const onLabelChange = (labelName: string) => {
    setSelectedLabels(
      selectedLabels.includes(labelName)
        ? selectedLabels.filter(label => label !== labelName)
        : [...selectedLabels, labelName]
    );
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data || []}
            state={state}
            handleStateChange={newState => setstate(newState)}
          />
        )}

        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isFetching}
            onClick={prevPage}
          >
            Prev
          </button>

          <span>{issuesQuery.isFetching ? 'Loading...' : page}</span>

          <button
            className="btn btn-outline-primary"
            disabled={issuesQuery.isFetching}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
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
