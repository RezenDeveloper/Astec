interface DefaultAPI {
  id: string
  createdAt: string
  updatedAt: string
}

interface Tag extends DefaultAPI{
  name: string
}

interface Subject extends DefaultAPI {
  name: string
  description: string
}

interface Manager extends DefaultAPI {
  email: string
}