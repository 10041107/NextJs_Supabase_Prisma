import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { currentPassword, newPassword } = req.body;
    const token = verifyToken(req);

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: token.userId },
      });

      if (!user || !bcrypt.compareSync(currentPassword, user.password)) {
        return res.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
      }

      const hashedPassword = bcrypt.hashSync(newPassword, 10);
      await prisma.user.update({
        where: { id: token.userId },
        data: { password: hashedPassword },
      });

      res.status(200).json({ message: '비밀번호가 변경되었습니다.' });
    } catch (error) {
      res.status(500).json({ message: '서버 에러가 발생했습니다. 나중에 다시 시도해 주세요.' });
    }
  } else {
    res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
  }
}

