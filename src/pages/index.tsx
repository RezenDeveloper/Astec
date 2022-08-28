import Head from 'next/head'

import { Header } from '../components/Header'
import { ClassCard, WorkCard } from '../components/Cards'

import styles from '../styles/home.module.scss'
import Footer from '../components/Footer'
import { GetStaticProps } from 'next'
import { getRecentWorks } from '../database/work'

interface HomeProps {
  recentWorks: Work[]
}

const Home:React.FC<HomeProps> = ({ recentWorks }) => {
  return (
    <>
      <Head>
        <title>Armazenador de TGs</title>
      </Head>
      <Header />
      <main className={styles['container']}>
        <section className={styles['recent-works']}>
          <h1>Trabalhos recentes</h1>
          <div className={styles['recent-works__container']}>
            {/* Colocar vários cards com um slider na horizontal */}
            {recentWorks.map((work, index) => (
              <WorkCard key={index} work={work} />
            ))}
          </div>
        </section>
        <section className={styles['classes']}>
          <h1>Cursos Disponíveis</h1>
          <div className={styles['classes__container']}>
            {[1, 2, 3].map((_, index) => (
              <ClassCard key={index} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      recentWorks: getRecentWorks(),
    }
  }
}


export default Home