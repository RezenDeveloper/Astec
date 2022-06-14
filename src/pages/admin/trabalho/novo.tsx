import Head from 'next/head'
import { ChangeEventHandler, useState } from 'react'

import { Header } from '../../../components/Header'

import styles from '../../../styles/admin-work.module.scss'
import Footer from '../../../components/Footer'
import { TextBox, TextInput } from '../../../components/Inputs'
import { TagInput } from '../../../components/Tags'

const Home = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tagList, setTagList] = useState<string[]>([])
  const [authorList, setAuthorList] = useState<string[]>([])

  const handleTitleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange:ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setDescription(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Adicionar Trabalho</title>
      </Head>
      <Header hideSearch={true} />
      <main className={styles['container']}>
        <h1 className={styles['title']}>Adicionar TG</h1>
        <form className={styles['form']}>
          <TextInput
            id='title'
            label='Titulo'
            onChange={handleTitleChange}
            value={title}
          />
          <TextBox
            id='description'
            label='Descrição'
            onChange={handleDescriptionChange}
            value={description}
          />
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
        </form>
      </main>
      <Footer />
    </>
  )
}

export default Home