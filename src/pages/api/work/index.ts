import type { NextApiRequest, NextApiResponse } from 'next'
import Work from '../../../database/models/Work'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': createWork(req, res)
    case 'GET': getAllWorks(req, res)
  }
}

const createWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      title,
      description,
      subject_id,
      year
    } = req.body

    const work = await Work.create({
      title,
      description,
      year,
      subject_id
    })
    
    res.status(201).json(work)
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

const getAllWorks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const works = await Work.findAll()
  
    res.status(200).json(works)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}