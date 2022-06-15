import Head from 'next/head'
import Image from 'next/image'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'

import { Header } from '../../../components/Header'

import styles from '../../../styles/admin-work.module.scss'
import Footer from '../../../components/Footer'
import { SelectInput, TextBox, TextInput } from '../../../components/Inputs'
import { TagInput } from '../../../components/Tags'
import { getYearList } from '../../../database/work'
import { GetStaticProps } from 'next'
import { getAllSubjects } from '../../../database/subject'
import AdminError from './erro'

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

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (e) => {
    e.preventDefault()
  }

  const handleSendPDF: ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    const eventFile = e.target.files?.item(0)
    if(eventFile) setFile(eventFile)
  }

  if (!subjectList) return <AdminError />

  return (
    <>
      <Head>
        <title>Adicionar Trabalho</title>
      </Head>
      <Header hideSearch={true} />
      <main className={styles['container']}>
        <h1 className={styles['title']}>Adicionar TG</h1>
        <form className={styles['form']} onSubmit={handleSubmit}>
          <TextInput id="title" label="Titulo" onChange={handleTitleChange} value={title} />
          <TextBox id="description" label="Descrição" onChange={handleDescriptionChange} value={description} />
          <div className={styles['form-grid']}>
            <TagInput
              className={styles['tag-input']}
              id={'tagInput'}
              label={'Tags'}
              tags={{ value: tagList, setValue: setTagList }}
            />
            <TagInput
              className={styles['author-input']}
              id={'authorInput'}
              label={'Autores'}
              tags={{ value: authorList, setValue: setAuthorList }}
            />
            <SelectInput
              label="Ano"
              className={styles['year-input']}
              selectedId={year}
              valueList={yearList}
              onChange={(id) => setYear(id)}
            />
            <SelectInput
              label="Curso"
              className={styles['subject-input']}
              selectedId={subject}
              valueList={subjectList}
              onChange={(id) => setSubject(id)}
            />
            <div className={styles['pdf-file']}>
              <Image
                src={'/images/pdf.svg'}
                width={'auto'}
                height={'250'}
                aria-label={'PDF'}
                className={styles['image']}
              />
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
