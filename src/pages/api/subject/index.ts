import type { NextApiRequest, NextApiResponse } from 'next'
import Subject from '../../../database/models/Subject'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': createSubject(req, res)
  }
}

const createSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      name,
      description
    } = req.body

    const subject = await Subject.create({
      name,
      description
    })
    
    res.status(201).json(subject)
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}