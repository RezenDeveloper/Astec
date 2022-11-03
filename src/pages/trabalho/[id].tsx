import Head from 'next/head'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import NotFound from '../404'

import styles from '../../styles/work.module.scss'
import React from 'react'
import { PDFViewerProps } from '../../components/PDFViewer'
import { handleGetWork } from '../api/work/[id]'
import { checkIsAdmin } from '../../database/manager'

const PDFViewer = dynamic(() => 
  import('../../components/PDFViewer'), 
  { 
    ssr: false, 
    loading: () => <div className={styles['loading']}></div> 
  }
) as React.FC<PDFViewerProps>

interface WorkProps {
  work: Work | null
  isAdmin: boolean
}

const Work = ({ work, isAdmin }: WorkProps) => {
  const router = useRouter()
  
  if(router.isFallback) {
    return <h1>Loading...</h1>
  }

  if(!work) return (
    <NotFound />
  )
  
  const {
    id,
    title,
    authors,
    description, 
    subject,
    year,
    pdf_id
  } = work;

  const tagArray = work.tags.map(({ name }) => name)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header isAdmin={isAdmin} />
      <main className={styles['container']}>
        <h1 className={styles['title']}>{title}</h1>
        <div className={styles['pdf-container']}>
          {(!PDFViewer && <p>Loading</p>)}
          <PDFViewer
            Loading={() => (<div className={styles['loading']}></div>)}
            pageIndex={0}
            fileId={pdf_id}
            showDetails={true}
          />
        </div>
        <div className={`${styles['information-container']} ${styles['information-container--description']}`}>
          <b>Descrição</b>
          <p>{description}</p>
        </div>
        <div className={`${styles['information-container']} ${styles['information-container--authors']}`}>
          <b>Autores</b>
          <div className={styles['information-container--list']}>
            {authors.map(({ name, id }) => (
              <span key={id} className={styles['author']}>{name}</span>
            ))}
          </div>
        </div>
        <div className={`${styles['information-container']} ${styles['information-container--tags']}`}>
          <b>Tags</b>
          <div className={styles['information-container--list']}>
            {tagArray.map((tag, index) => (
              <span key={index} className={styles['tag']}>{tag}</span>
            ))}
          </div>
        </div>
        <div className={`${styles['information-container']} ${styles['information-container--subject']}`}>
          <p>{subject.name} - {year}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<WorkProps> = async (context) => {
  const token = context.req.cookies['TGManager_Admin_Token']
  const id = context.params?.id as string
  const work = await handleGetWork(id)
  
  return {
    props: {
      work,
      isAdmin: await checkIsAdmin(token)
    }
  }
}

export default Work
