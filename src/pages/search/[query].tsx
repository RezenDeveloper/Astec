import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { SelectInput, TextInput } from '../../components/Inputs'

import styles from '../../styles/search.module.scss'

const Search = () => {
  
  const { query: routerQuery } = useRouter()

  const query = routerQuery.query as string

  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')

  const getYearList = () => {
    const currentYear = (new Date()).getFullYear();
    const LastYear = 2000
    let yearArray:number[] = []
    
    for(let countYear = LastYear;  countYear <= currentYear; countYear ++) {
      yearArray.push(countYear)
    }

    return yearArray.map(year => ({
      value: year.toString(),
      id: year.toString()
    }))
  }

  return (
    <>
      <Head>
        <title>{query}</title>
      </Head>
      <Header query={query} />
      <main className={styles['container']}>
        <section className={styles['filter']}>
          <h2 className={styles['filter--title']}>Filtros</h2>
          <SelectInput
            label='Ano'
            selectedId={year}
            valueList={getYearList()}
            onChange={(id) => {
              setYear(id)
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
