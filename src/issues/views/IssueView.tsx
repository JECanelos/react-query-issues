import { Link, Navigate, useParams } from 'react-router-dom';

import { IssueComment } from '../components';
import { useIssue } from '../hooks';
import { LoadingIcon } from '../../shared/components';

export const IssueView = () => {
  const { id = '0' }  = useParams();
  const { commentsQuery, issueQuery } = useIssue(+id);

  if (!issueQuery.isLoading && !issueQuery.data)
    return (<Navigate to="./issues/list" />);

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to="/issues/list">Go Back</Link>
      </div>

      {issueQuery.isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <IssueComment issue={issueQuery.data} />

          {commentsQuery.isLoading && (<LoadingIcon />)}
          {commentsQuery.data?.map(issue => (
            <IssueComment key={issue.id} issue={issue} />
          ))}
        </>
      )}
    </div>
  );
};
