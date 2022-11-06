import type { NextApiRequest, NextApiResponse } from 'next'
import { Sequelize } from 'sequelize'
import { Author, Tag, Work } from '../../../database/models'
import { handleUpdatePDF } from '../pdf'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await getWork(req, res)
    case 'PATCH': return await updateWork(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

interface UpdateWorkBody {
  title?: string
  description?: string
  subjectId?: string
  tags?: string[]
  authors?: string[]
  year?: number
  file?: string
}

const getWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const id = req.query.id as string
    const work = await handleGetWork(id)
    
    return res.status(200).json(work)
  } catch (error) {
    return res.status(500).json({ error: error }) 
  }
}

export const handleGetWork = async (id:string) => {
  const work = await Work.findByPk(id, {
    include: [
      {
        association: 'subject'
      },
      {
        association: 'tags'
      },
      {
        association: 'authors'
      }
    ],
  })

  return JSON.parse(JSON.stringify(work))
}

const updateWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      title,
      description,
      subjectId,
      tags,
      authors,
      year,
      file
    } = req.body as UpdateWorkBody

    if(
      !title || 
      !description || 
      !subjectId || 
      !tags?.length ||
      !authors?.length || 
      !year ||
      !file
    ) return res.status(404).json({ message: 'Invalid fields' })

    const workId = req.query.id as string

    const work = await Work.findByPk(workId as string, {
      attributes: {
        include: ['pdf_id']
      }
    })
    
    if(!work) return res.status(404).json({ message: 'Invalid fields' })

    await handleUpdatePDF(file, work.pdf_id)

    await Work.update({
      title,
      description,
      year,
      subject_id: subjectId,
      pdf_id: work.pdf_id
    }, {
      where: {
        id: workId
      }
    })

    // @ts-ignore
    const allTags = await work.getTags() as string[]

    await Promise.all(
      allTags.map(async tag => {
        // @ts-ignore
        await work.removeTag(tag)
      })
    )

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

    await Author.destroy({
      where: {
        work_id: work.id
      }
    })

    await Promise.all(
      authors.map(async (name: string) => {
        let author = await Author.findOne({
          // @ts-ignore
          where: { 
            name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + name.toLowerCase() + '%')
          },
        })

        if(!author || author.work_id !== workId) {
          await Author.create({ 
            name,
            work_id: workId
          })
        }
      })
    )

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: error })
    console.log('error')
  }
}