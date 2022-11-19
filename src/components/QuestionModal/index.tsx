import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai'

interface QuestionModal {
  title: string
  message: string
  closeCallback: () => void
  acceptMessage: string
  acceptCallback: () => void
}

export const QuestionModal = ({ title, message, closeCallback, acceptCallback, acceptMessage }: QuestionModal) => {
  return (
    <div className={styles['question-modal']}>
      <div className={styles['question-modal-container']}>
        <div className={styles['question-modal-header']}>
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
        <div className={styles['question-modal-footer']}>
          <button onClick={closeCallback}>Cancelar</button>
          <button onClick={acceptCallback}>{acceptMessage}</button>
        </div>
      </div>
    </div>
  );
}