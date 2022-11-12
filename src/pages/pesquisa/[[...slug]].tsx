import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import styles from '../../styles/search.module.scss'
import { ResultCard } from '../../components/ResultCard'
import { GetServerSideProps } from 'next'
import { getYearList, searchWorks } from '../../database/work'
import NotFound from '../404'
import Image from 'next/image'
import { handleGetAllSubjects } from '../api/subject'
import { handleGetAllTags } from '../api/tag'
import { getAllTags } from '../../database/tag'
import { handleSearchWork } from '../api/work/search'
import { Filter } from '../../components/Filter'
import { FilterContextProvider, useFilter } from '../../contexts/filter'
import { useIsMobile } from '../../hooks/isMobile'

interface SearchProps { 
  subjectList: Subject[] | null
  tagList: SearchTag[] | null
  yearList: Year[] | null
  searchInfo: SearchWork
}

const SearchBody = ({ subjectList, tagList: propTagList, yearList, searchInfo }: SearchProps) => {
  const router = useRouter()
  const query = router.query.slug !== undefined ? router.query.slug[0] : ''

  const [resultList, setResultList] = useState<Work[]>(searchInfo.result)
  const [tagList, setTagList] = useState<SearchTag[] | null>(propTagList)
  const [pagination, setPagination] = useState<Pagination>(searchInfo.pagination)
  const [loading, setLoading] = useState({
    loadingMore: false,
    loadingAll: false
  })

  const {
    author,
    subject,
    year,
    tagArray,
    setClosed,
    closed
  } = useFilter()
  
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

  if(!subjectList || !tagList || !yearList) return <NotFound />

  const isMobile = useIsMobile()
  const hasResults = resultList !== undefined && resultList.length > 0
  const { loadingAll, loadingMore } = loading
  return (
    <>
      <Head>
        <title>{loadingAll ? 'Pequisando' : query || 'Pesquisa'}</title>
      </Head>
      <Header query={query} />
      <main className={styles['container']}>
        {isMobile && (
          <div className={styles['filter-container']}>
            <button onClick={() => setClosed(prev => !prev)}>{closed ? 'Filtrar' : 'Fechar'}</button>
          </div>
        )}
        <Filter
          limit={limit}
          loading={loading}
          subjectList={subjectList}
          tagList={tagList}
          updateSearchResults={updateSearchResults}
          yearList={yearList}          
        />
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

const Search:React.FC<SearchProps> = (props) => {
  return (
    <FilterContextProvider>
      <SearchBody {...props} />
    </FilterContextProvider>
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
