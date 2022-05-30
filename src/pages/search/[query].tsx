import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { SelectInput, TextInput } from '../../components/Inputs'

import styles from '../../styles/search.module.scss'
import { Tag } from '../../components/Tags'

const Search = () => {
  
  const { query: routerQuery } = useRouter()

  const query = routerQuery.query as string

  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [tagArray, setTagArray] = useState<string[]>([])

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

  const getSubjectList = () => {
    return [
      {
        value: 'Teste',
        id: 'teste'
      },
      {
        value: 'Teste 2',
        id: 'teste2'
      },
      {
        value: 'Teste 3',
        id: 'teste3'
      }
    ]
  }

  const getTagList = () => {
    return [
      {
        id: 'IA',
        text: 'Inteligência Artificial',
        total: 15
      },
      {
        id: 'TI',
        text: 'TI',
        total: 25
      },
      {
        id: 'C',
        text: 'Comércio',
        total: 85
      }
    ]
  }

  const handleTagSelect = (newTag: string) => {
    const tagExists = !!tagArray.find(tag => tag === newTag)

    if(tagExists) {
      setTagArray(old => (
        old.filter(tag => tag !== newTag)
      ))
    }
    else {
      setTagArray(old => (
        [...old, newTag]
      ))
    }
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
          <div className={styles['filter--field']}>
            <SelectInput
              label='Ano'
              selectedId={year}
              valueList={getYearList()}
              onChange={(id) => {
                setYear(id)
              }}
            />
          </div>
          <div className={styles['filter--field']}>
            <SelectInput
              label='Curso'
              selectedId={subject}
              valueList={getSubjectList()}
              onChange={(id) => {
                setSubject(id)
              }}
            />
          </div>
          <div className={styles['filter--field']}>
            <TextInput 
              id='autor' 
              label='Autor' 
              value={author} 
              onChange={(e) => {
                const value = e.target.value
                setAuthor(value.replace(/\d/g, ''))
              }}  
            />
          </div>
          <div className={`${styles['filter--field']} ${styles['filter--field__tags']}`}>
            {
              getTagList().map(({ text, total, id }) => (
                <Tag 
                  id={id}
                  text={text} 
                  total={total} 
                  handleTagSelect={handleTagSelect}
                />
              ))
            }
          </div>
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
