import type { NextApiRequest, NextApiResponse } from 'next'
import { Author } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': return await createAuthor(req, res)
    case 'GET': return await getAllAuthors(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const createAuthor = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      name,
      work_id
    } = req.body

    const author = await Author.create({
      name,
      work_id
    })
    
    res.status(201).json(author)
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const getAllAuthors = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const authors = await Author.findAll()
  
    res.status(200).json(authors)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}