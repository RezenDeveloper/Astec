import styles from './styles.module.scss';
import Image from 'next/image';

export const LoadingModal = () => {
  return (
    <div className={styles['loading-modal']}>
      <Image
        src={'/images/loading.svg'}
        aria-label={'Carregando'}
        objectFit={'contain'}
        width={150}
        height={150}
      />
    </div>
  );
}