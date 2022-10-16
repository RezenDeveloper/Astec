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
import { getYearList, searchWorks } from '../../database/work'
import NotFound from '../404'
import { getAllSubjects } from '../../database/subject'
import { getAllTags } from '../../database/tag'
import Image from 'next/image'

interface SearchProps { 
  subjectList: Subject[] | null
  tagList: SearchTag[] | null
  yearList: Year[] | null
}

const Search = ({ subjectList, tagList, yearList }: SearchProps) => {
  
  const router = useRouter()
  const query = router.query.query as string

  const [resultList, setResultList] = useState<Work[] | null>(null)
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [tagArray, setTagArray] = useState<string[]>([])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { ano, autor, curso, tags, query } = router.query as { [key: string]: string }
    const foundSubject = !!subjectList?.find(subject => curso === subject.id)
    const foundYear = !!yearList?.find(year => ano === year.id)

    const newTagArray = !tags ? [] : tags.split(',')
    
    setAuthor(autor || '')
    setTagArray(newTagArray)
    setYear(foundYear ? ano : '')
    setSubject(foundSubject ? curso : '')


    updateSearchResults({
      query,
      author: autor,
      subject: curso,
      year: ano,
      tags,
    })
  }, [router.query])


  const updateSearchResults = async (params: SearchParams) => {
    setLoading(true)
    const { data } = await searchWorks(params)
    setResultList(data)
    setLoading(false)
  }

  const handleTagSelect = (newTag: string) => {
    const tagExists = !!tagArray.find(tag => tag === newTag)

    if(tagExists) {
      setTagArray(old => {
        const newTagArray = old.filter(tag => tag !== newTag)
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

  if(!subjectList || !tagList || !yearList || !resultList) return <NotFound />

  return (
    <>
      <Head>
        <title>{loading ? 'Pequisando' : query || 'Pesquisa'}</title>
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
              valueList={subjectList.map(subject => ({
                id: subject.id,
                value: subject.name
              }))}
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
              tagList.map(({ name, total, id }) => (
                <Tag 
                  key={id}
                  id={id}
                  text={name} 
                  total={total} 
                  isSelected={!!tagArray.find(tag => tag === id)}
                  handleTagSelect={handleTagSelect}
                />
              ))
            }
          </div>
        </section>
        {!loading && (
          <section className={styles['result']}>
            <h1 className={styles['result--title']}>
              {query}
            </h1>
            <div className={styles['result--list']}>
              {resultList.length > 0 ? 
                resultList.map(({ id, authors, description, tagArray, title }, index) => (
                  <ResultCard
                    key={index}
                    authorArray={authors} 
                    description={description} 
                    id={id}
                    tagArray={tagArray}
                    title={title}
                  />
                )) : (
                  <h1 className={styles['not-found']}>Nada encontrado</h1>
                )
              }
            </div>
            <button className={styles['result--button']}>Ver Mais</button>
          </section>
        )}
        
        {loading && (
          <section className={styles['result-loading']}>
            <Image
              src={'/images/loading.svg'}
              aria-label={'Carregando'}
              objectFit={'contain'}
              width={150}
              height={150}
            />
          </section>
        )}
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

export const getStaticProps: GetStaticProps<SearchProps> = async ({ params }) => {
  
  const { data: subjectList } = await getAllSubjects()
  const { data: tagList } = await getAllTags()
  return {
    props: {
      subjectList,
      tagList,
      yearList: getYearList()
    }
  }
}

export default Search
