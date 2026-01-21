# kbs-frontend

知识库系统前端项目，基于 Next.js 14 构建。

## 技术栈

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Axios

## 项目结构

```
kbs-frontend/
├── app/                 # Next.js 应用目录
│   ├── layout.tsx      # 全局布局
│   ├── page.tsx        # 首页
│   ├── search/         # 搜索页面
│   ├── upload/         # 上传页面
│   ├── document/       # 文档管理
│   └── api/            # API 路由
├── components/         # React 组件
│   ├── layout/         # 布局组件
│   ├── search/         # 搜索组件
│   ├── upload/         # 上传组件
│   └── common/         # 通用组件
├── services/           # API 服务层
├── hooks/              # 自定义 Hooks
├── lib/                # 工具函数
└── styles/             # 样式文件
```

## 开发指南

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
npm run build
npm run start
```

## 环境变量

创建 `.env.local` 文件并配置：

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
```
