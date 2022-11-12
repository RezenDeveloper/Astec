import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './styles.module.scss';

interface Props {
  query?: string
  hideSearch?: boolean
  isAdmin?: boolean
}

export const Header:React.FC<Props> = ({ query, hideSearch = false, isAdmin = false }) => {

  const [queryValue, setQueryValue] = useState(query || '')
  const router = useRouter()

  const isWorkPage = router.pathname === '/trabalho/[id]'

  const handleSearch = useCallback((value: string) => {
    if(typeof window === 'undefined') return
    router.push(`/pesquisa/${value}`)
  }, [])

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__container']}>
          <h1 className={styles['header__container--title']}>
            <Link href={`/`} aria-label="Home">Armazenador de TGs</Link>
          </h1>
          {!hideSearch &&
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
                  aria-label='Pesquisar'
                  placeholder="Pesquisar..." 
                  value={queryValue}
                  onChange={(e) => setQueryValue(e.target.value)}
                />
                <input type="submit" hidden />
                <MdSearch
                  tabIndex={0}
                  role='button'
                  aria-label='Pesquisar'
                  color={'black'} 
                  size={"40px"}
                  onClick={() => handleSearch(queryValue)}
                />
              </form>
            </div>
          }
          {
            isAdmin && isWorkPage ? (
              <div className={styles['header__container--admin']}>
                <Link href={`/admin/trabalho/${router.query.id}`}>Editar Trabalho</Link>
              </div>
            ) : isAdmin && (
              <div className={styles['header__container--admin']}>
                <Link href={'/admin/trabalho/novo'}>Adicionar Trabalho</Link>
              </div>
            )
          }
        </div>
      </header>
    </>
  );
}