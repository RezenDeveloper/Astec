import React, { useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai'

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

export interface TagInputProps {
  tags: {
    value: string[]
    setValue: React.Dispatch<React.SetStateAction<string[]>>
  }
  id: string
  label: string
  className?: string
}

export const TagInput = ({ tags, id, label, className = '' }: TagInputProps) => {

  const [input, setInput] = useState('')

  const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> | undefined = (e) => {
    const { key } = e
    const trimmedInput = input.trim()

    if (key === 'Enter') {
      e.preventDefault()
      setInput('')
      if(trimmedInput.length) {
        if(tags.value.includes(trimmedInput)) return
        else tags.setValue(prevState => [...prevState, trimmedInput])
      }
    }

    if (key === "Backspace" && !input.length && tags.value.length) {
      e.preventDefault()
      const tagsCopy = [...tags.value]
      const poppedTag = tagsCopy.pop()
  
      tags.setValue(tagsCopy)
      if(poppedTag) setInput(poppedTag)
    }
  }

  const handleRemove = (deleteTag: string) => {
    const newValue = tags.value.filter(tag => tag !== deleteTag)
    tags.setValue(newValue)
  }

  return (
    <div className={className}>
      <label className={styles['tag-input--label']} htmlFor={id}>{label}</label>
      <div className={styles['tag-input--container']}>
        {tags.value.map((tag, index) => (
          <span className={styles['tag']} key={`${tag}-${index}`}>
            {tag}
            <button 
              aria-label='Remover'
              onClick={() => handleRemove(tag)}
              className={styles['tag--icon']}
            >
              <AiOutlineClose size={10} />
            </button>
          </span>
        ))}
        <input
          id={id}
          value={input}
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
      </div>
    </div>
  )
}