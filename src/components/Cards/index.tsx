import React, { useState } from 'react';
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
    id,
    pdf_id,
    title,
    subject,
    description,
  } = work

  return (
    <div className={styles['work-card']}>
      <h2 className={styles['title']}>{title}</h2>
      <div className={styles['pdf-container']}>
        <PDFViewer 
          Loading={() => (<div className={styles['loading']}></div>)}
          fileId={pdf_id}
          pageIndex={0} 
        />
      </div>
      <strong className={styles['class']}>{subject.name}</strong>
      <div className={styles['description']}>
        <h4>Descrição</h4>
        <p>{description}</p>
      </div>
      <div className={styles['button-area']}>
        <Link href={`/trabalho/${id}`}>Visualizar</Link>
      </div>
    </div>
  );
}

export interface IClassCardProps {
  id: string
  title: string
  description: string
}

export const ClassCard = ({ id, title, description }: IClassCardProps) => {

  const [hover, setHover] = useState(false)
  return (
    <Link
      href={`/pesquisa?curso=${id}`}
    >
      <div 
        className={styles['class-card']} 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className={styles['image']}>
          {!hover ? (
            <h4>{title}</h4>
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
