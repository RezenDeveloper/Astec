import Head from 'next/head'

import { Header } from '../components/Header'
import { ClassCard, WorkCard } from '../components/Cards'

import styles from '../styles/home.module.scss'
import Footer from '../components/Footer'
import { GetStaticProps } from 'next'
import { searchWorks } from '../database/work'
import Slider from "react-slick";
import { getAllSubjects } from '../database/subject'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CustomNextArrow, CustomPrevArrow } from '../components/Slick'

interface HomeProps {
  recentWorks: SearchWork | null
  subjects: Subject[] | null
}

const Home:React.FC<HomeProps> = ({ recentWorks, subjects }) => {
  if(!recentWorks || !subjects) return null

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
            <Slider
              infinite={true}
              slidesToShow={3}
              slidesToScroll={3}
              dots={true}
              prevArrow={<CustomPrevArrow />}
              nextArrow={<CustomNextArrow />}
            >
              {recentWorks.result.map((work, index) => <WorkCard key={index} work={work} />)}
            </Slider>
          </div>
        </section>
        <section className={styles['classes']}>
          <h1>Cursos Disponíveis</h1>
          <div className={styles['classes__container']}>
            {subjects.map(({ id, name, description }) => (
              <ClassCard title={name} description={description} key={id} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { data: recentWorks } = await searchWorks({ 
    limit: 9,
    order: 'recent'
  });
  const { data: subjects } = await getAllSubjects();
  return {
    props: {
      recentWorks,
      subjects
    }
  }
}


export default Home