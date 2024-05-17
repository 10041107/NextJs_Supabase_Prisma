import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
    res.status(200).json({ message: '로그아웃되었습니다.' });
  } else {
    res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
  }
}

