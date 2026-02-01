# VPN Proxy (Hono on Vercel)

这是一个轻量级的 VPN 配置文件代理工具，部署在 Vercel Edge Runtime 上，用于代理私有 GitHub 仓库中的配置文件。

## 部署说明

1.  将本项目推送至 GitHub。
2.  在 Vercel 中导入项目。
3.  在 Vercel 项目设置中添加以下环境变量：
    *   `GITHUB_TOKEN`: 你的 GitHub Personal Access Token (需要 repo 权限)。
    *   `GITHUB_OWNER`: 你的 GitHub 用户名。
    *   `GITHUB_REPO`: 私有仓库名称。
    *   `GITHUB_BRANCH`: (可选) 默认分支，默认为 `main`。

## 使用方法

访问地址格式如下：
`https://your-project.vercel.app/api/your-config-file.yaml`

如果你想直接访问根路径映射：
`https://your-project.vercel.app/your-config-file.yaml` (已在 `vercel.json` 中配置重写)

## 本地开发

```bash
npm install
# 在 .env 中设置环境变量
npm run dev
```
