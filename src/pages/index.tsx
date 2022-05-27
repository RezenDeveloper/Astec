import Head from 'next/head'

import { Header } from '../components/Header'
import { ClassCard, WorkCard } from '../components/Cards'

import styles from '../styles/home.module.scss'
import Footer from '../components/Footer'

const Home = () => {
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
            {[1, 2, 3].map((_, index) => (
              <WorkCard key={index} />
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

export default Home