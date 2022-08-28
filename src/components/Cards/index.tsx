import React from 'react';
import dynamic from 'next/dynamic'

import styles from './styles.module.scss';
import { PDFViewerProps } from '../../components/PDFViewer';
import Link from 'next/link';

const PDFViewer = dynamic(() => 
  import('../../components/PDFViewer'), 
  { 
    ssr: false, 
    loading: () => <div className={styles['loading']}></div> 
  }
) as React.FC<PDFViewerProps>;

export interface WorkCardProps {
  work: Work
}

export const WorkCard:React.FC<WorkCardProps> = ({ work }) => {
  const { 
    title,
    subject,
    fileId,
    description,
  } = work

  return (
    <div className={styles['work-card']}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['pdf-container']}>
        <PDFViewer 
          Loading={() => (<div className={styles['loading']}></div>)}
          fileId={fileId}
          pageIndex={0} 
        />
      </div>
      <strong className={styles['class']}>{subject}</strong>
      <div className={styles['description']}>
        <h4>Descrição</h4>
        <p>{description}</p>
      </div>
      <div className={styles['button-area']}>
        <Link href={`/trabalho/${fileId}`}>Visualizar</Link>
      </div>
    </div>
  );
}

export interface IClassCardProps {
}
export const ClassCard = (props: IClassCardProps) => {
  return (
    <div className={styles['class-card']}>
      <div className={styles['image']}>
        <h1>ADS</h1>
      </div>
      <h4>Análise e desenvolvimento de sistemas</h4>
    </div>
  );
}
