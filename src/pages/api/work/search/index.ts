import type { NextApiRequest, NextApiResponse } from 'next'
import { Op } from 'sequelize'
import { Work } from '../../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await searchWork(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}
const searchWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query,
      year,
      subject,
      author,
      tags,
      order,
      limit,
      offset
    } = req.query as { [key: string]: string }

    let where:any = {}
    let tagsWhere:any = {}

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
        }
      ],
      order: order === 'recent' ? [['createdAt', 'DESC']] : [],
      limit: parseInt(limit) || 10,
      offset: parseInt(offset) || 0,
    })
    
    res.status(200).json(fullWorkList)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error }) 
  }
}