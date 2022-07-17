import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './styles.module.scss';

const PDFViewer = dynamic(() => 
  import('../../components/PDFViewer'), 
  { 
    ssr: false, 
    loading: () => <div className={styles['loading']}></div> 
  }
);

export interface ResultCardProps {
  title: string
  description: string
  fileId: string
  authorArray: string[]
  tagArray: string[]
}

export const ResultCard = ({ title, description, fileId, authorArray, tagArray }: ResultCardProps) => {

  return (
    <div className={styles['result-card']}>
      <h2 className={styles['result-card--title']}>
        <Link href={`/trabalho/${fileId}`}>{title}</Link>
      </h2>
      <div className={styles['wrapper']}>
        <div className={styles['pdf-container']}>
          <PDFViewer 
            Loading={() => (<div className={styles['loading']}></div>)}
            pageIndex={0} 
          />
        </div>
        <div>
          <div className={styles['result-card--description']}>
            <label>Descrição</label>
            <p>{description}</p>
          </div>
          <div className={styles['result-card--authors']}>
            <label>Autores</label>
            <div className={styles['tag-wrapper']}>
              {authorArray.map((name, index) => (
                <p key={index}>{name}</p>
              ))}
            </div>
          </div>
          <div className={styles['result-card--tags']}>
            <label>Tags</label>
            <div className={styles['tag-wrapper']}>
              {tagArray.map((tag, index) => (
                <p key={index}>{tag}</p>
              ))}
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}