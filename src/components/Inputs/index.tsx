import React, { useState } from 'react';
import { MdArrowDropDown } from 'react-icons/md'
import styles from './styles.module.scss';


export interface TextInputProps {
  id: string
  label: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  value: string | undefined
}

export interface SelectInputProps {
  label: string
  selectedId: string | undefined
  valueList: {
    value: string
    id: string
  }[]
  onChange: (id: string) => void
}

export const TextInput = ({ id, label, onChange, value }: TextInputProps) => {
  return (
    <div className={styles['text-input']}>
      <label htmlFor={id}>{label}</label>
      <input 
        id={id} 
        type="text"
        onChange={onChange} 
        value={value}
      />
    </div>
  );
}

export const SelectInput = ({ selectedId, label, onChange, valueList }: SelectInputProps) => {
  
  const selected = valueList.find((value) => selectedId === value.id)
  const [open, setOpen] = useState(false)

  const handleKeyDown = (e:React.KeyboardEvent<HTMLLIElement>, id: string) => {
    switch (e.key) {
      case " ":
      case "SpaceBar":
      case "Enter":
        e.preventDefault();
        onChange(id);
        setOpen(false);
        break;
      default:
        break;
    }
  }

  return (
    <div className={`${styles['select-input']} ${open ? styles['open'] : ''}`}>
      <label>{label}</label>
      <div className={styles['select-input--field']}>
        <button
          onClick={() => setOpen(!open)}
          aria-haspopup="listbox"
          role='button'
          aria-expanded={open}
          tabIndex={0}
        >
          {selected?.value || ''}
          <MdArrowDropDown size={20} />
        </button>
        <ul 
          className={`${styles['select-input--dropdown'] }`}
          role='listbox'
          aria-activedescendant={selected?.id}
          tabIndex={-1}
        >
          {valueList.map((({ id, value }) => {
            const isSelected = id === selected?.id
            return (
              <li
                key={id}
                role='option'
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, id)}
                aria-selected={isSelected}
                className={`${styles['select-option']} ${isSelected ? styles['select-option--selected'] : ''}`}
                onClick={() => {
                  onChange(id)
                  setOpen(!open)
                }}
              >
                {value}
              </li>
            )
          }))}
        </ul>
      </div>
    </div>
  );
}
