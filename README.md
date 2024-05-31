## Next.js + Supabase + Prisma Initial Setup Template

This is an initial setup template for a web application using Next.js, Supabase, and Prisma.

&nbsp;

# What is Supabase?

Supabase is an open-source Firebase alternative that provides real-time databases, authentication, storage, and serverless functions. With Supabase and Next.js, you can implement various features. Here, we will explain each feature with examples of Next.js code.

### **Supabase Features**

1. **Authentication**
   - User registration and login
   - Social login (Google, Facebook, etc.)
   - Password reset
   - Email verification
   - Multi-factor authentication
2. **Database**
   - PostgreSQL-based database
   - Real-time database updates
   - Complex queries and triggers
   - Row Level Security (RLS)
3. **Storage**
   - File upload and management
   - Public and private files
   - Image optimization and transformation
4. **Serverless Functions**
   - Edge Functions for serverless functions
   - Creating RESTful API endpoints

&nbsp;

# Folder Structure

```
my-project/
├── node_modules/
├── prisma/
│ ├── migrations/
│ └── schema.prisma
├── public/
│ ├── next.svg
│ └── vercel.svg
├── src/
│ ├── components/
│ │ └── layout/
│ │ └── Layout.tsx
│ ├── lib/
│ │ ├── auth.ts
│ │ └── supabaseClient.ts
│ ├── pages/
│ │ ├── admin/
│ │ │ └── index.tsx
│ │ ├── api/
│ │ │ └── auth/
│ │ │ ├── login.ts
│ │ │ └── me.ts
│ │ ├── public/
│ │ │ └── index.tsx
│ │ ├── _app.tsx
│ │ ├── _document.tsx
│ │ └── index.tsx
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── types/
│ └── utils/
├── .env
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

&nbsp;

# Explanation

- **`prisma/`**: Contains Prisma-related files.
  - `schema.prisma`: Prisma schema file.
  - `migrations/`: Contains Prisma migration files.
- **`public/`**: Contains static files like images and icons.
- **`src/`**: Contains the source code.
  - **`components/`**: Contains reusable React components, including layout components.
  - **`lib/`**: Contains libraries or helper functions used throughout the project, such as authentication logic and Supabase client setup.
  - **`pages/`**: Contains Next.js pages. The folder structure reflects the URL structure.
    - `api/`: Contains API routes.
    - `admin/`: Contains admin-related files.
    - `public/`: Contains files for public-facing pages.
  - **`styles/`**: Contains CSS files, including global styles and modular CSS files.
  - **`types/`**: Contains TypeScript type definition files.
  - **`utils/`**: Contains utility functions.
- **Other configuration files**:
  - `.env`: Environment variable settings.
  - `.gitignore`: Defines files to be ignored by Git.
  - `next.config.js`: Next.js configuration file.
  - `package.json`: Defines project dependencies and scripts.
  - `postcss.config.js`: PostCSS configuration file.
  - `tailwind.config.js`: Tailwind CSS configuration file.
  - `tsconfig.json`: TypeScript configuration file.

&nbsp;

&nbsp;

## Difference between `lib` and `utils` directories

### `lib` Directory

- **Purpose**: Contains libraries or main modules used throughout the project.
- **Usage**: Includes critical settings or initialization code shared between client and server.
- **Example**: Authentication settings, database client setup, API client setup, etc.

Currently, the `lib/auth.ts` file contains functionality for verifying JWT tokens and can be used across the project. Since it includes significant authentication logic, it is appropriate to place it in the `lib` directory.

### `utils` Directory

- **Purpose**: Contains utility functions that can be reused in multiple places.
- **Usage**: Includes small helper functions performing specific tasks and used throughout the project, but not essential for settings or initialization.
- **Example**: Date formatting functions, string conversion functions, general helper functions, etc.

The `utils` directory is suitable for containing small helper functions that can be reused in specific parts of the project. For example, a function for formatting dates or converting specific strings could be placed here.

### Summary of Differences

- `lib`: Contains modules and settings that play a significant role across the project, such as authentication settings or database client setup.
- `utils`: Contains small helper functions performing specific tasks, such as date formatting functions or string conversion functions.

Currently, the `lib/auth.ts` file has significant functionality related to JWT token verification, making it appropriate to place in the `lib` directory. However, if JWT token verification is a minor helper function in the project, it could also be placed in the `utils` directory. You should decide how to organize `lib` and `utils` directories based on the structure and requirements of your project.

&nbsp;

&nbsp;

&nbsp;

---

# Next.js + Supabase + Prisma 초기 실행 템플릿

Next.js, Supabase, Prisma를 사용하는 웹 애플리케이션을  
빠르게 시작할 수 있는 초기 실행 템플릿입니다.

&nbsp;

# supabase란?

Supabase는 오픈 소스 Firebase 대체 서비스로, 실시간 데이터베이스, 인증, 스토리지, 서버리스 기능을 제공합니다. Supabase와 Next.js를 사용하여 다양한 기능을 구현할 수 있습니다. 여기서는 주요 기능과 Next.js 코드 예시를 통해 각 기능을 설명하겠습니다.

### **Supabase 기능**

1. **인증 (Authentication)**
   - 사용자 등록 및 로그인
   - 소셜 로그인 (Google, Facebook 등)
   - 비밀번호 재설정
   - 이메일 인증
   - 멀티팩터 인증
2. **데이터베이스 (Database)**
   - PostgreSQL 기반 데이터베이스
   - 실시간 데이터베이스 업데이트
   - 복잡한 쿼리 및 트리거
   - 로우 레벨 보안 (Row Level Security)
3. **스토리지 (Storage)**
   - 파일 업로드 및 관리
   - 퍼블릭 및 프라이빗 파일
   - 이미지 최적화 및 변환
4. **서버리스 기능 (Serverless Functions)**
   - Edge Functions을 통한 서버리스 함수
   - RESTful API 엔드포인트 생성

&nbsp;

# 폴더 구조

```
my-project/
├── node_modules/
├── prisma/
│ ├── migrations/
│ └── schema.prisma
├── public/
│ ├── next.svg
│ └── vercel.svg
├── src/
│ ├── components/
│ │ └── layout/
│ │ └── Layout.tsx
│ ├── lib/
│ │ ├── auth.ts
│ │ └── supabaseClient.ts
│ ├── pages/
│ │ ├── admin/
│ │ │ └── index.tsx
│ │ ├── api/
│ │ │ └── auth/
│ │ │ ├── login.ts
│ │ │ └── me.ts
│ │ ├── public/
│ │ │ └── index.tsx
│ │ ├── _app.tsx
│ │ ├── _document.tsx
│ │ └── index.tsx
│ ├── styles/
│ │ ├── globals.css
│ │ └── Home.module.css
│ ├── types/
│ └── utils/
├── .env
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── tsconfig.json

