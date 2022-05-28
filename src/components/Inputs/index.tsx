import React, { useState } from 'react';

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
  return (
    <div className={styles['select-input']}>
      <label>{label}</label>
      <div className={styles['select-input--field']}>
        <p onClick={() => setOpen(!open)}>{selected?.value || ''}</p>
        <ul className={`${styles['select-input--dropdown'] } ${open ? styles['open'] : ''}`}>
          {valueList.map((({ id, value }) => {
            const isSelected = id === selected?.id
            return (
              <li
                key={id}
                role='option'
                aria-selected={isSelected}
                className={isSelected ? styles['select-option--selected'] : styles['select-option']}
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
