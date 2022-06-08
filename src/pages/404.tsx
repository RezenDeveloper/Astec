import Head from 'next/head'
import Link from 'next/link'
import Footer from '../components/Footer'
import { Header } from '../components/Header'

import styles from '../styles/404.module.scss'

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Não encontrado</title>
      </Head>
      <Header />
      <main className={styles['container']}>
        <h1>Trabalho não encontrado</h1>
      </main>
      <Footer />
    </>
  )
}

export default NotFound