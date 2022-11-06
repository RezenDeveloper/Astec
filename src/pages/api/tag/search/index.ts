import type { NextApiRequest, NextApiResponse } from 'next'
import { Op } from 'sequelize'
import { Tag } from '../../../../database/models'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await searchTag(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}
const searchTag = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const name = req.query.name as string

    if(!name) {
      return res.status(500).json({ error: 'name not specified' }) 
    }
    
    const tags = await Tag.findAll({
      where: {
        name: {
          [Op.startsWith]: name
        }
      },
      attributes: ['name', 'id']
    })    
    
    res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({ error: error }) 
  }
}