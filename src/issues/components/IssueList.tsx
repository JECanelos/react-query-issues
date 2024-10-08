import { FC } from 'react';

import { GithubIssue, State } from '../interfaces';
import { IssueItem } from './';

interface Props {
  issues: GithubIssue[];
  onStateChange: (state: State) => void;
  activeState: State;
}

export const IssueList: FC<Props> = ({ issues, activeState, onStateChange }) => {
  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => onStateChange(State.All)}
          className={`btn${activeState === State.All ? ' active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => onStateChange(State.Open)}
          className={`btn${activeState === State.Open ? ' active' : ''}`}
        >
          Open
        </button>
        <button
          onClick={() => onStateChange(State.Closed)}
          className={`btn${activeState === State.Closed ? ' active' : ''}`}
        >
          Closed
        </button>
      </div>

      <div className="mt-4">
        {issues.map(issue => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
