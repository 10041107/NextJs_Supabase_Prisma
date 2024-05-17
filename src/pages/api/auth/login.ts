import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: '아이디와 비밀번호를 입력해 주세요.' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        return res.status(404).json({ message: '존재하지 않는 회원입니다.' });
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' });
      }

      const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Path=/`);
      res.status(200).json({ role: user.role });
    } catch (error) {
      res.status(500).json({ message: '서버 에러가 발생했습니다. 나중에 다시 시도해 주세요.' });
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
  }
}
