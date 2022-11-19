import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './styles.module.scss';
import { QuestionModal } from '../QuestionModal';
import { axiosAPI } from '../../database/axios';

interface Props {
  query?: string
  hideSearch?: boolean
  isAdmin?: boolean
}

export const Header:React.FC<Props> = ({ query, hideSearch = false, isAdmin = false }) => {

  const [queryValue, setQueryValue] = useState(query || '')
  const [showQuestion, setShowQuestion] = useState(false)
  const router = useRouter()

  const isWorkPage = router.pathname === '/trabalho/[id]'

  const handleSearch = useCallback((value: string) => {
    if(typeof window === 'undefined') return
    router.push(`/pesquisa/${value}`)
  }, [])

  const handleDelete = async () => {
    const id = router.query.id as string
    const { status } = await axiosAPI.delete(`/api/work/${id}`)
    if(status === 200) {
      router.push('/')
    }
  }

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__container']}>
          <h1 className={styles['header__container--title']}>
            <Link href={`/`} aria-label="Home">ASTEC</Link>
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
                <button 
                  className={styles['header__container--admin_delete']}
                  onClick={() => setShowQuestion(true)}
                >
                  Excluir
                </button>
                <Link href={`/admin/trabalho/${router.query.id}`}>Editar</Link>
              </div>
            ) : isAdmin && (
              <div className={styles['header__container--admin']}>
                <Link href={'/admin/trabalho/novo'}>Adicionar Trabalho</Link>
              </div>
            )
          }
        </div>
      </header>
      {showQuestion && (
        <QuestionModal
          title='Tem certeza?'
          message='Deseja realmente deletar o trabalho?'
          closeCallback={() => setShowQuestion(false)}
          acceptMessage={'Excluir'}
          acceptCallback={handleDelete}
        />
      )}
    </>
  );
}