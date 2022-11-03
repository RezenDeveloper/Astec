import { google } from 'googleapis'
import settings from '../../../../google-settings.json'
import fs from 'fs'
import path from 'path'
import { Readable } from 'stream';

import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET': return await getPDF(req, res)
    case 'POST': return await createPDF(req, res)
    case 'DELETE': return await deletePDF(req, res)
    default: return res.status(500).send(`Invalid method`)
  }
}

const getDrive = () => {
  const j2 = new google.auth.JWT(
    settings.client_email, 
    undefined, 
    settings.private_key,
    'https://www.googleapis.com/auth/drive', 
    undefined
  )
  
  return google.drive({
    version: "v3",
    auth: j2
  })
}

const getPDF = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const drive = getDrive()
    const id = req.query.id

    if(!id) {
      const { data:pdf } = await drive.files.list({
        fields: 'files/webViewLink, files/webContentLink, files/name, files/id'
      })

      return res.status(200).send(pdf)
    }
    
    const { data:pdf } = await drive.files.get({
      fileId: id as string,
      alt: 'media',
    }, {
      responseType: 'stream'
    })

    res.setHeader('Content-Type', 'application/pdf')
    res.send(pdf)
  } catch (error) {
    console.log(error)
    res.status(400).send('')
  }
}

const createPDF = async (req: NextApiRequest, res: NextApiResponse) => {  
  try {
    const drive = getDrive()
    const pdfPath = path.resolve(__dirname, '../../../../public/test.pdf')
    const file = fs.createReadStream(pdfPath)

    const { data:createData } = await drive.files.create({
      requestBody: {
        name: 'teste.pdf',
      },
      media: {
        mimeType: 'application/pdf',
        body: file
      }
    })

    const fileId = createData.id
    if(!fileId) throw new Error('File not found')

    await drive.permissions.create({
      fileId,
      requestBody: {
        role: 'reader',
        type: 'anyone'
      }
    })

    const { data } = await drive.files.get({
      fileId,
      fields: 'webViewLink, webContentLink'
    })

    console.log(data)
  
    res.status(200).send(data)    
  } catch (error) {
    console.log(error)
    res.status(400).send('')
  }
}

export const handleCreatePDF = async (file: string) => {
  const drive = getDrive()

  const buffer = Buffer.from(file,'base64')
  const fileStream = Readable.from(buffer)

  const { data:createData } = await drive.files.create({
    requestBody: {
      name: 'teste.pdf',
    },
    media: {
      mimeType: 'application/pdf',
      body: fileStream
    }
  })

  const fileId = createData.id
  if(!fileId) throw new Error('File not found')

  await drive.permissions.create({
    fileId,
    requestBody: {
      role: 'reader',
      type: 'anyone'
    }
  })

  const { data } = await drive.files.get({
    fileId,
    fields: 'webViewLink, webContentLink'
  })

  return {
    fileId,
    data
  }
}

export const handleUpdatePDF = async (file: string, id: string) => {
  const drive = getDrive()

  const buffer = Buffer.from(file,'base64')
  const fileStream = Readable.from(buffer)

  const { data:createData } = await drive.files.update({
    fileId: id,
    requestBody: {
      name: 'teste.pdf',
    },
    media: {
      mimeType: 'application/pdf',
      body: fileStream
    }
  })

  const fileId = createData.id
  if(!fileId) throw new Error('File not found')

  const { data } = await drive.files.get({
    fileId,
    fields: 'webViewLink, webContentLink'
  })

  return {
    fileId,
    data
  }
}

const deletePDF = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id

  if(!id) res.status(400).send('id not specified')

  const drive = getDrive()

  const { data } = await drive.files.delete({
    fileId: id as string
  })

  console.log(data)

  res.status(200).send('Deleted')
}