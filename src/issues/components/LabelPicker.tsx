import { FC } from 'react';

import { LoadingSpinner } from '../../shared';
import { useLabels } from '../hooks';

interface Props {
  selectedLabels: string[];
  onLabelChange: (label: string) => void;
}

export const LabelPicker: FC<Props> = ({ onLabelChange, selectedLabels }) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (<LoadingSpinner />);
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map(({ id, name, color }) => (
        <span
          key={id}
          onClick={() => onLabelChange(name)}
          className={
            `animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer
            ${selectedLabels.includes(name) ? 'selected-label' : ''}`
          }
          style={{ border: `1px solid #${color}`, color: `#${color}` }}
        >
          {name}
        </span>
      ))}
    </div>
  );
};
