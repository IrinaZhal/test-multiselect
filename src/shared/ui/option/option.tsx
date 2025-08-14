import { OptionType } from '../multiselect/multiselect';
import styles from '@shared/ui/multiselect/multiselect.module.css';

type OptionProps = {
  option: OptionType;
  isSelected: boolean;
  onClick: (value: OptionType['value']) => void;
};

export const DropdownOption: React.FC<OptionProps> = ({
  option,
  isSelected,
  onClick,
}) => {
  const handleClick = () => {
    onClick(option.value);
  };

  return (
    <li
      className={`${styles.option} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      tabIndex={0}
      role="option"
      aria-selected={isSelected}
    >
      <p>{option.label}</p>
    </li>
  );
};
