import Head from 'next/head'

import { Header } from '../../components/Header'

import styles from '../../styles/admin-subjects.module.scss'
import Footer from '../../components/Footer'
import { GetStaticProps } from 'next'
import { getAllSubjects } from '../../database/subject'
import AdminError from './trabalho/erro'
import { useEffect, useState } from 'react'
import { handleSelectKeyPress } from '../../utils/acessibility'
import { TextBox, TextInput } from '../../components/Inputs'

interface SubjectsProps {
  subjectList: Subject[] | null
}

type ActionTypes = 'NEW' | 'EDIT'

const Subjects = ({ subjectList }: SubjectsProps) => {

  const [selecteAction, setSelectedAction] = useState<ActionTypes>()
  
  const [selectedSubject, setSelectedSubject] = useState<string>()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')


  useEffect(() => {
    if(selectedSubject) setSelectedAction(undefined)
  }, [selectedSubject])

  if (!subjectList) return <AdminError />

  const handleEditSubject = () => {
    const selected = subjectList.find(subject => subject.id === selectedSubject)
    if(!selected) return
    setSelectedAction('EDIT')
    setTitle(selected.title)
    setDescription(selected.description)
  }

  const handleAddSubject = () => {
    setSelectedAction('NEW')
    setSelectedSubject(undefined)
    setTitle('')
    setDescription('')
  }

  return (
    <>
      <Head>
        <title>Adicionar Cursos</title>
      </Head>
      <Header hideSearch={true} />
      <main className={styles['container']}>
        <h1 className={styles['title']}>Cursos</h1>
        <ul className={styles['subject-list']} aria-activedescendant={selectedSubject} tabIndex={-1}>
          {subjectList.map(subject => (
            <li 
              key={subject.id} 
              tabIndex={0}
              onKeyPress={(e) => handleSelectKeyPress(e, () => setSelectedSubject(subject.id))}
              role={'option'}
              aria-selected={subject.id === selectedSubject}
              className={`${styles['subject-list--item']} ${subject.id === selectedSubject ? styles['active'] : ''}`}
              onClick={() => setSelectedSubject(subject.id)}
            >
              {subject.title}
            </li>
          ))}
        </ul>
        <div className={styles['buttons-container']}>
          <button 
            className={!selectedSubject || selecteAction === 'EDIT' ? styles['disabled'] : ''} 
            disabled={!selectedSubject || selecteAction === 'EDIT'}
            onClick={handleEditSubject}
          >
            Editar
          </button>
          <button 
            className={!selectedSubject ? styles['disabled'] : ''} 
            disabled={!selectedSubject}
          >
            Excluir
          </button>
          <button 
            className={selecteAction === 'NEW' ? styles['disabled'] : ''}
            disabled={selecteAction === 'NEW'} 
            onClick={handleAddSubject}
          >
            Adicionar Novo
          </button>
        </div>
        {!!selecteAction && (
          <div className={styles['add-container']}>
            <h2>{selecteAction === 'EDIT' ? 'Editar curso selecionado' : 'Adicionar novo curso'}</h2>
            <TextInput 
              id='title' 
              label='Titulo' 
              className={styles['title-input']}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextBox
              id='description' 
              label='Descrição'
              className={styles['desc-input']}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <div className={styles['buttons-container']}>
              <button
                className={styles['save-button']
              }>
                Salvar
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<SubjectsProps> = async () => {
  return {
    props: {
      subjectList: getAllSubjects(),
    },
  }
}

export default Subjects
