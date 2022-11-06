import type { NextApiRequest, NextApiResponse } from 'next'
import { Manager } from '../../../database/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST': return await handleLogin(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      email,
      password
    } = req.body

    const manager = await Manager.findOne({
      where: { email }
    })
    
    if(!manager) return res.status(400).send('Usuário não encontrado')

    if(!await bcrypt.compare(password, manager.password)) return res.status(400).send('Senha incorreta')

    const token = jwt.sign({ id: manager.id }, process.env.API_SECRET!, {
      expiresIn: 86400
    })

    res.setHeader('Set-Cookie', serialize('TGManager_Admin_Token', token, { path: '/' }))
    res.json({
      manager: {
        id: manager.id,
        email: manager.email
      },
      token
    })
    
  } catch (error) {
    res.status(500).json({ error: error })
  }
}