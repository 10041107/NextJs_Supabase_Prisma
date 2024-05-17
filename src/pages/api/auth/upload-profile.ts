import type { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';
import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../../lib/auth';
import path from 'path';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB 파일 크기 제한
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('이미지 파일만 업로드 가능합니다.'));
    }
  },
});

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(upload.single('profileImage'));

router.put(async (req, res) => {
  const token = verifyToken(req);

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { username, role } = req.body;

  if (!username || !role) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const user = await prisma.user.update({
      where: { id: token.userId },
      data: {
        username,
        role,
        profileImage: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    console.error('Error updating user:', error);  // 오류 로그 추가
    res.status(500).json({ message: '서버 에러가 발생했습니다. 나중에 다시 시도해 주세요.' });
  } finally {
    await prisma.$disconnect();
  }
});

export const config = {
  api: {
    bodyParser: false, // Multer가 파일 파싱을 처리하므로 bodyParser를 false로 설정
  },
};

export default router.handler({
  onError(error, req, res) {
    res.status(500).json({ message: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  },
});
