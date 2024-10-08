import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FiSkipBack } from 'react-icons/fi';

import { IssueComment } from '../components';
import { useIssue } from '../hooks';
import { LoadingSpinner } from '../../shared';

export const IssueView = () => {
  const navigate = useNavigate();

  const { issueNumber } = useParams();
  const { issueQuery, issueCommentsQuery } = useIssue(Number(issueNumber ?? 0));

  if (issueQuery.isLoading) {
    return (<LoadingSpinner />);
  }
  if (!issueQuery.data) {
    return (<Navigate to= "/404" />);
  }

  return (
    <div className="mb-5">
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:underline text-blue-400 flex items-center"
        >
          <FiSkipBack />
          Regresar
        </button>
      </div>

      <IssueComment issue={issueQuery.data} />

      {issueCommentsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        issueCommentsQuery.data?.map(comment => (
          <IssueComment key={comment.id} issue={comment} />
        ))
      )}
    </div>
  );
};
