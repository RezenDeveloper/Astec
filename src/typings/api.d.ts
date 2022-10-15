interface MethodResponse<T,E> {
  data: T | null
  error: E | null
}

interface ReqWork {
  title: string
  description: string
  subjectId: string
  year: number
  authors: string[]
  tags: string[]
}
interface ResAllWorks {
  id: string
  year: number
  title: string
  description: string
  tags: {
    id: string
    name: string
  }[]
  subject: {
    id: string
    name: string
    description: string
  }
}

interface ReqSubject {
  name: string
  description: string
}

interface ReqUpdateSubject {
  name?: string
  description?: string
}

interface SearchParams {
  query?: string
  year?: string
  author?: string
  subject?: string
  tags?: string
  order?: 'recent'
  limit?: number
  offset?: number
}