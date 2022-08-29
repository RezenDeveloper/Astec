import type { NextApiRequest, NextApiResponse } from 'next'
import { Subject } from '../../../database/models'

export default (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': createSubject(req, res)
    case 'GET': getAllSubjects(req, res)
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

const getAllSubjects = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const subjects = await Subject.findAll()
  
    res.status(200).json(subjects)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}