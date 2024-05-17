import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { createRouter } from 'next-connect';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(upload.single('profileImage'));

router.post(async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ message: '모든 필드를 입력해 주세요.' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: '이미 존재하는 회원입니다.' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        profileImage: req.file ? `/uploads/${req.file.filename}` : undefined,
      },
    });

    res.status(201).json({ message: '회원가입이 완료되었습니다.' });
  } catch (error) {
    res.status(500).json({ message: '서버 에러가 발생했습니다. 나중에 다시 시도해 주세요.' });
  } finally {
    await prisma.$disconnect();
  }
});

export default router.handler({
  onError(error, req, res) {
    res.status(500).json({ message: error.message });
  },
  onNoMatch(req, res) {
    res.status(405).json({ message: '허용되지 않은 메소드입니다.' });
  },
});

export const config = {
  api: {
    bodyParser: false, // Multer가 파일 파싱을 처리하므로 bodyParser를 false로 설정
  },
};

