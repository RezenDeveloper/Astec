import React from 'react';

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
  onChange: React.ChangeEventHandler<HTMLInputElement>
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
  return (
    <div className={styles['select-input']}>
      <label>{label}</label>
      <div className={styles['select-input--field']}>
        <p></p>
      </div>
    </div>
  );
}
