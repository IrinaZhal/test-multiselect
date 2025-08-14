import styles from './multiselect.module.css';
import React, { useRef } from 'react';
import { useState } from 'react';
import Arrow from '@shared/assets/icons/icon-angle-down.png';
import { DropdownOption } from '../option/option';
import { Search } from '../search/search';
import { useOutsideClickClose } from '@shared/hooks/useOutsideClickclose';

export type OptionType = {
  label: string;
  value: string;
};

type TMultiselectProps = {
  options: OptionType[];
  selectedOptions: OptionType[];
  onSelectionChange: (selected: OptionType[]) => void;
  placeholder?: string;
};

export const Multiselect: React.FC<TMultiselectProps> = ({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useOutsideClickClose({
    isOpen: isDropdownOpen,
    rootRef,
    onChange: setIsDropdownOpen,
  });

  const handleOptionClick = (option: OptionType) => {
    const isOptionSelected = selectedOptions.some(
      selected => selected.value === option.value
    );

    let updatedSelectedOptions: OptionType[];

    if (isOptionSelected) {
      updatedSelectedOptions = selectedOptions.filter(
        selected => selected.value !== option.value
      );
    } else {
      updatedSelectedOptions = [...selectedOptions, option];
    }

    onSelectionChange(updatedSelectedOptions);
  };

  const handlePlaceholderClick = () => {
    setIsDropdownOpen(isDropdownOpen => !isDropdownOpen);
    setSearchTerm('');
  };

  const handleReset = () => {
    onSelectionChange([]);
    setSearchTerm('');
  };

  return (
    <div ref={rootRef} className={styles.container}>
      <button
        type="button"
        disabled={selectedOptions.length === 0}
        className={`${styles.reset} ${selectedOptions.length > 0 ? styles.resetActive : ''}`}
        onClick={handleReset}
      >
        Убрать все опции
      </button>
      <div
        className={`${styles.multiselect} ${isDropdownOpen ? styles.opened : ''}`}
      >
        <div
          className={styles.wrapper}
          role="button"
          onClick={handlePlaceholderClick}
        >
          <div className={styles.placeholder}>
            {selectedOptions.length === 0 ? (
              <p className={styles.placeholderText}>
                {placeholder || 'Выберите опции'}
              </p>
            ) : (
              <p className={styles.placeholderText}>
                Выбрано опций:{' '}
                <span className={styles.count}>{selectedOptions.length}</span>
              </p>
            )}
          </div>
          <img
            src={Arrow}
            alt="иконка стрелки"
            className={`${styles.arrow} ${isDropdownOpen ? styles.arrowUp : ''}`}
          />
        </div>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <Search value={searchTerm} onChange={setSearchTerm} />
            <ul className={styles.optionsList}>
              {options.length === 0 ? (
                <li className={styles.noOption}>Нет доступных опций</li>
              ) : filteredOptions.length === 0 ? (
                <li className={styles.noOption}>Ничего не найдено</li>
              ) : (
                filteredOptions.map(option => {
                  const isOptionSelected = selectedOptions.some(
                    selected => selected.value === option.value
                  );

                  return (
                    <DropdownOption
                      key={option.value}
                      option={option}
                      isSelected={isOptionSelected}
                      onClick={() => handleOptionClick(option)}
                    />
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
