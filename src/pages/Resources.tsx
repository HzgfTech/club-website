import { useState } from 'react'
import { ArrowUpRight, BookOpen, Compass, Copy, ExternalLink, FolderOpen, PlayCircle, Search, Sparkles, Star, Wrench, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { BackLink, EmptyState, FavoriteButton, DownloadButton, NoResults, PageHeading, ResourceIcon, ResourceRow } from '../components/shared'
import { fileSize } from '../lib/catalog'
import { copyText, useStudio } from '../lib/store'
import { useFilters } from '../lib/filters'

const godotTutorials = [
  {
    id: 'godot-beginner-brackeys',
    stage: 'STAGE 01 · 零基础入门教程',
    provider: '由 Amiya_desi 提供',
    title: '[Brackeys] How To Make A Video Game - Godot Beginner Tutorial（中英熟肉）',
    duration: '约 77 分钟 · 1 集全流程实操',
    cover: '/images/tutorial-godot-beginner.jpg',
    url: 'https://www.bilibili.com/video/BV12htQeQEMs/',
    summary: '最适合零基础社员上手的第一支跟练教程！只需跟着视频操作 1 小时，即可从零认识 Godot 4 的节点与场景树思想，亲手做出包含角色移动、瓦片地图（TileMap）、金币收集、平台机关、怪物碰撞与动画音效的完整 2D 平台跳跃小游戏。',
    highlights: ['节点与场景树基础', 'TileMap 瓦片绘制', 'GDScript 核心语法', '角色碰撞与精灵动画'],
  },
  {
    id: 'godot-advanced-brave-legend',
    stage: 'STAGE 02 · 进阶系统架构教程',
    provider: '由 Amiya_desi 提供',
    title: '十分钟制作横版动作游戏｜Godot 4 教程《勇者传说》系列（共 30 集）',
    duration: '30 集完整连载 · 进阶蜕变必看',
    cover: '/images/tutorial-godot-advanced.jpg',
    url: 'https://www.bilibili.com/video/BV1SP411m7aj/',
    summary: '完成入门后实现“新手蜕变”的硬核实战教程！系统讲解如何搭建可扩展的 2D 横版卷轴动作游戏底层架构，涵盖有限状态机（FSM）、攻击框与受击框解耦、复杂地形交互、数据序列化与反序列化存档、平滑相机与 Boss 战状态设计。',
    highlights: ['有限状态机 (FSM)', 'Hitbox / Hurtbox 解耦', '序列化与加密存档', '横版动作手感调优'],
  },
]

const blogArticles = [
  {
    title: '很有用的 Godot 插件清单：对话、场景、相机、音频与存档',
    category: '引擎与插件',
    date: '2026-07-03',
    url: 'https://blog.sayori.org/posts/godot-useful-plugins/',
    summary: '实战盘点 Godot 4 最常用的战备插件：非线性对话系统 DialogueManager、场景切换 SceneManager、酷炫文字特效 RichText2、对标 Cinemachine 的 PhantomCamera、轻量音频 SoundManager、Steam 接入插件 GodotSteam 以及自研开源模块化存档系统 EnhancedSaveSystem。',
    tags: ['Godot 4 插件', 'DialogueManager', 'PhantomCamera', 'EnhancedSaveSystem'],
  },
  {
    title: 'Steam 国区开发者注册避坑指南：从税务表 10% 税率到收款方案',
    category: '发行与上架',
    date: '2026-09-10',
    url: 'https://blog.sayori.org/posts/steam-dev-work-01/',
    summary: '结合真实注册经历详解 Steamworks 个人开发者入驻全流程：100 美元 Steam Direct 准备、姓名拼音与地址规范、W-8BEN 税务表勾选非美国居民与中美税收协定将预扣税率从 30% 降至 10%，以及银行柜台盖章回单通过地址审核的实战技巧。',
    tags: ['Steamworks', '独立游戏发行', 'W-8BEN 税务表', '开发者避坑'],
  },
  {
    title: '我的创作资源索引：200+ 条游戏开发、素材、美术与音频书签精编',
    category: '资源总览',
    date: '2026-05-26',
    url: 'https://blog.sayori.org/posts/resource-index/',
    summary: '从浏览器收藏栏 285 条原始书签中去重筛选出的公开创作资源索引，详细列出每个游戏音乐站、2D/3D 素材库、Shader 教程站的用途、检索方式与许可证（License）署名注意事项。',
    tags: ['素材授权核查', 'CC0 资源', 'BGM 与音效', '工具书签'],
  },
]

const navWebsites = [
  { name: 'Godot 官方文档', category: '引擎与着色器', url: 'https://docs.godotengine.org/', desc: 'Godot 4 最权威的官方 API、节点手册与入门指南。' },
  { name: 'Godot Asset Store', category: '引擎与着色器', url: 'https://store.godotengine.org/', desc: 'Godot 官方新一代插件、模板与 2D/3D 资源商店。' },
  { name: 'Godot Shaders', category: '引擎与着色器', url: 'https://godotshaders.com/', desc: '专门收录 Godot 2D/3D 着色器效果（水体、描边、CRT、故障风）。' },
  { name: 'Godot Recipes (KidsCanCode)', category: '引擎与着色器', url: 'https://kidscancode.org/godot_recipes/4.x/', desc: '针对 Godot 4 常见玩法机制与系统的模块化代码配方合集。' },
  { name: 'Awesome Godot', category: '引擎与着色器', url: 'https://github.com/godotengine/awesome-godot', desc: '官方维护的高质量开源 Godot 插件、工具与示例项目总表。' },
  { name: 'The Book of Shaders', category: '引擎与着色器', url: 'https://thebookofshaders.com/', desc: '循序渐进的交互式片元着色器（Fragment Shader）入门经典读物。' },

  { name: 'Kenney Assets', category: '2D/3D 游戏素材', url: 'https://www.kenney.nl/assets/', desc: '数万件高质量 CC0 协议 2D 精灵、3D 低模、UI 与音效包，可直接用于比赛与作品。' },
  { name: 'OpenGameArt', category: '2D/3D 游戏素材', url: 'https://opengameart.org/', desc: '老牌开源游戏素材社区，支持按 CC0 / CC-BY 协议筛选精灵图与配乐。' },
  { name: 'itch.io Free Game Assets', category: '2D/3D 游戏素材', url: 'https://itch.io/game-assets/free', desc: '全球独立创作者分享的免费像素角色、Tilemap 图块集与 GUI 素材库。' },
  { name: 'Quaternius CC0 3D', category: '2D/3D 游戏素材', url: 'https://quaternius.com/', desc: '自带骨骼与基础动画的 CC0 低多边形 3D 角色、怪物与场景资产包。' },
  { name: 'KayKit 3D Assets', category: '2D/3D 游戏素材', url: 'https://kaylousberg.itch.io/', desc: '风格高度统一的 CC0 3D 地下城、中世纪与卡通场景资产包。' },
  { name: 'Game-icons.net', category: '2D/3D 游戏素材', url: 'https://game-icons.net/', desc: '4000+ 枚可自定义前景/背景配色的游戏技能、道具与状态 SVG/PNG 图标。' },

  { name: 'Pixelorama', category: '像素画与动画', url: 'https://orama-interactive.itch.io/pixelorama', desc: '基于 Godot 引擎开发的开源像素画与序列帧动画编辑器。' },
  { name: 'LibreSprite', category: '像素画与动画', url: 'https://libresprite.github.io/', desc: '经典像素绘制软件 Aseprite 的免费开源分支，支持图层与帧动画导出。' },
  { name: 'Piskel', category: '像素画与动画', url: 'https://www.piskelapp.com/', desc: '无需安装，在浏览器中即可快速绘制像素精灵与导出 Sprite Sheet。' },
  { name: 'Lospec 调色盘与像素教程', category: '像素画与动画', url: 'https://lospec.com/palette-list', desc: '精选像素艺术调色盘库与新手像素画入门路线。' },
  { name: 'Laigter 2D 法线贴图', category: '像素画与动画', url: 'https://azagaya.itch.io/laigter', desc: '为 2D 像素图自动生成法线贴图（Normal Map），轻松实现 2D 动态点光源受光效果。' },
  { name: 'Excalidraw 手绘白板', category: '像素画与动画', url: 'https://excalidraw.com/', desc: '极简手绘风在线白板，非常适合团队绘制关卡灰盒、状态流转图与 UI 原型。' },

  { name: 'PeriTune 免费 BGM', category: '游戏音乐与音效', url: 'https://peritune.com/', desc: '曲风涵盖奇幻、凯尔特、日常、悬疑与战斗的高品质免费游戏 BGM 库。' },
  { name: 'Freesound 音效库', category: '游戏音乐与音效', url: 'https://freesound.org/', desc: '海量脚步声、环境氛围、机关触发与 UI 音效素材，支持按 CC0 过滤。' },
  { name: 'jsfxr 复古音效生成器', category: '游戏音乐与音效', url: 'https://sfxr.me/', desc: '浏览器一键随机或微调生成跳跃、拾取、激光、爆炸等 8-bit WAV 音效。' },
  { name: 'ChipTone 音效合成', category: '游戏音乐与音效', url: 'https://sfbgames.itch.io/chiptone', desc: '可视化包络线与波形调节的复古游戏音效生成工具。' },
  { name: 'DOVA-SYNDROME', category: '游戏音乐与音效', url: 'https://dova-s.jp/', desc: '日本知名免费商用 BGM 与音效平台，独立游戏与视觉小说常用音源。' },
  { name: 'BeepBox 在线编曲', category: '游戏音乐与音效', url: 'https://www.beepbox.co/', desc: '在浏览器网格中轻松编写 Chiptune 循环旋律并导出音频，适合快速自制 BGM。' },

  { name: 'Learn GDScript From Zero', category: '学习与路线图', url: 'https://gdquest.github.io/learn-gdscript/', desc: 'GDQuest 出品的交互式浏览器应用，带零基础同学一步步写出 GDScript 代码。' },
  { name: 'Game Developer Roadmap', category: '学习与路线图', url: 'https://roadmap.sh/game-developer', desc: '全景展示游戏客户端、图形学、物理数学与引擎架构的知识技能树。' },
  { name: 'LearnOpenGL', category: '学习与路线图', url: 'https://learnopengl.com/Introduction', desc: '图形学与现代渲染管线入门必读教程。' },
  { name: 'IndieGameHub 独游资料', category: '学习与路线图', url: 'https://game.indiehubs.org/', desc: '独立游戏设计、开发、美术与发行经验资料聚合站。' },
]

export function ResourcesPage() {
  const { catalog, favorites } = useStudio()
  const { params, update, clear } = useFilters()
  const [navCategory, setNavCategory] = useState('全部')
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? '全部'
  const onlyFavorites = params.get('saved') === '1'
  const data = catalog!
  const categories = ['全部', ...new Set(data.resources.map(resource => resource.category))]
  const resources = data.resources.filter(resource =>
    (!onlyFavorites || favorites.includes(resource.id)) &&
    (category === '全部' || resource.category === category) &&
    `${resource.title} ${resource.description} ${resource.category} ${resource.format} ${resource.provider ?? ''}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())
  )
  const navCategories = ['全部', '引擎与着色器', '2D/3D 游戏素材', '像素画与动画', '游戏音乐与音效', '学习与路线图']
  const visibleWebsites = navWebsites.filter(site => navCategory === '全部' || site.category === navCategory)

  return <div className="resources-page">
    <PageHeading
      title="把做游戏真正用得上的教程、笔记与素材放在手边。"
      description="幻造工坊 · 游戏开发视频教程、实战技术文章、外部工具导航与社团文档库"
    >
      <span className="subtle-count">由 Amiya_desi 整理提供 · 持续更新</span>
    </PageHeading>

    <section className="curator-banner" aria-label="资源库共建说明">
      <div className="curator-banner-info">
        <span className="section-kicker">共创知识库 · 由 Amiya_desi 提供</span>
        <h2>从第一支 Godot 入门视频，到 200+ 独立游戏开发工具箱。</h2>
        <p>
          本资源库的核心教程、实战复盘文章与外部素材站点由幻造工坊联合发起人 <strong>Amiya_desi</strong> 结合多场 Game Jam 实战经验整理提供，同步收录自个人技术博客与资源导航站。
        </p>
      </div>
      <div className="curator-banner-links">
        <a href="https://blog.sayori.org/" target="_blank" rel="noopener noreferrer" className="curator-link-card">
          <BookOpen size={18} />
          <div>
            <strong>Amiya的书桌 · 技术博客</strong>
            <span>blog.sayori.org · 游戏开发与工程笔记</span>
          </div>
          <ArrowUpRight size={16} />
        </a>
        <a href="https://nav.sayori.org/" target="_blank" rel="noopener noreferrer" className="curator-link-card">
          <Compass size={18} />
          <div>
            <strong>Amiya的资源导航站</strong>
            <span>nav.sayori.org · 200+ 创作工具与素材索引</span>
          </div>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </section>

    <section className="editorial-section tutorials-section" aria-label="Godot 视频教程">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">精选视频教程 · 由 Amiya_desi 提供</span>
          <h2>Godot 4 从零基础入门到横版动作进阶实战。</h2>
        </div>
        <a href="/resource.html?id=godot-tutorial-roadmap" className="plain-link">查看离线学习路线图手册<ArrowUpRight size={16} /></a>
      </div>
      <div className="tutorials-grid">
        {godotTutorials.map(tutorial => (
          <a key={tutorial.id} href={tutorial.url} target="_blank" rel="noopener noreferrer" className="tutorial-card">
            <div className="tutorial-media">
              <img src={tutorial.cover} alt={tutorial.title} loading="lazy" />
              <div className="tutorial-overlay-badges">
                <span className="badge-engine">{tutorial.stage}</span>
                <span className="badge-status"><Sparkles size={12} />{tutorial.provider}</span>
              </div>
              <span className="tutorial-play-pill"><PlayCircle size={18} />前往 Bilibili 观看</span>
            </div>
            <div className="tutorial-body">
              <span className="tutorial-duration">{tutorial.duration}</span>
              <h3>{tutorial.title}</h3>
              <p>{tutorial.summary}</p>
              <div className="specialty-tags">
                {tutorial.highlights.map(tag => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>

    <section className="editorial-section articles-section" aria-label="游戏开发文章与笔记">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">开发笔记与避坑专栏 · 源自 blog.sayori.org（由 Amiya_desi 提供）</span>
          <h2>插件选型、Steam 开发者注册与创作资源索引。</h2>
        </div>
        <a href="https://blog.sayori.org/" target="_blank" rel="noopener noreferrer" className="plain-link">访问完整博客<ArrowUpRight size={16} /></a>
      </div>
      <div className="articles-grid">
        {blogArticles.map(article => (
          <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" className="article-card">
            <div className="article-card-top">
              <span className="showcase-category">{article.category}</span>
              <span className="article-date">{article.date} · 由 Amiya_desi 提供</span>
            </div>
            <div className="article-card-title">
              <h3>{article.title}</h3>
              <ArrowUpRight size={17} />
            </div>
            <p>{article.summary}</p>
            <div className="showcase-tags">
              {article.tags.map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </a>
        ))}
      </div>
    </section>

    <section className="editorial-section nav-directory-section" aria-label="游戏开发常用网站导航">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">游戏开发工具与素材导航 · 提取自 nav.sayori.org（由 Amiya_desi 提供）</span>
          <h2>做游戏缺素材、缺音效、缺工具？从这里直接出发。</h2>
        </div>
        <a href="https://nav.sayori.org/" target="_blank" rel="noopener noreferrer" className="plain-link">打开完整导航站<ArrowUpRight size={16} /></a>
      </div>

      <div className="filter-tabs nav-filter-tabs" role="group" aria-label="外部导航分类">
        {navCategories.map(item => (
          <button
            key={item}
            type="button"
            aria-pressed={navCategory === item}
            className={navCategory === item ? 'active' : ''}
            onClick={() => setNavCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="nav-websites-grid">
        {visibleWebsites.map(site => (
          <a key={site.url} href={site.url} target="_blank" rel="noopener noreferrer" className="nav-site-card">
            <div className="nav-site-head">
              <Wrench size={15} />
              <strong>{site.name}</strong>
              <span className="nav-site-cat">{site.category}</span>
              <ExternalLink size={14} className="nav-site-arrow" />
            </div>
            <p>{site.desc}</p>
          </a>
        ))}
      </div>
    </section>

    <section className="editorial-section downloadable-section" aria-label="社团离线文档与模板">
      <div className="editorial-heading">
        <div>
          <span className="section-kicker">社团离线手册、章程摘要与投稿模板</span>
          <h2>支持离线缓存查阅与一键下载。</h2>
        </div>
        <span className="subtle-count">{data.resources.length} 份本地资料</span>
      </div>

      <section className="resource-browser" aria-label="资源列表">
        <div className="resource-tools">
          <div className="search-field">
            <Search size={18} />
            <Input aria-label="搜索资源" placeholder="搜索手册、模板、格式…" value={query} onChange={e => update('q', e.target.value)} />
            {query && <button aria-label="清除搜索" onClick={() => update('q', '')}><X size={15} /></button>}
          </div>
          <Button variant={onlyFavorites ? 'secondary' : 'outline'} aria-label="只看收藏" aria-pressed={onlyFavorites} onClick={() => update('saved', onlyFavorites ? '' : '1')}>
            <Star size={16} fill={onlyFavorites ? 'currentColor' : 'none'} />我的收藏
          </Button>
        </div>
        <div className="filter-tabs" aria-label="资源分类">
          {categories.map(item => (
            <button key={item} onClick={() => update('category', item === '全部' ? '' : item)} aria-pressed={category === item} className={category === item ? 'active' : ''}>
              {item}
            </button>
          ))}
        </div>
        <div className="list-column-head"><span>资源名称</span><span>格式 / 大小</span></div>
        <div className="resource-list">
          {resources.length
            ? resources.map(resource => <ResourceRow key={resource.id} resource={resource} query={params.toString()} />)
            : data.resources.length
              ? <NoResults onClear={clear} />
              : <EmptyState compact icon={<FolderOpen />} title="资源正在整理" />}
        </div>
        <div className="resource-list-footer"><span>共展示 {resources.length} 份可下载资料</span></div>
      </section>
    </section>
  </div>
}

export function ResourceDetailPage() {
  const { catalog, setContact } = useStudio()
  const params = new URLSearchParams(location.search)
  const selected = catalog!.resources.find(resource => resource.id === params.get('id'))
  params.delete('id')
  const back = '/resources.html' + (params.size ? `?${params}` : '')
  if (!selected) return <EmptyState icon={<FolderOpen />} title="资源不存在" description="这份资源可能已移除。"><Button asChild variant="outline"><a href="/resources.html">返回资源库</a></Button></EmptyState>
  return <div className="resource-detail-page">
    <BackLink to={back}>返回资源库</BackLink>
    <div className="resource-detail-layout">
      <section className="resource-detail-main">
        <div className="detail-icon-row">
          <ResourceIcon resource={selected} />
          <FavoriteButton resource={selected} />
        </div>
        <div className="work-detail-badges">
          <span className="detail-category">{selected.category}</span>
          {selected.provider && <span className="badge-status-pill"><Sparkles size={12} />{selected.provider}</span>}
        </div>
        <h1>{selected.title}</h1>
        <p className="detail-description">{selected.description}</p>
        {selected.format === 'SVG' && <div className="svg-preview"><img src={`/downloads/${selected.file}`} alt="幻造工坊视觉标识提案" /></div>}
        <div className="resource-description">
          <h2>内容简介与使用说明</h2>
          <p>{selected.content}</p>
        </div>
      </section>
      <aside className="resource-download-panel">
        <dl className="detail-metadata">
          <div><dt>文件格式</dt><dd>{selected.format}</dd></div>
          <div><dt>文件大小</dt><dd>{fileSize(selected.bytes)}</dd></div>
          <div><dt>更新日期</dt><dd>{selected.updated}</dd></div>
          {selected.provider && <div><dt>资料来源</dt><dd>{selected.provider}</dd></div>}
        </dl>
        <div className="detail-actions">
          <DownloadButton resource={selected} />
          <Button variant="outline" size="icon" aria-label="复制资源链接" title="复制资源链接" onClick={() => copyText(location.href, '资源链接已复制')}><Copy /></Button>
        </div>
        {selected.externalUrl && (
          <a href={selected.externalUrl} target="_blank" rel="noopener noreferrer" className="detail-submit">
            访问在线原文 / 导航站<ExternalLink size={15} />
          </a>
        )}
        {selected.category === '投稿模板' && (
          <button className="detail-submit" onClick={() => setContact(selected.id === 'member-profile' ? 'member' : 'work')}>
            在线填写资料<ArrowUpRight size={15} />
          </button>
        )}
      </aside>
    </div>
  </div>
}
