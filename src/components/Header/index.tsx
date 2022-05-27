import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './styles.module.scss';

interface Props {
  query?: string
}

export const Header:React.FC<Props> = ({ query }) => {

  const [queryValue, setQueryValue] = useState(query || '')

  useEffect(() => {
    setQueryValue(query || '')
  }, [query])

  const handleSearch = useCallback((value: string) => {
    if(typeof window === 'undefined') return
    Router.push(`/search/${value}`)
  }, [])

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__container']}>
          <h1 className={styles['header__container--title']}>Armazenador de TGs</h1>
          <div className={styles['header__container--search']}>
            <form 
              className={styles['header__container--search__wrap']} 
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch(queryValue)
              }}
            >
              <input
                type="text" 
                placeholder="Pesquisar..." 
                value={queryValue}
                onChange={(e) => setQueryValue(e.target.value)}
              />
              <input type="submit" hidden />
              <MdSearch 
                color={'black'} 
                size={"40px"}
                onClick={() => handleSearch(queryValue)}
              />
            </form>
          </div>
        </div>
      </header>
    </>
  );
}