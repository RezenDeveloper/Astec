import type { NextApiRequest, NextApiResponse } from 'next'
import { Author, Work } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await getWork(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const getWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const work = await handleGetWork(id)
    
    return res.status(200).json(work)
  } catch (error) {
    return res.status(500).json({ error: error }) 
  }
}

export const handleGetWork = async (id:string) => {
  const work = await Work.findByPk(id, {
    include: [
      {
        association: 'subject'
      },
      {
        association: 'tags'
      },
      {
        association: 'authors'
      }
    ],
  })

  return JSON.parse(JSON.stringify(work))
}