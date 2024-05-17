export type User = {
  id: number
  username: string
  password: string
  role: 'admin' | 'public'
  createdAt: string
  updatedAt: string
}

export type Page = {
  id: number
  title: string
  content: string
  fileUrl?: string
  createdAt: string
  updatedAt: string
}
