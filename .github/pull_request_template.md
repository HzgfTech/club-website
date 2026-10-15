## 提交类型（请勾选一项或多项）

- [ ] **优秀社员自荐 / 个人简历展示**（更新 `content/public-content/catalog.json` 中的 `members`）
- [ ] **优秀作品提交**（更新 `content/public-content/catalog.json` 中的 `works`，每人最多展示 2 款代表作）
- [ ] **资源库 / 网站改进**

---

## 一、优秀社员自荐表（如提交社员档案请填写）

| 字段 | 填写内容 |
| :--- | :--- |
| **姓名 / 公开昵称** | |
| **主要方向（策划 / 程序 / 美术 / 音乐）** | |
| **头衔 / 一句话角色定位** | |
| **代表作品（最多 2 款）** | |
| **个人主页 / B站 / GitHub / itch.io** | `https://` |
| **联系方式（QQ / 邮箱 / 电话）** | |
| **个人简介与核心亮点** | |

<details>
<summary>点击查看 <code>catalog.json</code> 社员条目示例</summary>

```json
{
  "id": "your-id",
  "name": "你的昵称",
  "role": "独立游戏开发 · 像素美术 · 音乐编曲",
  "badge": "优秀社员",
  "tracks": ["程序", "美术"],
  "bio": "第一段介绍你的专业或开发方向。\n\n第二段介绍你的代表作品、比赛经历或创作实践。",
  "specialties": ["Godot 4", "像素动画", "关卡设计"],
  "highlights": [
    "完成某款原创游戏原型或 Game Jam 作品",
    "负责核心系统或美术音乐制作"
  ],
  "avatar": "/images/avatar-your-id.png",
  "url": "https://example.com",
  "links": [
    { "label": "个人主页", "url": "https://example.com" }
  ]
}
```
</details>

---

## 二、游戏作品提交表（如提交作品请填写，每人最多 2 款）

| 字段 | 填写内容 |
| :--- | :--- |
| **作品名称** | |
| **创作者 / 团队** | |
| **所属方向（策划 / 程序 / 美术 / 音乐）** | |
| **作品分类（如 叙事解谜 / 机制解谜 / 沙盒冒险）** | |
| **开发引擎 / 技术栈** | |
| **当前状态（如 在线可玩 / 开发日志 / 参赛作）** | |
| **游玩或演示链接（HTTPS）** | `https://` |
| **一句话核心简介** | |

<details>
<summary>点击查看 <code>catalog.json</code> 作品条目示例</summary>

```json
{
  "id": "your-game-id",
  "title": "作品名称",
  "summary": "一句话介绍核心玩法、机制亮点与当前状态。",
  "category": "机制解谜",
  "author": "你的昵称",
  "url": "https://example.com/game",
  "cover": "/images/work-your-game.png",
  "engine": "Godot 4",
  "status": "公开试玩",
  "featured": false,
  "tracks": ["策划", "程序"],
  "tags": ["Godot 4", "平台解谜", "浏览器即玩"],
  "detail": "详细介绍作品背景、核心机制与团队分工。"
}
```
</details>

---

## 提交前确认

- [ ] 我确认拥有所提交作品、头像与简介的公开展示权利
- [ ] 外链均使用有效的 `https://` 链接
- [ ] 欢迎同步加入幻造工坊交流 QQ 群：`1130062117`
