import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai'

interface InfoModal {
  title: string
  message: string
  closeCallback: () => void
}

export const InfoModal = ({ title, message, closeCallback }: InfoModal) => {
  return (
    <div className={styles['success-modal']}>
      <div className={styles['success-modal-container']}>
        <div className={styles['success-modal-header']}>
          <h1>{title}</h1>
          <AiOutlineClose 
            color='#FFF' 
            width={10} 
            height={10} 
            role="button"
            onClick={closeCallback}
          />
        </div>
        <p>{message}</p>
      </div>
    </div>
  );
}