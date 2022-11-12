import type { NextApiRequest, NextApiResponse } from 'next'
import { Op, Sequelize } from 'sequelize'
import { Tag } from '../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await getAllTags(req, res)
    case 'POST': return await createTag(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const getAllTags = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tags = await handleGetAllTags(req.query as Params)
    
    res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}

const createTag = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      name
    } = req.body

    const tag = await Tag.create({
      name
    })
    
    res.status(201).json(tag)
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}

export const handleGetAllTags = async (filter?:Params) => {
  
  const query = filter?.query || ''
  const author = filter?.author || ''
  const year = filter?.year
  const subject = filter?.subject
  let where: any = {}

  try {
    
    if(year !== undefined) where.year = year
    if(subject !== undefined) where.subject_id = subject
     
     const resTags = await Tag.findAll({
        include: [
          {
            association: 'works',
            attributes: ['id'],
            where: {
              title: {
                [Op.like]: `%${query || ''}%`
              },
              ...where
            },
            include: [
              {
                association: 'authors',
                attributes: [],
                where: {
                  name: {
                    [Op.like]: `%${author || ''}%`
                  }
                }
              }
            ]
          },
        ],
        attributes: {
          include: [[Sequelize.fn("COUNT", Sequelize.fn('DISTINCT', Sequelize.col("works.id"))) , "total"]] 
        },
        
        group: ['id'],
        order: [['total', 'DESC']]
     })
   
     return JSON.parse(JSON.stringify(resTags))
  } catch (error) {
    console.log(error)
  }
}