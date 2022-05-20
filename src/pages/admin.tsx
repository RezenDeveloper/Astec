import Head from 'next/head'
import { FormEvent, ChangeEvent, useState, SetStateAction, Dispatch } from 'react'

import styles from '../styles/admin.module.scss'

export default function Admin() {

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(e)
    console.log(email)
    console.log(password)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<string | undefined>>) => {
    const { value } = e.target
    if (!value) return
    setValue(value)
  }

  return (
    <>
      <Head>
        <title>Armazenador de TGs - Admin</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap" rel="stylesheet" />
      </Head>
      <main className={styles['container']}>
        <div className={styles['modal']}>
          <div className={styles['modal--header']}>
            <h1 className={styles['modal--title']}>Login</h1>
          </div>
          <form onSubmit={handleSubmit} className={styles['modal--content']}>
            <p className={styles['modal--content__info']}>Faça login para acessar o admin</p>
            <div className={styles['modal--field-container']}>
              <label htmlFor="email">Email</label>
              <input
                type='email'
                id='email'
                required
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </div>
            <div className={styles['modal--field-container']}>
              <label htmlFor="password">Senha</label>
              <input
                type='password'
                id='password'
                required
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
            </div>
            <div className={styles['modal--button-container']}>
              <button type='submit' className={styles['modal--button']}>Continuar</button>
            </div>
          </form>
        </div>
      </main>
    </>
  )
}
