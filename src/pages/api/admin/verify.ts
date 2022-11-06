import type { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await verifyToken(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const verifyToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = req.cookies['TGManager_Admin_Token']
    
    if(!token) return res.status(401).send(`No token provided`)

    jwt.verify(token, process.env.API_SECRET!, (err, decoded) => {
      if(err) return res.status(401).send(`token invalid`)
      if(decoded) return res.status(200).json({
        logged: true
      })
    })

  } catch (error) {
    res.status(500).json({ error: error })
  }
}