import type { NextApiRequest, NextApiResponse } from 'next'
import Work from '../../../database/models/Work'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': getWork(req, res)
  }
}

const getWork = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string
  const work = await Work.findByPk(id)
  
  res.status(200).json(work)
}