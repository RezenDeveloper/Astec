import Head from 'next/head'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useEffect, useState } from 'react'

import { Header } from '../../../components/Header'

import styles from '../../../styles/admin-work.module.scss'
import Footer from '../../../components/Footer'
import { SelectInput, TextBox, TextInput } from '../../../components/Inputs'
import { TagInput } from '../../../components/Tags'
import { createWork, getYearList } from '../../../database/work'
import { GetStaticProps } from 'next'
import { getAllSubjects } from '../../../database/subject'
import AdminError from './erro'
import { checkInputs } from '../../../utils/checkInputs'
import Link from 'next/link'
import { SuccessModal } from '../../../components/SuccessModal'

interface NewProps {
  subjectList: Subject[] | null
  yearList: Year[]
}

const New = ({ yearList, subjectList }: NewProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagList, setTagList] = useState<string[]>([])
  const [authorList, setAuthorList] = useState<string[]>([])
  const [year, setYear] = useState('')
  const [subject, setSubject] = useState('')
  const [file, setFile] = useState<File>()
  const [submitError, setSubmitError] = useState<boolean>(false)
  const [errorList, setErrorList] = useState<ErrorObj>({
    title: undefined,
    description: undefined,
    tag: undefined,
    author: undefined,
    year: undefined,
    subject: undefined,
    file: undefined
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value)
  }

  const handleSendPDF: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const eventFile = e.target.files?.item(0)
    if(eventFile) setFile(eventFile)
  }

  const clearInputs = () => {
    setTitle('')
    setDescription('')
    setTagList([])
    setAuthorList([])
    setYear('')
    setSubject('')
    setFile(undefined)
  }
  
  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = async (e) => {
    e.preventDefault()
    const { errorList: newErrorList, hasErrors } = checkInputs({
      authorList,
      description,
      file,
      subject,
      tagList,
      title,
      year
    })
    
    setErrorList(newErrorList)

    if(hasErrors) {
      setSubmitError(true)
      return
    }
    setLoading(true)
    const { data, error } = await createWork({
      title,
      description,
      tags: tagList,
      year: parseInt(year),
      subjectId: subject
    })
    
    if(error) setSubmitError(true)
    else if(data) {
      setSuccess(true)
      clearInputs()
    }

    setLoading(false)
  }

  useEffect(() => {
    if(success) return
    const { errorList: newErrorList } = checkInputs({
      authorList,
      description,
      file,
      subject,
      tagList,
      title,
      year
    })
    if(!submitError) {
      if(newErrorList.tag !== 'error__min') setErrorList(prev => ({ ...prev, tag: newErrorList.tag }))
      if(newErrorList.author !== 'error__min') setErrorList(prev => ({ ...prev, author: newErrorList.author }))
      return
    }
    setErrorList(newErrorList)
  }, [description, file, subject, title, year, submitError, tagList, authorList])

  if (!subjectList) return <AdminError />

  const titleError = errorList.title ? styles[`title-input--${errorList.title}`] : ''
  const descError = errorList.description ? styles[`description-input--${errorList.description}`] : ''
  const tagError = errorList.tag ? styles[`tag-input--${errorList.tag}`] : ''
  const authorError = errorList.author ? styles[`author-input--${errorList.author}`] : ''
  const yearError = errorList.year ? styles[`year-input--${errorList.year}`] : ''
  const subjectError = errorList.subject ? styles[`subject-input--${errorList.subject}`] : ''
  const pdfError = errorList.file ? styles[`pdf-file--${errorList.file}`] : ''

  return (
    <>
      <Head>
        <title>Adicionar Trabalho</title>
      </Head>
      <Header hideSearch={true} />
      <main className={styles['container']}>
        <h1 className={styles['title']}>Adicionar TG</h1>
        <form className={styles['form']} onSubmit={handleSubmit}>
          <TextInput 
            className={`${styles['title-input']} ${titleError}`} 
            id="title" 
            label="Titulo" 
            onChange={handleTitleChange} 
            value={title}
          />
          <TextBox 
            id="description" 
            label="Descrição" 
            className={`${styles['description-input']} ${descError}`}
            onChange={handleDescriptionChange} 
            value={description}
          />
          <div className={styles['form-grid']}>
            <TagInput
              className={`${styles['tag-input']} ${tagError}`}
              id={'tagInput'}
              autocomplete={{ route: '/api/tag/search' }}
              label={'Tags'}
              tags={{ value: tagList, setValue: setTagList }}
            />
            <TagInput
              className={`${styles['author-input']} ${authorError}`}
              id={'authorInput'}
              label={'Autores'}
              tags={{ value: authorList, setValue: setAuthorList }}
            />
            <SelectInput
              label="Ano"
              className={`${styles['year-input']} ${yearError}`}
              placeholder={new Date().getFullYear().toString()}
              selectedId={year}
              valueList={yearList}
              onChange={(id) => setYear(id)}
            />
            <SelectInput
              label="Curso"
              className={`${styles['subject-input']} ${subjectError}`}
              placeholder={'Analise e desenvolvimento de sistemas'}
              selectedId={subject}
              valueList={subjectList.map(subject => ({ id: subject.id, value: subject.name }))}
              onChange={(id) => setSubject(id)}
            >
              <Link href={'/admin/cursos'}>Adicionar mais cursos</Link>
            </SelectInput>
            <div className={`${styles['pdf-file']} ${pdfError}`}>
              <div className={styles['image-container']}>
                <Image
                  src={'/images/pdf.svg'}
                  aria-label={'PDF'}
                  layout={'fill'}
                  objectFit={'contain'}
                />
              </div>
              <p className={styles['name']}>{file?.name || ''}</p>
              <label className={styles['send-button']} role={'button'} htmlFor={'pdf'} aria-label={'Enviar PDF'}>
                Enviar PDF
              </label>
              <input
                type={'file'}
                id={'pdf'} 
                accept={'application/pdf'} 
                onChange={handleSendPDF}
              />
            </div>
          </div>
          <button 
            className={styles['publish-button']}
            type="submit"
          >
            Publicar
          </button>
        </form>
        {loading && (
          <div className={styles['loading-modal']}>
            <Image
              src={'/images/loading.svg'}
              aria-label={'Carregando'}
              objectFit={'contain'}
              width={150}
              height={150}
            />
          </div>
        )}
        {success && (
          <SuccessModal 
            title='Sucesso!'
            message='Trabalho publicado com sucesso.'
            closeCallback={() => {
              setSuccess(false)
            }}
          />
        )}
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<NewProps> = async () => {
  const { data } = await getAllSubjects();
  return {
    props: {
      subjectList: data,
      yearList: getYearList(),
    },
  }
}

export default New
