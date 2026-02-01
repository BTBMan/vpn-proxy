import { Hono } from 'hono';

export const runtime = 'edge';

const app = new Hono();

app.get('/:path{.+}', async (c) => {
  const path = c.req.param('path');

  // 从环境变量获取配置
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

  if (!GITHUB_TOKEN || !GITHUB_OWNER || !GITHUB_REPO) {
    return c.json({ error: 'Missing environment variables' }, 500);
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
        'User-Agent': 'Vercel-Hono-Proxy',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return c.json(
        {
          error: `GitHub API responded with ${response.status}`,
          message: await response.text(),
        },
        response.status as any,
      );
    }

    // // 转发原始内容及其 Content-Type
    const content = await response.arrayBuffer();

    return c.body(content, 200, {
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
  } catch (error: any) {
    return c.json(
      { error: 'Proxy request failed', message: error.message },
      500,
    );
  }
});

app.get('/', (c) => c.text('VPN Config Proxy is running.'));

export default app;
