import type { NextApiRequest, NextApiResponse } from 'next'
import { Tag } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await getAllTags(req, res)
    case 'POST': return await createTag(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const getAllTags = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tags = await Tag.findAll()
    
    res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}

const createTag = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      name
    } = req.body

    const tag = await Tag.create({
      name
    })
    
    res.status(201).json(tag)
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}