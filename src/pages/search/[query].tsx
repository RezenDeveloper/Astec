import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { TextInput } from '../../components/Inputs'

import styles from '../../styles/search.module.scss'

const Search = () => {
  
  const { query: routerQuery } = useRouter()

  const query = routerQuery.query as string

  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')

  return (
    <>
      <Head>
        <title>{query}</title>
      </Head>
      <Header query={query} />
      <main className={styles['container']}>
        <section className={styles['filter']}>
          <h2 className={styles['filter--title']}>Filtros</h2>
          <TextInput 
            id='ano' 
            label='Ano' 
            value={year} 
            onChange={(e) => {
              const value = e.target.value
              setYear(value.replace(/\D/g, ''))
            }}  
          />
          <TextInput 
            id='autor' 
            label='Autor' 
            value={author} 
            onChange={(e) => {
              const value = e.target.value
              setAuthor(value.replace(/\d/g, ''))
            }}  
          />
        </section>
        <section className={styles['result']}>
          <h1 className={styles['result--title']}>{query}</h1>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Search
