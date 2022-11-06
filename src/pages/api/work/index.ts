import type { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from 'sequelize'
import { Tag, Work, Author } from '../../../database/models'
import { handleCreatePDF } from '../pdf'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': return await createWork(req, res)
    case 'GET': return await getAllWorks(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

interface CreateWorkBody {
  title?: string
  description?: string
  subjectId?: string
  tags?: string[]
  authors?: string[]
  year?: number
  file?: string
}

const createWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      title,
      description,
      subjectId,
      tags,
      authors,
      year,
      file
    } = req.body as CreateWorkBody
    
    if(
      !title || 
      !description || 
      !subjectId || 
      !tags?.length ||
      !authors?.length || 
      !year ||
      !file
    ) return res.status(404).json({ message: 'Invalid fields' })

    const { fileId } = await handleCreatePDF(file)

    const work = await Work.create({
      title,
      description,
      year,
      subject_id: subjectId,
      pdf_id: fileId
    })

    await Promise.all(
      tags.map(async (name: string) => {
        let tag = await Tag.findOne({
          // @ts-ignore
          where: { 
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
          },
        })

        if(!tag) {
          tag = await Tag.create({ name })
        }
        
        // @ts-ignore
        await work.addTag(tag)
      })
    )

    await Promise.all(
      authors.map(async (name: string) => {
        let author = await Author.findOne({
          // @ts-ignore
          where: { 
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
          },
        })

        if(!author || author.work_id !== work.id) {
          await Author.create({ 
            name,
            work_id: work.id
          })
        }
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
    console.log('error')
  }
}

const getAllWorks = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const order = req.query.order as string

    const works = await Work.findAll({
      include: [
        {
          association: 'subject'
        },
        {
          association: 'tags'
        }
      ],
      order: order === 'recent' ? [['createdAt', 'DESC']] : []
    })
  
    res.status(200).json(works)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}