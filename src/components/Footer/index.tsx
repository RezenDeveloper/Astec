import Image from 'next/image';
import * as React from 'react';

import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <Image
        src={'/images/CPS.png'}
        height={70}
        width={104}
      />
      <Image
        src={'/images/Fatec.png'}
        height={57}
        width={190}
      />
      <Image
        src={'/images/SP.png'}
        height={78}
        width={120}
      />
    </footer>
  );
}

export default Footer