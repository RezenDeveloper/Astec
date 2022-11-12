import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import { SelectInput, TextInput } from '../../components/Inputs'

import styles from '../../styles/search.module.scss'
import { Tag } from '../../components/Tags'
import { ResultCard } from '../../components/ResultCard'
import { GetServerSideProps } from 'next'
import { getYearList, searchWorks } from '../../database/work'
import NotFound from '../404'
import Image from 'next/image'
import { handleGetAllSubjects } from '../api/subject'
import { handleGetAllTags } from '../api/tag'
import { getAllTags } from '../../database/tag'
import { handleSearchWork } from '../api/work/search'
import { removeUndefinedFromObject } from '../../utils/utils'

interface SearchProps { 
  subjectList: Subject[] | null
  tagList: SearchTag[] | null
  yearList: Year[] | null
  searchInfo: SearchWork
}

type FilterParams = "query" | "author" | "subject" | "year" | "tags" | "limit"

let ignoreNextRender = false

const Search = ({ subjectList, tagList: propTagList, yearList, searchInfo }: SearchProps) => {
  
  const router = useRouter()
  const query = router.query.slug !== undefined ? router.query.slug[0] : ''

  const [resultList, setResultList] = useState<Work[]>(searchInfo.result)
  const [tagList, setTagList] = useState<SearchTag[] | null>(propTagList)
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [tagArray, setTagArray] = useState<string[]>([])
  const [pagination, setPagination] = useState<Pagination>(searchInfo.pagination)
  const [loading, setLoading] = useState({
    loadingMore: false,
    loadingAll: false
  })
  
  const limit = 10
  let currentPage = 0
  let totalPages = 0
  let hasMore = false
  let rest = 0

  if(pagination) {
    currentPage = Math.floor(pagination.offset / limit)
    totalPages = Math.floor((pagination.total - 1) / limit)
    rest = pagination.total - pagination.offset
    hasMore = totalPages > currentPage
  }

  useEffect(() => {
    const { ano, autor, curso, tags } = router.query as { [key: string]: string }
    if(ignoreNextRender) {
      ignoreNextRender = false
      return
    }

    const foundSubject = !!subjectList?.find(subject => curso === subject.id)
    const foundYear = !!yearList?.find(year => ano === year.id)

    const newTagArray = !tags ? [] : tags.split(',')
    
    setAuthor(autor || '')
    setTagArray(newTagArray)
    setYear(foundYear ? ano : '')
    setSubject(foundSubject ? curso : '')

    updateSearchResults({
      query: router.query.slug !== undefined ? router.query.slug[0] : '',
      author: autor,
      subject: curso,
      year: ano,
      tags,
      limit
    })
  }, [router.query])


  const updateSearchResults = async (params: SearchParams, add = false) => {
    setLoading({
      loadingAll: !add,
      loadingMore: add
    })

    const { data } = await searchWorks(params)
    const { data:tagData } = await getAllTags(params)
    if(!data || !tagData) return

    setPagination(data.pagination)
    setTagList(tagData)

    if(add) {
      setResultList(prev => {
        if(prev) return [...prev, ...data.result]
        else return data.result
      })
    } else {
      setResultList(data.result)
    }

    setLoading({
      loadingMore: false,
      loadingAll: false
    })
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

  const removeParams = (paramsToRemove: FilterParams[]) => {    
    ignoreNextRender = true
    let newParams = {
      query: router.query.slug !== undefined ? router.query.slug[0] : '',
      author,
      subject,
      year,
      tags: tagArray.join(','),
      limit,
    }
    
    paramsToRemove.forEach(param => {
      delete newParams[param]
    })

    updateSearchResults({
      ...newParams
    })

    router.push({
      query: {
        ...removeUndefinedFromObject({
          ano: newParams.year || undefined,
          autor: newParams.author || undefined, 
          curso: newParams.subject || undefined, 
          tags: newParams.tags || undefined
        }),
      }
    })
  }

  const changeParams = (newParams: { [key: string]: string }) => {
    ignoreNextRender = true
    const prevParams = {
      query: router.query.slug !== undefined ? router.query.slug[0] : '',
      author,
      subject,
      year,
      tags: tagArray.join(','),
      limit,
    }
    const fullParams = { ...prevParams, ...newParams }
    updateSearchResults(fullParams)

    router.push({
      query: {
        ...router.query,
        ...removeUndefinedFromObject({
          ano: fullParams.year || undefined,
          autor: fullParams.author || undefined, 
          curso: fullParams.subject || undefined, 
          tags: fullParams.tags || undefined
        })
      }
    })
  }

  if(!subjectList || !tagList || !yearList) return <NotFound />

  const hasResults = resultList !== undefined && resultList.length > 0
  const { loadingAll, loadingMore } = loading
  return (
    <>
      <Head>
        <title>{loadingAll ? 'Pequisando' : query || 'Pesquisa'}</title>
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
                  year: id
                })
              }}
            />
            <div className={styles['filter--clear_container']}>
              <button 
                className={styles['filter--clear']}
                onClick={() => {
                  setYear('')
                  removeParams(['year'])
                }}
              >
                limpar
              </button>
            </div>
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
                  subject: id
                })
              }}
            />
            <div className={styles['filter--clear_container']}>
              <button 
                className={styles['filter--clear']}
                onClick={() => {
                  setSubject('')
                  removeParams(['subject'])
                }}
              >
                limpar
              </button>
            </div>
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
                    author
                  })
                }
              }}
              onBlur={() => changeParams({ author })}
            />
            <div className={styles['filter--clear_container']}>
              <button 
                className={styles['filter--clear']}
                onClick={() => {
                  setAuthor('')
                  removeParams(['author'])
                }}
              >
                limpar
              </button>
            </div>
          </div>
          <div className={`${styles['filter--field__tags']}`}>
            { !loadingAll &&
              tagList.filter(({ total }) => total > 0)
              .map(({ name, total, id }) => (
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
        <section className={styles['result']}>
          <h1 className={styles['result--title']}>
            {loadingAll ? '' : query || 'Pesquisa'}
          </h1>
          <div className={`${styles['result--list']} ${!hasMore ? styles['complete'] : ''}`}>
            {hasResults && !loadingAll ? 
              resultList!.map(({ id, pdf_id, authors, description, tags, title }, index) => (
                <ResultCard
                  key={index}
                  authorArray={authors} 
                  description={description} 
                  id={id}
                  pdfId={pdf_id}
                  tagArray={tags.map(({ name }) => name)}
                  title={title}
                />
              )) 
              : !loadingAll && (
                <h1 className={styles['not-found']}>Nada encontrado</h1>
              )
            }
            {loadingMore || loadingAll && (
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
          </div>
          {hasMore && (
            <button onClick={async () => {
              await updateSearchResults({
                query: query || undefined,
                author: author || undefined,
                subject: subject || undefined,
                year: year || undefined,
                tags: tagArray.join(',') || undefined,
                limit,
                offset: (pagination?.offset || 0) + limit
              }, true)
            }} className={styles['result--button']}>Ver Mais</button>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async ({ query }) => {
  const subjectList = await handleGetAllSubjects()
  const yearList = getYearList()
  
  const { ano, autor, curso, tags } = query as { [key: string]: string }
  const filter = {
    query: query.slug !== undefined ? query.slug[0] : '',
    author: autor,
    subject: curso,
    year: ano,
    tags
  }
  const searchInfo = await handleSearchWork(filter)
  const tagList = await handleGetAllTags(filter)
  return {
    props: {
      subjectList,
      tagList,
      searchInfo,
      yearList
    }
  }
}

export default Search
