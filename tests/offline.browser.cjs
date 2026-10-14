async (page) => {
  const context = await page.context().browser().newContext();
  const p = await context.newPage();
  const origin = 'http://127.0.0.1:4173';
  const assert = (condition, message) => { if (!condition) throw new Error(message); };
  try {
    await p.goto(origin + '/index.html');
    await p.getByRole('heading', { level: 1 }).waitFor();
    await p.evaluate(() => navigator.serviceWorker.ready);
    await p.waitForFunction(() => navigator.serviceWorker.controller !== null);
    await context.setOffline(true);
    await p.getByRole('navigation', { name: '主导航' }).getByRole('link', { name: '资源库' }).click();
    await p.getByRole('textbox', { name: '搜索资源' }).waitFor({ timeout: 5000 });
    assert(await p.locator('.offline-indicator').isVisible(), '离线指示未显示');
    await p.locator('.resource-row-main').filter({ hasText: '游戏作品投稿资料' }).click();
    await p.getByRole('heading', { name: '游戏作品投稿资料', exact: true }).waitFor({ timeout: 5000 });
    const [download] = await Promise.all([p.waitForEvent('download'), p.getByRole('button', { name: '下载游戏作品投稿资料' }).click()]);
    assert(await download.failure() === null, '离线下载失败');
    await p.goto(origin + '/');
    await p.getByRole('heading', { level: 1 }).waitFor({ timeout: 5000 });
    const missing = await p.goto(origin + '/missing-offline.html');
    assert(missing.status() === 503 && (await p.locator('body').innerText()).includes('尚未缓存'), '未知页面被错误替换');
    return '通过：离线页面、未访问的详情参数、公开文件下载、根路径和未知页面反馈。';
  } finally { await context.close(); }
}
