import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { Header } from '../../components/Header'
import Footer from '../../components/Footer'
import NotFound from '../404'

import { getWork } from '../../database/work'

import styles from '../../styles/work.module.scss'

const PDFViewer = dynamic(() => 
  import('../../components/PDFViewer'), 
  { 
    ssr: false, 
    loading: () => <div className={styles['loading']}></div> 
  }
);

interface WorkProps {
  work: Work | null
}

const Work = ({ work }: WorkProps) => {
  const router = useRouter()
  
  if(router.isFallback) {
    return <h1>Loading...</h1>
  }

  if(!work) return (
    <NotFound />
  )
  
  
  const { 
    title, 
    authorArray, 
    tagArray,
    description, 
    subject,
    year,
    fileId
  } = work;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header />
      <main className={styles['container']}>
        <h1 className={styles['title']}>{title}</h1>
        <div className={styles['pdf-container']}>
          {(!PDFViewer && <p>Loading</p>)}
          <PDFViewer
            Loading={() => (<div className={styles['loading']}></div>)}
            pageIndex={0}
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
            {authorArray.map((author, index) => (
              <span key={index} className={styles['author']}>{author}</span>
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
          <p>{subject} - {year}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<WorkProps> = async ({ params }) => {
  const id = params?.id as string
  const work = await getWork(id)

  return {
    props: {
      work
    }
  }
}

export default Work
