import Head from 'next/head'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useState } from 'react'

import { Header } from '../../../components/Header'

import styles from '../../../styles/admin-work.module.scss'
import Footer from '../../../components/Footer'
import { SelectInput, TextBox, TextInput } from '../../../components/Inputs'
import { TagInput } from '../../../components/Tags'
import { getYearList } from '../../../database/work'
import { GetStaticProps } from 'next'
import { getAllSubjects } from '../../../database/subject'
import AdminError from './erro'
import { checkInputs } from '../../../utils/checkInputs'

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
  const [errorList, setErrorList] = useState<ErrorObj>({
    title: false,
    description: false,
    tag: false,
    author: false,
    year: false,
    subject: false,
    file: false
  })

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
  
  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
    e.preventDefault()
    console.log('submit')
    const { errorList: newErrorList, hasErrors } = checkInputs({
      authorList,
      description,
      file,
      subject,
      tagList,
      title,
      year
    })
    console.log(newErrorList)
    setErrorList(newErrorList)

    if(hasErrors) return
  }

  if (!subjectList) return <AdminError />

  const titleError = errorList.title ? styles['title-input--error'] : ''
  const descError = errorList.description ? styles['description-input--error'] : ''
  const tagError = errorList.tag ? styles['tag-input--error'] : ''
  const authorError = errorList.author ? styles['author-input--error'] : ''
  const yearError = errorList.year ? styles['year-input--error'] : ''
  const subjectError = errorList.subject ? styles['subject-input--error'] : ''
  const pdfError = errorList.file ? styles['pdf-file--error'] : ''

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
              valueList={subjectList}
              onChange={(id) => setSubject(id)}
            />
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
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<NewProps> = async () => {
  return {
    props: {
      subjectList: getAllSubjects(),
      yearList: getYearList(),
    },
  }
}

export default New
