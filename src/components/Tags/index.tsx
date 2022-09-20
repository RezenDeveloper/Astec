import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios';

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
  autocomplete?: {
    route: string
  }
  className?: string
}

export const TagInput = ({ tags, id, label, autocomplete, className = ''}: TagInputProps) => {

  const [input, setInput] = useState('')
  const [search, setSearch] = useState<Tag[]>([])

  useEffect(() => {
    const handleAutoComplete = async () => {
      const { data } = await  axios.get<Tag[]>(autocomplete!.route, {
        params: {
          name: input
        }
      })
      
      setSearch(data.filter(({ name }) => !tags.value.includes(name)))
    }
    if(input.length > 2 && autocomplete) {
      handleAutoComplete();
    } else {
      setSearch([])
    }
  }, [input])

  const handleKeyDown:React.KeyboardEventHandler<HTMLInputElement> | undefined = (e) => {
    const { key } = e
    const trimmedInput = input.trim()

    if (key === 'Enter') {
      e.preventDefault()
      addNewTag(trimmedInput)
    }

    if (key === "Backspace" && !input.length && tags.value.length) {
      e.preventDefault()
      const tagsCopy = [...tags.value]
      const poppedTag = tagsCopy.pop()
  
      tags.setValue(tagsCopy)
      if(poppedTag) setInput(poppedTag)
    }
  }

  const handleAutocompleteKeyDown = (e:React.KeyboardEvent<HTMLLIElement>, name:string) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        addNewTag(name)
        break;
      default:
        break;
    }
  }

  const addNewTag = (input: string) => {
    setInput('')
    if(input.length) {
      if(tags.value.includes(input)) return
      else tags.setValue(prevState => [...prevState, input])
    }
  }

  const handleRemove = (deleteTag: string) => {
    const newValue = tags.value.filter(tag => tag !== deleteTag)
    tags.setValue(newValue)
  }

  return (
    <div className={`${styles['tag-input']} ${className}`}>
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
          onBlur={() => {
            if(search.length > 0) return
            addNewTag(input)
          }}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
      </div>
      {search.length > 0 && (
        <ul className={styles['tag-autocomplete']}>
          {search.map(({name, id}, index) => (
            <li 
              key={id}
              tabIndex={0}
              onKeyDown={(e) => handleAutocompleteKeyDown(e, name)}
              onClick={() => addNewTag(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}