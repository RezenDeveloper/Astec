import React, { useCallback, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import styles from './styles.module.scss';

export const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const toggleLogin = useCallback(() => {
    setModalIsOpen(!modalIsOpen)
  }, [modalIsOpen])

  return (
    <>
      <header className={styles['header']}>
        <div className={styles['header__container']}>
          <h1 className={styles['header__container--title']}>Armazenador de TGs</h1>
          <div className={styles['header__container--search']}>
            <input type="text" placeholder="Pesquisar..." />
            <MdSearch color={'black'} size={"40px"} />
          </div>
          <div className={styles['header__container--login']}>
            <a onClick={toggleLogin}>Login</a>
          </div>
        </div>
      </header>
      <Modal isOpen={modalIsOpen} toggle={toggleLogin} />
    </>
  );
}

interface ModalProps {
  isOpen: boolean
  toggle: () => void
}

const Modal = ({ isOpen, toggle }:ModalProps) => {

  if(!isOpen) return <></>

  return (
    <section className={styles['modal']}>
      <div className={styles['modal__opacity']} onClick={toggle} />
      <div className={styles['modal__container']}>
      <div className={styles['modal__container--box']}>
        <h1>Login</h1>
        <div className={styles['field-container']}>
          <div className={styles['field']}>
            <h2>Email: </h2>
            <input type="text" placeholder="jose.silva@gmail.com" />
          </div>
          <div className={styles['field']}>
            <h2>Senha: </h2>
            <input type="text" />
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}