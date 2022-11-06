
import styles from './styles.module.scss';

const Error:React.FC = () => {
  return (
    <div className={styles['error-container']}>
      <h1>Ocorreu um Erro</h1>
      <p>tente novamente mais tarde</p>
    </div>
  )
}

export default Error