import Head from 'next/head'

import { Header } from '../components/Header'
import { ClassCard, WorkCard } from '../components/Cards'

import styles from '../styles/home.module.scss'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className={styles['container']}>
      <Head>
        <title>Armazenador de TGs</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <Header />
      <main>
        <section className={styles['recent-works']}>
          <h1>Trabalhos mais recentes</h1> 
          <div className={styles['recent-works__container']}>
          {/* Colocar vários cards com um slider na horizontal */}
          {[1,2,3].map((_, index) => (
            <WorkCard key={index} />
          ))}
          </div>
        </section>
        <section className={styles['classes']}>
            <h1>Cursos Disponíveis</h1>
            <div className={styles['classes__container']}>
              {[1,2,3].map((_, index) => (
                <ClassCard key={index}/>
              ))}
            </div>
        </section>
      </main>
      <Footer/>
    </div>
  )
}
