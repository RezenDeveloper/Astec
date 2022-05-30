import React, { useState } from 'react';
import styles from './styles.module.scss';


export interface TagsProps {
  text: string;
  id: string;
  total: number;
  handleTagSelect: (id:string) => void
}

export const Tag = ({ text, total, id, handleTagSelect }: TagsProps) => {

  const [selected, setSelected] = useState(false)

  return (
    <button 
      className={`${styles['tag-container']} ${selected ? styles['tag-container--selected'] : ''}`} 
      role='button'
      aria-pressed={selected}
      onClick={() => {
        handleTagSelect(id)
        setSelected(!selected)
      }}
    >
      {text} <span>({total})</span>
    </button>
  );
}