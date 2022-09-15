import type { NextApiRequest, NextApiResponse } from 'next'
import { Work } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await getWork(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const getWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const work = await Work.findByPk(id, {
      include: [
        {
          association: 'subject',
        },
        {
          association: 'tags'
        }
      ]
    })
    
    return res.status(200).json(work)
  } catch (error) {
    return res.status(500).json({ error: error }) 
  }
}