import type { NextApiRequest, NextApiResponse } from 'next'
import { Op } from 'sequelize'
import { Author, Work } from '../../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await searchWork(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}
const searchWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await handleSearchWork(req.query as { [key: string]: string })
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error }) 
  }
}

export const handleSearchWork = async (reqQuery: { [key: string]: string }) => {
  let where:any = {}
  let tagsWhere:any = {}

  const {
    query,
    year,
    subject,
    author,
    tags,
    order,
    limit,
    offset
  } = reqQuery

  if(year !== undefined) where.year = year
  if(subject !== undefined) where.subject_id = subject
  if(tags) tagsWhere = {[Op.or]: tags.split(',').map(value => ({ id: value.trim() }))}

  const workList = await Work.findAll({
    attributes: ['id'],
    where: {
      title: {
        [Op.like]: `%${query || ''}%`
      },
      ...where,
    },
    include: [
      {
        attributes: ['id'],
        association: 'tags',
        where: {
          ...tagsWhere
        }
      },
      {
        attributes: ['id'],
        association: 'authors',
        where: {
          name: {
            [Op.like]: `%${author || ''}%`
          }
        }
      }        
    ]
  })

  const fullWorkList = await Work.findAll({
    where: {
      id: {
        [Op.in]: workList.map(({ id }) => id)
      }
    },
    include: [
      {
        association: 'tags'
      },
      {
        association: 'subject'
      },
      {
        association: 'authors'
      }
    ],
    order: order === 'recent' ? [['createdAt', 'DESC']] : [],
    limit: parseInt(limit) || 10,
    offset: parseInt(offset) || 0,
  })

  const total = await Work.count({
    where: {
      id: {
        [Op.in]: workList.map(({ id }) => id),
      }
    }
  })
  
  return ({
    result: fullWorkList.map(work => JSON.parse(JSON.stringify(work.toJSON()))),
    pagination: {
      total,
      offset: parseInt(offset) || 0
    }
  }) as unknown as SearchWork
}