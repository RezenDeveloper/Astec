import type { NextApiRequest, NextApiResponse } from 'next'
import { Manager } from '../../../database/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': return await createManager(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const createManager = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      email,
      password: reqPassword,
    } = req.body

    if(!email || !reqPassword) return res.status(400).send('Invalid fields')

    const token = req.cookies['TGManager_Admin_Token']

    if(!token) return res.status(401).send(`No token provided`)

    jwt.verify(token, process.env.API_SECRET!, async (err, decoded) => {
      if(err) return res.status(401).send(`token invalid`)
      if(decoded) {
        const password = await bcrypt.hash(reqPassword, 12)
        const hasEmail = !!(await Manager.findOne({ where: { email } }))?.id

        if(hasEmail) return res.status(400).send('Email already registered')

        const manager = await Manager.create({
          email,
          password
        })
        return res.status(200).json({
          id: manager.id,
          email: manager.email
        })
      }
    })
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}