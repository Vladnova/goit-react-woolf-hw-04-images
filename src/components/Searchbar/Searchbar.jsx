import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handlerInput = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handlerSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };
  return (
    <header className={styles.searchbar}>
      <form className={styles.searchForm} onSubmit={handlerSubmit}>
        <button type="submit" className={styles.searchFormButton}>
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handlerInput}
          className={styles.searchFormInput}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;
