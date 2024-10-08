import { FiRefreshCcw } from 'react-icons/fi';

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-52">
      <div className="loading">
        <div className="flex w-full">
          <FiRefreshCcw size={36} className="animate-spin" />
        </div>
      </div>
    </div>
  );
};
