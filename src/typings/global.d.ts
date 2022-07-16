interface Subject {
  id: string
  value: string
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

interface ErrorObj {
  title: boolean
  description: boolean
  tag: boolean
  author: boolean
  year: boolean
  subject: boolean
  file: boolean
}
