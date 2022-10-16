interface Year {
  id: string
  value: string
}

interface SearchTag { 
  id: string
  name: string
  total: number
}

interface Author {
  id: string
  name: string
}

interface Work {
  title: string
  id: string
  description: string
  tagArray: string[]
  year: number
  subject: {
    id: string
    name: string
    description: string
  }
  authors: Author[]
}

interface SearchWork {
  result: Work[]
  pagination: Pagination
}

type ErrorTypes = 'error' | 'error__min' | 'error__max' | undefined
interface ErrorObj {
  title: ErrorTypes
  description: ErrorTypes
  tag: ErrorTypes
  author: ErrorTypes
  year: ErrorTypes
  subject: ErrorTypes
  file: ErrorTypes
}
