
interface MethodResponse<T> {
  data: T | null
  error: any | null
}

interface ReqWork {
  title: string
  description: string
  subjectId: string
  year: number
  tags: string[]
}

interface ReqSubject {
  name: string
  description: string
}

interface ReqUpdateSubject {
  name?: string
  description?: string
}