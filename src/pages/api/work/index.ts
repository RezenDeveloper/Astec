import type { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from 'sequelize'
import { Tag, Work } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': return await createWork(req, res)
    case 'GET': return await getAllWorks(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const createWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      title,
      description,
      subjectId,
      tags,
      year
    } = req.body
    
    if(!title || !description || !subjectId || !tags?.length || !year) return res.status(404).json({ message: 'Invalid fields' })

    const work = await Work.create({
      title,
      description,
      year,
      subject_id: subjectId
    })

    await Promise.all(
      tags.map(async (name: string) => {
        let tag = await Tag.findOne({
          // @ts-expect-error
          where: { 
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
          },
        })

        if(!tag) {
          tag = await Tag.create({ name })
        }
        
        // @ts-expect-error
        await work.addTag(tag)
      })
    )

    const fullWork = await Work.findByPk(work.id, {
      include: [
        {
          association: 'tags'
        }
      ]
    })
    
    res.status(201).json(fullWork)
    
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