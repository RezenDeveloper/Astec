import React, { useState } from 'react';
import styles from './styles.module.scss';


export interface TagsProps {
  text: string;
  id: string;
  total: number;
  isSelected: boolean;
  handleTagSelect: (id:string) => void
}

export const Tag = ({ text, total, id, isSelected, handleTagSelect }: TagsProps) => {

  return (
    <button 
      className={`${styles['tag-container']} ${isSelected ? styles['tag-container--selected'] : ''}`} 
      role='button'
      aria-pressed={isSelected}
      onClick={() => {
        handleTagSelect(id)
      }}
    >
      {text} <span>({total})</span>
    </button>
  );
}