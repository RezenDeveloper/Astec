import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { SelectInput, TextInput } from '../../components/Inputs'

import styles from '../../styles/search.module.scss'
import { Tag } from '../../components/Tags'
import { ResultCard } from '../../components/ResultCard'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllWorks } from '../../database/work'
import NotFound from '../404'

interface SearchProps { 
  subjectList: Subject[] | null
  tagList: Tag[] | null
  resultList: Work[] | null
  yearList: Year[] | null
}

const Search = ({ subjectList, tagList, yearList, resultList }: SearchProps) => {
  
  if(!subjectList || !tagList || !yearList || !resultList) return (
    <NotFound />
  )
  const router = useRouter()
  const query = router.query.query as string

  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [tagArray, setTagArray] = useState<string[]>([])

  useEffect(() => {
    const { ano, autor, curso, tags } = router.query as { [key: string]: string }
    const foundSubject = !!subjectList.find(subject => curso === subject.id)
    const foundYear = !!yearList.find(year => ano === year.id)
    
    setAuthor(autor || '')
    setTagArray(tags?.split(',') || [])
    setYear(foundYear ? ano : '')
    setSubject(foundSubject ? curso : '')
  }, [router.query])

  const handleTagSelect = (newTag: string) => {
    const tagExists = !!tagArray.find(tag => tag === newTag)

    if(tagExists) {
      setTagArray(old => {
        const newTagArray = old.filter(tag => tag !== newTag)
        console.log('join', newTagArray.join(','))
        changeParams({ 
          tags: newTagArray.join(',')
        })
        return newTagArray
      })
    }
    else {
      setTagArray(old => {
        const newTagArray = [...old, newTag]
        changeParams({ 
          tags: newTagArray.join(',')
        })
        return newTagArray
      })
    }
  }

  const changeParams = (newParams: { [key: string]: string }) => {
    const queryParams = router.query
    delete queryParams.query
    router.push({
      query: {
        ...queryParams,
        ...newParams
      }
    })
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
              valueList={yearList}
              onChange={(id) => {
                setYear(id)
                changeParams({
                  ano: id
                })
              }}
            />
          </div>
          <div className={styles['filter--field']}>
            <SelectInput
              label='Curso'
              selectedId={subject}
              valueList={subjectList}
              onChange={(id) => {
                setSubject(id)
                changeParams({
                  curso: id
                })
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
              onKeyDown={(e) => {
                if(e.key === 'Enter') {
                  changeParams({
                      autor: author,
                  })
                }
              }}
              onBlur={() => changeParams({ autor: author })}
            />
          </div>
          <div className={`${styles['filter--field']} ${styles['filter--field__tags']}`}>
            {
              tagList.map(({ text, total, id }) => (
                <Tag 
                  id={id}
                  text={text} 
                  total={total} 
                  isSelected={!!tagArray.find(tag => tag === id)}
                  handleTagSelect={handleTagSelect}
                />
              ))
            }
          </div>
        </section>
        <section className={styles['result']}>
          <h1 className={styles['result--title']}>
            {query}
          </h1>
          <div className={styles['result--list']}>
            {resultList.map(({ authorArray, description, fileId, tagArray, title }, index) => (
              <ResultCard
                key={index}
                authorArray={authorArray} 
                description={description} 
                fileId={fileId}
                tagArray={tagArray}
                title={title}
              />
            ))}
          </div>
          <button className={styles['result--button']}>Ver Mais</button>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
      paths: [],
      fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
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

  return {
    props: {
      subjectList: [
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
      ],
      tagList: [
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
      ],
      yearList: getYearList(),
      resultList: getAllWorks()
    }
  }
}

export default Search
