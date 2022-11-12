import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface FilterContextData {
  year: string
  setYear: Dispatch<SetStateAction<string>>
  author: string
  setAuthor: Dispatch<SetStateAction<string>>
  subject: string
  setSubject: Dispatch<SetStateAction<string>>
  tagArray: string[]
  setTagArray: Dispatch<SetStateAction<string[]>>
  closed: boolean
  setClosed: Dispatch<SetStateAction<boolean>>
}

const FilterContext = createContext({} as FilterContextData)

export const FilterContextProvider: React.FC = ({
  children
}) => {
  const [year, setYear] = useState('')
  const [author, setAuthor] = useState('')
  const [subject, setSubject] = useState('')
  const [tagArray, setTagArray] = useState<string[]>([])
  const [closed, setClosed] = useState(true)
  
  return (
    <FilterContext.Provider
      value={{
        year,
        setYear,
        author,
        setAuthor,
        subject,
        setSubject,
        tagArray,
        setTagArray,
        closed,
        setClosed
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => {
  const context = useContext(FilterContext)

  if (!context) {
    throw new Error('useFilter must be inside a FilterContextProvider')
  }

  return context
}
