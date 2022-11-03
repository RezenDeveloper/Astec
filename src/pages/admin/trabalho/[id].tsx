import Head from 'next/head'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react'

import { Header } from '../../../components/Header'

import styles from '../../../styles/admin-work.module.scss'
import Footer from '../../../components/Footer'
import { SelectInput, TextBox, TextInput } from '../../../components/Inputs'
import { TagInput } from '../../../components/Tags'
import { editWork, getYearList } from '../../../database/work'
import { GetServerSideProps } from 'next'
import AdminError from './erro'
import { checkInputs } from '../../../utils/checkInputs'
import Link from 'next/link'
import { InfoModal } from '../../../components/InfoModal'
import { LoadingModal } from '../../../components/LoadingModal'
import { handleGetAllSubjects } from '../../api/subject'
import { checkIsAdmin } from '../../../database/manager'
import { handleGetWork } from '../../api/work/[id]'
import { useRouter } from 'next/router'

interface NewProps {
  subjectList: Subject[] | null
  yearList: Year[]
  work: Work
}

const Edit = ({ yearList, subjectList, work }: NewProps) => {
  const [title, setTitle] = useState(work.title)
  const [description, setDescription] = useState(work.description)
  const [tagList, setTagList] = useState<string[]>(work.tags.map(tag => tag.name))
  const [authorList, setAuthorList] = useState<string[]>(work.authors.map(author => author.name))
  const [year, setYear] = useState(work.year.toString())
  const [subject, setSubject] = useState(work.subject.id)
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

  const router = useRouter()

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
    
    const buffer = await file!.arrayBuffer()

    const { error } = await editWork(work.id, {
      title,
      description,
      authors: authorList,
      tags: tagList,
      year: parseInt(year),
      subjectId: subject,
      file: Buffer.from(buffer).toString('base64')
    })
    
    if(error) setSubmitError(true)
    else {
      setSuccess(true)
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
          <LoadingModal />
        )}
        {success && (
          <InfoModal 
            title='Sucesso!'
            message='Trabalho atualizado com sucesso.'
            closeCallback={() => {
              router.push(`/trabalho/${work.id}`)
            }}
          />
        )}
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<NewProps> = async (context) => {
  const isAdmin = await checkIsAdmin(context.req.cookies['TGManager_Admin_Token'])
  const subjects = await handleGetAllSubjects()
  
  const id = context.params?.id as string
  const work = await handleGetWork(id)

  if(isAdmin) return {
    props: {
      subjectList: subjects,
      yearList: getYearList(),
      work
    },
  }
  else return {
    redirect: {
      destination: '/',
      permanent: true
    }
  }
}

export default Edit
