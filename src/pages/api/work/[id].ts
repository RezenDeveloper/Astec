import type { NextApiRequest, NextApiResponse } from 'next'
import { Work } from '../../../database/models'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': getWork(req, res)
  }
}

const getWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const work = await Work.findByPk(id, {
      include: {
        association: 'subject'
      }
    })
    
    res.status(200).json(work)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}