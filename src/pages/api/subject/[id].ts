import type { NextApiRequest, NextApiResponse } from 'next'
import { Subject } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'PUT': return await updateSubject(req, res)
    case 'DELETE': return await deleteSubject(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const updateSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const {
      name,
      description
    } = req.body

    const subject = await Subject.findOne({ where: { id } })

    if(!subject) return res.status(404).send(`Subject not found`)

    subject.update({
      name,
      description
    })
    
    return res.status(200).json(subject)
  } catch (error) {
    return res.status(500).json({ error: error })
  }
}

const deleteSubject = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string

    const subject = await Subject.findOne({ where: { id } })

    if(!subject) return res.status(404).send(`Subject not found`)

    await subject.destroy()
    console.log('ok')
    
    res.status(200).end()
  } catch (error) {
    // @ts-expect-error
    const name = error.name

    if(name === "SequelizeForeignKeyConstraintError") {
      return res.status(400).json({ error: name })
    }

    res.status(500).json({ error: error })
  }
}
