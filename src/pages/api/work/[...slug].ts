import type { NextApiRequest, NextApiResponse } from 'next'
import { Tag, Work } from '../../../database/models'
import { WorkModel } from '../../../database/models/Work'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  
  const [id] = req.query.slug as string[]

  const work = await Work.findByPk(id)
  if(!work) return res.status(400).json({ error: 'Work not found' })

  switch (req.method) {
    case 'POST': return await createTag(req, res, work)
    default: {
      return res.status(500).send(`Invalid method`)
    }
  }
}

const createTag = async (req: NextApiRequest, res: NextApiResponse, work: WorkModel) => {
  try {
    const { name } = req.body

    const [ tag ] = await Tag.findOrCreate({
      where: { name },
    })

    // @ts-expect-error
    await work.addTag(tag)
    
    return res.status(200).json(tag)
  } catch (error) {
    return res.status(500).json({ error: error }) 
  }
}