interface Subject {
  id: string
  title: string
  description: string
}

interface Year {
  id: string
  value: string
}

interface Tag { 
  id: string
  text: string
  total: number
}

interface Work {
  title: string,
  description: string
  fileId: string,
  authorArray: string[],
  tagArray: string[],
  subject: string,
  year: number,
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