```

&nbsp;

# 설명

- **`prisma/`**: Prisma 관련 파일들을 저장합니다.

  - `schema.prisma`: Prisma 스키마 파일입니다.
  - `migrations/`: Prisma 마이그레이션 파일들이 저장됩니다.

- **`public/`**: 정적 파일들을 저장합니다. 여기에는 이미지, 아이콘 등이 포함됩니다.

- **`src/`**: 소스 코드를 저장합니다.

  - **`components/`**: 재사용 가능한 React 컴포넌트를 저장합니다. 여기에는 레이아웃 관련 컴포넌트도 포함됩니다.
  - **`lib/`**: 프로젝트 전역에서 사용하는 라이브러리나 헬퍼 함수들을 저장합니다. 예를 들어, 인증 관련 로직과 Supabase 클라이언트 설정이 포함됩니다.
  - **`pages/`**: Next.js의 페이지들이 위치합니다. 폴더 구조는 URL 구조를 반영합니다.
    - `api/`: API 라우트를 저장합니다.
    - `admin/`: 관리자 페이지 관련 파일을 저장합니다.
    - `public/`: 일반 사용자 페이지 관련 파일을 저장합니다.
  - **`styles/`**: CSS 파일들을 저장합니다. 글로벌 스타일과 모듈화된 CSS 파일들을 포함합니다.
  - **`types/`**: TypeScript 타입 정의 파일들을 저장합니다.
  - **`utils/`**: 유틸리티 함수들을 저장합니다.

- **기타 설정 파일들**:
  - `.env`: 환경 변수 설정 파일입니다.
  - `.gitignore`: Git에서 제외할 파일들을 정의합니다.
  - `next.config.js`: Next.js 설정 파일입니다.
  - `package.json`: 프로젝트의 패키지 종속성과 스크립트가 정의된 파일입니다.
  - `postcss.config.js`: PostCSS 설정 파일입니다.
  - `tailwind.config.js`: Tailwind CSS 설정 파일입니다.
  - `tsconfig.json`: TypeScript 설정 파일입니다.

&nbsp;

## `lib`와 `utils` 디렉토리의 차이점

### `lib` 디렉토리

- **목적**: 라이브러리 또는 프로젝트 전역에서 사용되는 주요 모듈과 설정을 포함합니다.
- **사용 범위**: 프로젝트의 중요한 설정이나 초기화 코드, 클라이언트 및 서버 간에 공유되는 코드 등이 포함됩니다.
- **예시**: 인증 관련 설정, 데이터베이스 클라이언트 설정, API 클라이언트 설정 등.

현재 `lib/auth.ts` 파일은 JWT 토큰을 검증하는 기능을 가지고 있으며, 프로젝트 전반에 걸쳐 사용될 수 있습니다. 이 파일은 인증 관련 주요 기능을 포함하기 때문에 `lib` 디렉토리에 위치하는 것이 적절합니다.

### `utils` 디렉토리

- **목적**: 여러 곳에서 재사용될 수 있는 유틸리티 함수들을 포함합니다.
- **사용 범위**: 특정한 작업을 수행하는 작은 헬퍼 함수들이 포함됩니다. 일반적으로 프로젝트의 여러 부분에서 사용되지만, 필수적인 설정이나 초기화 코드는 아닙니다.
- **예시**: 날짜 포맷팅 함수, 문자열 변환 함수, 일반적인 헬퍼 함수 등.

`utils` 디렉토리는 프로젝트의 특정 부분에서 재사용될 수 있는 작은 헬퍼 함수들을 포함하기 적합합니다.  
예를 들어, 날짜를 포맷팅하는 함수나 특정 문자열을 변환하는 함수 등이 여기에 위치할 수 있습니다.

### 차이점 요약

- `lib`: 프로젝트 전역에서 중요한 역할을 하는 모듈과 설정. 예를 들어, 인증 관련 설정이나 데이터베이스 클라이언트 설정.
- `utils`: 특정 작업을 수행하는 작은 헬퍼 함수. 예를 들어, 날짜 포맷팅 함수나 문자열 변환 함수.

현재 `lib/auth.ts` 파일은 JWT 토큰 검증과 관련된 주요 기능을 가지고 있으므로 `lib` 디렉토리에 위치하는 것이 적절합니다.  
하지만, 만약 JWT 토큰 검증이 프로젝트에서 큰 비중을 차지하지 않고 단순한 헬퍼 함수라면 `utils` 디렉토리에 위치할 수도 있습니다.  
프로젝트의 구조와 요구 사항에 따라 `lib`와 `utils` 디렉토리를 어떻게 구성할지 결정하면 됩니다.
