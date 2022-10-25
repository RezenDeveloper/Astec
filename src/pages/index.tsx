import Head from 'next/head'

import { Header } from '../components/Header'
import { ClassCard, WorkCard } from '../components/Cards'

import styles from '../styles/home.module.scss'
import Footer from '../components/Footer'
import { GetServerSideProps } from 'next'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { CustomNextArrow, CustomPrevArrow } from '../components/Slick'
import { checkIsAdmin } from '../database/manager'
import { handleSearchWork } from './api/work/search'
import { handleGetAllSubjects } from './api/subject'

interface HomeProps {
  recentWorks: SearchWork | null
  subjects: Subject[] | null
  isAdmin: boolean
}

const Home:React.FC<HomeProps> = ({ recentWorks, subjects, isAdmin }) => {
  if(!recentWorks || !subjects) return null

  console.log(isAdmin)

  return (
    <>
      <Head>
        <title>Armazenador de TGs</title>
      </Head>
      <Header isAdmin={isAdmin} />
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

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const token = context.req.cookies['TGManager_Admin_Token']
  const recentWorks = await handleSearchWork({
    limit: '9',
    order: 'recent'
  });
  const subjects = await handleGetAllSubjects()
  
  return {
    props: {
      recentWorks,
      subjects,
      isAdmin: await checkIsAdmin(token)
    }
  }
}


export default Home