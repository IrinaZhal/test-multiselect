import React from 'react';
import styles from './tag-list.module.css';
import { OptionType } from '../multiselect/multiselect';
import { Tag } from '../tag/tag';

type TagListProps = {
  onRemove: (option: OptionType['value']) => void;
  selectedOptions: OptionType[];
};

export const TagList: React.FC<TagListProps> = ({ selectedOptions, onRemove }) => {
  return (
    <div className={styles.listContainer}>
      {selectedOptions.length > 0 ? (
        <p className={styles.title}>Выбранные опции:</p>
      ) : (
        <p className={styles.title}>Выбранных опций пока нет</p>
      )}
      <ul className={styles.tags}>
        {selectedOptions.map(option => (
          <Tag
            key={option.value}
            text={option.value}
            handleRemove={() => onRemove(option.value)}
          />
        ))}
      </ul>
    </div>
  );
};
