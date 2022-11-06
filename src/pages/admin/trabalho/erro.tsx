import Head from 'next/head'

import { Header } from '../../../components/Header'

import styles from '../../../styles/admin-work.module.scss'
import Footer from '../../../components/Footer'

const AdminError = () => {

  return (
    <>
      <Head>
        <title>Erro</title>
      </Head>
      <Header hideSearch={true} />
      <main className={styles['error-container']}>
        <div className={styles['wrapper']}>
          <h1>Erro</h1>
          <p>Ocorreu um erro ao carregar a página, por favor tente novamente em alguns minutos</p>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default AdminError