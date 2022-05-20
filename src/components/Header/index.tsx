import React from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './styles.module.scss';

export const Header = () => {
  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__container']}>
          <h1 className={styles['header__container--title']}>Armazenador de TGs</h1>
          <div className={styles['header__container--search']}>
            <div className={styles['header__container--search__wrap']}>
              <input type="text" placeholder="Pesquisar..." />
              <MdSearch color={'black'} size={"40px"} />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}