import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const token = verifyToken(req);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      await prisma.user.delete({
        where: { id: token.userId },
      });

      res.setHeader('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0');
      res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

