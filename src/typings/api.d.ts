interface DefaultAPI {
  id: string
  createdAt: string
  updatedAt: string
}

interface Tag extends DefaultAPI{
  name: string
}