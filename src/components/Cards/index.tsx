import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic'

import styles from './styles.module.scss';

const PDFViewer = dynamic(() => import('../PDFViewer'), { ssr: false });

export interface IWorkCardProps {
}

export const WorkCard = (props: IWorkCardProps) => {
  return (
    <div className={styles['work-card']}>
      <h2 className={styles['title']}>Lorem ipsum dolor sit amet</h2>
      <div className={styles['card-wrapper']}>
        <div className={styles['pdf-container']}>
          <PDFViewer />
        </div>
        <div className={styles['description']}>
          <h4>Descrição</h4>
          <p>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit, libero sodales iaculis tincidunt, arcu arcu efficitur dui, ac sodales augue nisi at purus. Sed ornare rhoncus ante eget feugiat. Suspendisse molestie placerat vehicula. Proin imperdiet quis nisl non porttitor. Morbi convallis ligula felis, et viverra augue luctus ut. Sed vel turpis euismod, varius nulla elementum, varius dui. Etiam dignissim vehicula est ut rhoncus. Praesent imperdiet imperdiet diam vitae porttitor. Proin tellus tellus, maximus at erat nec, fermentum efficitur lorem. Sed imperdiet elit eu odio sodales, at lacinia eros mattis.
          </p>
        </div>
      </div>
      <strong className={styles['class']}>Análise e Desenvolvimento de Sistemas</strong>
      <strong className={styles['authors-title']}>Autores</strong>
      <div className={styles['authors-container']}>
        <span>Vinicius Silva Rezende</span>
        <span>Gabriel Renato</span>
      </div>
      <strong className={styles['tags-title']}>TAGS</strong>
      <div className={styles['tags-container']}>
        <span>TAG 1</span>
        <span>TAG 2</span>
        <span>TAG 3</span>
      </div>
      <div className={styles['button-area']}>
        <a href="">Ver Mais</a>
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
