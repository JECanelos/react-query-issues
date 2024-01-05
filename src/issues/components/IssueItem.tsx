import { FC } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { FiCheckCircle, FiInfo, FiMessageSquare } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { getIssue, getIssueComments } from '../hooks';
import { Issue, State } from '../interfaces';
import { timeSince } from '../../helpers';

interface Props {
  issue: Issue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const { created_at, comments, number, title, state, user } = issue;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const prefetchData = () => {
    queryClient.prefetchQuery({
      queryKey: ['issue', number],
      queryFn: () => getIssue(number),
    });
    queryClient.prefetchQuery({
      queryKey: ['issue', number, 'comments'],
      queryFn: () => getIssueComments(number),
    });
  };

  const preSetData = () => {
    queryClient.setQueryData(
      ['issue', number],
      issue,
      { updatedAt: new Date().getTime() + 1000 * 60 * 5 }
    );
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${number}`)}
      onMouseEnter={preSetData}
    >
      <div className="card-body d-flex align-items-center">
        {state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{title}</span>
          <span className="issue-subinfo">
            #{number} opened {timeSince(created_at)} ago{' '}
            by <span className="fw-bold">{user.login}</span>
          </span>

          <div>
            {issue.labels.map(label => (
              <span
                key={label.id}
                className="badge rounded-pill m-1"
                style={{ backgroundColor: `#${label.color}`, color: 'black' }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>

        <div className="d-flex align-items-center">
          <img src={user.avatar_url} alt="User Avatar" className="avatar" />
          <span className="px-2">{comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
