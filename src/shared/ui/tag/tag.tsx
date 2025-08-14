import React from 'react';
import styles from './tag.module.css';
import CloseIcon from '@shared/assets/icons/icon-cross.png';

type TagProps = {
  text: string;
  handleRemove: () => void;
};

export const Tag: React.FC<TagProps> = ({ text, handleRemove }) => {
  return (
    <li className={styles.tag}>
      <p className={styles.text}>{text}</p>
       <button
        className={styles.deleteButton}
        type="button"
        onClick={handleRemove}
        aria-label={`Удалить тег "${text}"`}
      >
        <img className={styles.icon} src={CloseIcon} alt="" aria-hidden="true" />
      </button>
    </li>
  );
};
