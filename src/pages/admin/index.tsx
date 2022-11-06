import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next/types'
import { FormEvent, ChangeEvent, useState, SetStateAction, Dispatch } from 'react'
import { authenticate, checkIsAdmin } from '../../database/manager'

import styles from '../../styles/admin.module.scss'


const Admin:React.FC = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>()

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(undefined)
    if(!email || !password) return

    const { error: resError } = await authenticate({
      email,
      password
    })

    if(resError) {
      const resErrorData = resError?.response?.data as string 
      setError(resErrorData || 'Ocorreu um erro, tente novamente mais tarde')
      return
    }
    
    router.push('/')
  }

  return (
    <>
      <Head>
        <title>Armazenador de TGs - Admin</title>
      </Head>
      <main className={styles['container']}>
        <div className={styles['modal']}>
          <div className={styles['modal--header']}>
            <h1 className={styles['modal--title']}>Login</h1>
          </div>
          <form onSubmit={handleSubmit} className={styles['modal--content']}>
            <p className={styles['modal--content__info']}>Faça login para acessar o admin</p>
            <div className={`${styles['modal--field-container']} ${error ? styles['modal--field-container_error'] : ''}`}>
              <label htmlFor="email">Email</label>
              <input
                type='email'
                id='email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={`${styles['modal--field-container']} ${error ? styles['modal--field-container_error'] : ''}`}>
              <label htmlFor="password">Senha</label>
              <input
                type='password'
                id='password'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <span className={styles['modal--error-message']}>{error}</span>}
            <div className={styles['modal--button-container']}>
              <button type='submit' className={styles['modal--button']}>Continuar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies['TGManager_Admin_Token']
  const isAdmin = await checkIsAdmin(token)
  
  if(isAdmin) return {
    redirect: {
      destination: '/',
      permanent: true
    }
  }
  else {
    return {
      props: {}
    }
  }
}

export default Admin