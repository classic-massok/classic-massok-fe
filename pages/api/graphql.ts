import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const graphql = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
      const apiRes = await fetch(`http://localhost:8080/api/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body),
      })
  
      const data = await apiRes.json()
  
      if(apiRes.ok) {
        if (req.body.operationName === 'login' && data) {
          res.setHeader(
            'Set-Cookie',
            [
              cookie.serialize('accessToken', String(data.accessToken), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 1, // 15 mins
                sameSite: 'strict',
                path: '/'
              }),
              cookie.serialize('refreshToken', String(data.refreshToken), {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 1, // 15 mins
                sameSite: 'strict',
                path: '/'
              }),
            ]
          )
        }

        res.status(200).json(data)
      } else {
        res.status(data.statusCode).json({message: data.message})
      }
  
    } else {
      res.setHeader('Allow', ['POST'])
      res.status(405).json({message: `Method ${req.method} not allowed`})
    }
  }

export default graphql