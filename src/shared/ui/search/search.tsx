import React from 'react';
import styles from './search.module.css';
import SearchIcon from '@shared/assets/icons/icon-search.png';

type SearchProps = { value: string; onChange: (value: string) => void };

export const Search: React.FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <input
        className={styles.searchInput}
        placeholder="Поиск по опциям..."
        value={value}
        onChange={e => onChange(e.target.value)}
      ></input>
      <img
        src={SearchIcon}
        className={styles.searchIcon}
        alt="Иконка поиска"
        loading="lazy"
      ></img>
    </div>
  );
};
