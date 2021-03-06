import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    // DESTROY COOKIE
    res.setHeader(
        'Set-Cookie',
        [
            cookie.serialize('accessToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }),
            cookie.serialize('refreshToken', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                expires: new Date(0),
                sameSite: 'strict',
                path: '/'
            }),
        ]
    )

    res.status(200).json({ message: "Success"})

  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}

export default logout