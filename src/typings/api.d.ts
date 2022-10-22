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

interface Pagination {
  offset: number
  total: number
}

interface ResWork {
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
  authors: {
    id: string
    name: string
  }[]
}
interface ResAllWorks {
  result: ResWork[]
  pagination: Pagination
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

interface ReqAuthenticate {
  email: string
  password: string
}