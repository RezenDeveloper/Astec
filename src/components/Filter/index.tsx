
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { removeUndefinedFromObject } from '../../utils/utils'
import { SelectInput, TextInput } from '../Inputs'
import styles from './styles.module.scss'
import { Tag } from '../Tags'
import { useFilter } from '../../contexts/filter'

interface FilterProps {
  limit: number
  yearList: Year[]
  tagList: SearchTag[]
  subjectList: Subject[]
  loading: {
    loadingMore: boolean;
    loadingAll: boolean;
  }
  updateSearchResults: (params: SearchParams, add?: boolean) => Promise<void>
}

type FilterParams = "query" | "author" | "subject" | "year" | "tags" | "limit"

let ignoreNextRender = false

export const Filter:React.FC<FilterProps> = ({
  limit,
  yearList,
  loading,
  tagList,
  subjectList,
  updateSearchResults
}) => {

  const {
    author,
    setAuthor,
    subject,
    setSubject,
    year,
    setYear,
    tagArray,
    setTagArray,
    closed
  } = useFilter()
  
  const router = useRouter()
  const { loadingAll } = loading

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
  
  return (
    <section className={`${styles['filter']} ${closed ? styles['filter--closed'] : ''}`}>
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
        {
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
  )
}