import { useState } from 'react'
import { ArrowUpRight, Copy, ExternalLink, FolderOpen, Search, Star, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { BackLink, EmptyState, FavoriteButton, DownloadButton, NoResults, PageHeading, ResourceIcon, ResourceRow } from '../components/shared'
import { fileSize } from '../lib/catalog'
import { copyText, useStudio } from '../lib/store'
import { useFilters } from '../lib/filters'

const godotTutorials = [
  {
    id: 'godot-beginner-brackeys',
    stage: '入门教程 · 由 Amiya_desi 提供',
    title: '[Brackeys] How To Make A Video Game - Godot Beginner Tutorial（中英熟肉）',
    duration: '77 分钟 · 1 集全流程跟练',
    cover: '/images/tutorial-godot-beginner.jpg',
    url: 'https://www.bilibili.com/video/BV12htQeQEMs/',
    summary: '1 小时从零完成第一款 2D 平台跳跃游戏，涵盖节点与场景树、TileMap 瓦片地图、角色控制、碰撞与 GDScript 基础。',
    highlights: ['节点与场景树', 'TileMap 瓦片', 'GDScript 入门', '碰撞与动画'],
  },
  {
    id: 'godot-advanced-brave-legend',
    stage: '进阶教程 · 由 Amiya_desi 提供',
    title: '十分钟制作横版动作游戏｜Godot 4 教程《勇者传说》系列（30 集）',
    duration: '30 集完整连载 · 横版动作架构',
    cover: '/images/tutorial-godot-advanced.jpg',
    url: 'https://www.bilibili.com/video/BV1SP411m7aj/',
    summary: '系统搭建 2D 横版卷轴动作游戏底层架构，涵盖有限状态机（FSM）、Hitbox/Hurtbox 解耦、地形交互、存档序列化与 Boss 战设计。',
    highlights: ['有限状态机 FSM', '攻击受击解耦', '序列化存档', '相机与音效'],
  },
]

const blogArticles = [
  {
    title: '很有用的 Godot 插件清单',
    category: '引擎与插件',
    url: 'https://blog.sayori.org/posts/godot-useful-plugins/',
    summary: '整理 DialogueManager、SceneManager、RichText2、PhantomCamera、SoundManager、GodotSteam 与自研 EnhancedSaveSystem。',
  },
  {
    title: 'Steam 国区开发者注册避坑指南',
    category: '发行与上架',
    url: 'https://blog.sayori.org/posts/steam-dev-work-01/',
    summary: '详解 Steam Direct 注册、拼音实名、W-8BEN 税务表（预扣税率 30% 降至 10%）与银行回单地址验证流程。',
  },
  {
    title: '我的创作资源索引（200+ 书签整理）',
    category: '资源索引',
    url: 'https://blog.sayori.org/posts/resource-index/',
    summary: '汇总游戏配乐、音效、Godot Shader、2D/3D 素材站及使用协议核查方法。',
  },
]

const navWebsites = [
  { name: 'Godot 官方文档', category: '引擎与着色器', url: 'https://docs.godotengine.org/', desc: 'Godot 4 官方 API、节点手册与入门教程。' },
  { name: 'Godot Asset Store', category: '引擎与着色器', url: 'https://store.godotengine.org/', desc: 'Godot 官方插件、模板与资源商店。' },
  { name: 'Godot Shaders', category: '引擎与着色器', url: 'https://godotshaders.com/', desc: 'Godot 2D/3D 着色器代码库（水体、描边、CRT、故障特效）。' },
  { name: 'Godot Recipes', category: '引擎与着色器', url: 'https://kidscancode.org/godot_recipes/4.x/', desc: 'Godot 4 常见玩法机制与系统实现合集。' },
  { name: 'Awesome Godot', category: '引擎与着色器', url: 'https://github.com/godotengine/awesome-godot', desc: '开源 Godot 插件、工具与示例项目清单。' },
  { name: 'The Book of Shaders', category: '引擎与着色器', url: 'https://thebookofshaders.com/', desc: '交互式片元着色器入门读物。' },

  { name: 'Kenney Assets', category: '2D/3D 游戏素材', url: 'https://www.kenney.nl/assets/', desc: 'CC0 协议免费 2D 精灵、3D 低模、UI 与音效包。' },
  { name: 'OpenGameArt', category: '2D/3D 游戏素材', url: 'https://opengameart.org/', desc: '开源游戏素材社区，支持按 CC0 / CC-BY 筛选。' },
  { name: 'itch.io Free Game Assets', category: '2D/3D 游戏素材', url: 'https://itch.io/game-assets/free', desc: '独立创作者分享的免费像素角色、瓦片地图与 UI。' },
  { name: 'Quaternius CC0 3D', category: '2D/3D 游戏素材', url: 'https://quaternius.com/', desc: '带骨骼动画的 CC0 低多边形 3D 角色与场景包。' },
  { name: 'KayKit 3D Assets', category: '2D/3D 游戏素材', url: 'https://kaylousberg.itch.io/', desc: '风格统一的 CC0 3D 角色与地牢场景资产。' },
  { name: 'Game-icons.net', category: '2D/3D 游戏素材', url: 'https://game-icons.net/', desc: '可自定义配色的游戏技能与物品 SVG/PNG 图标。' },

  { name: 'Pixelorama', category: '像素画与动画', url: 'https://orama-interactive.itch.io/pixelorama', desc: '基于 Godot 开发的开源像素画与序列帧动画编辑器。' },
  { name: 'LibreSprite', category: '像素画与动画', url: 'https://libresprite.github.io/', desc: 'Aseprite 的开源分支，支持像素绘制与帧动画导出。' },
  { name: 'Piskel', category: '像素画与动画', url: 'https://www.piskelapp.com/', desc: '浏览器在线绘制像素精灵与导出 Sprite Sheet。' },
  { name: 'Lospec 调色盘', category: '像素画与动画', url: 'https://lospec.com/palette-list', desc: '像素艺术调色盘库与像素画入门指南。' },
  { name: 'Laigter 法线贴图', category: '像素画与动画', url: 'https://azagaya.itch.io/laigter', desc: '为 2D 精灵图生成法线贴图，实现 2D 动态受光效果。' },
  { name: 'Excalidraw', category: '像素画与动画', url: 'https://excalidraw.com/', desc: '手绘风在线白板，适合画关卡灰盒与状态机草图。' },

  { name: 'PeriTune', category: '游戏音乐与音效', url: 'https://peritune.com/', desc: '免费 BGM 素材，涵盖奇幻、日常、战斗与悬疑曲风。' },
  { name: 'Freesound', category: '游戏音乐与音效', url: 'https://freesound.org/', desc: '环境音、动作音与 UI 音效库。' },
  { name: 'jsfxr', category: '游戏音乐与音效', url: 'https://sfxr.me/', desc: '在线一键生成跳跃、拾取、爆炸等 8-bit WAV 音效。' },
  { name: 'ChipTone', category: '游戏音乐与音效', url: 'https://sfbgames.itch.io/chiptone', desc: '可视化调节波形的复古游戏音效生成器。' },
  { name: 'DOVA-SYNDROME', category: '游戏音乐与音效', url: 'https://dova-s.jp/', desc: '日系免费 BGM 与音效库，独立游戏与视觉小说常用。' },
  { name: 'BeepBox', category: '游戏音乐与音效', url: 'https://www.beepbox.co/', desc: '浏览器在线编写 8-bit 循环旋律与配乐。' },

  { name: 'Learn GDScript From Zero', category: '学习与路线图', url: 'https://gdquest.github.io/learn-gdscript/', desc: 'GDQuest 交互式浏览器教程，从零练习 GDScript。' },
  { name: 'Game Developer Roadmap', category: '学习与路线图', url: 'https://roadmap.sh/game-developer', desc: '游戏开发客户端、图形学与引擎知识路线图。' },
  { name: 'LearnOpenGL', category: '学习与路线图', url: 'https://learnopengl.com/Introduction', desc: '图形学与现代渲染管线入门教程。' },
  { name: 'IndieGameHub', category: '学习与路线图', url: 'https://game.indiehubs.org/', desc: '独立游戏设计、开发与发行资料库。' },
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

  return <div className="inner-page">
    <PageHeading title="资源库" description="Godot 视频教程、实用开发指南、工具素材导航与社团文档（由 Amiya_desi 提供）。" />

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>Godot 视频教程</h2>
        <span className="meta-note">由 Amiya_desi 提供</span>
      </div>
      <div className="selected-works-grid">
        {godotTutorials.map(tutorial => (
          <article key={tutorial.id} className="work-tile">
            <a href={tutorial.url} target="_blank" rel="noopener noreferrer" className="work-tile__media">
              <img src={tutorial.cover} alt={tutorial.title} loading="lazy" />
            </a>
            <div className="work-tile__copy">
              <p className="work-tile__meta">{tutorial.stage} · {tutorial.duration}</p>
              <h3>
                <a href={tutorial.url} target="_blank" rel="noopener noreferrer">{tutorial.title}</a>
              </h3>
              <p className="work-tile__desc">{tutorial.summary}</p>
              <div className="studio-tags">
                {tutorial.highlights.map(tag => <span key={tag}>{tag}</span>)}
              </div>
              <div className="work-tile__foot">
                <a href={tutorial.url} target="_blank" rel="noopener noreferrer" className="studio-text-link">
                  前往 Bilibili 观看<ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>开发指南与插件清单</h2>
        <span className="meta-note">源自 blog.sayori.org · 由 Amiya_desi 提供</span>
      </div>
      <div className="article-grid article-grid--three">
        {blogArticles.map(article => (
          <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" className="article-box">
            <p className="work-tile__meta">{article.category}</p>
            <h3>{article.title}<ArrowUpRight size={16} /></h3>
            <p>{article.summary}</p>
          </a>
        ))}
      </div>
    </section>

    <section className="studio-section">
      <div className="studio-section__head">
        <h2>工具与素材导航</h2>
        <span className="meta-note">源自 nav.sayori.org · 由 Amiya_desi 提供</span>
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
              <strong>{site.name}</strong>
              <span className="nav-site-cat">{site.category}</span>
              <ExternalLink size={14} />
            </div>
            <p>{site.desc}</p>
          </a>
        ))}
      </div>
    </section>

    <section className="studio-section studio-section--last" aria-label="社团文档与模板">
      <div className="studio-section__head">
        <h2>社团文档下载</h2>
      </div>

      <section className="resource-browser" aria-label="资源列表">
        <div className="resource-tools">
          <div className="search-field">
            <Search size={17} />
            <Input aria-label="搜索资源" placeholder="搜索文档或模板…" value={query} onChange={e => update('q', e.target.value)} />
            {query && <button type="button" aria-label="清除搜索" onClick={() => update('q', '')}><X size={15} /></button>}
          </div>
          <Button variant={onlyFavorites ? 'secondary' : 'outline'} aria-label="只看收藏" aria-pressed={onlyFavorites} onClick={() => update('saved', onlyFavorites ? '' : '1')}>
            <Star size={16} fill={onlyFavorites ? 'currentColor' : 'none'} />收藏
          </Button>
        </div>
        <div className="filter-tabs" aria-label="资源分类">
          {categories.map(item => (
            <button key={item} type="button" onClick={() => update('category', item === '全部' ? '' : item)} aria-pressed={category === item} className={category === item ? 'active' : ''}>
              {item}
            </button>
          ))}
        </div>
        <div className="resource-list">
          {resources.length
            ? resources.map(resource => <ResourceRow key={resource.id} resource={resource} query={params.toString()} />)
            : data.resources.length
              ? <NoResults onClear={clear} />
              : <EmptyState compact icon={<FolderOpen />} title="暂无资源" />}
        </div>
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
  if (!selected) return <EmptyState icon={<FolderOpen />} title="资源不存在"><Button asChild variant="outline"><a href="/resources.html">返回资源库</a></Button></EmptyState>
  return <div className="inner-page">
    <BackLink to={back}>返回资源库</BackLink>
    <div className="resource-detail-layout">
      <section className="resource-detail-main">
        <div className="detail-icon-row">
          <ResourceIcon resource={selected} />
          <FavoriteButton resource={selected} />
        </div>
        <p className="work-tile__meta">
          {selected.category}{selected.provider ? ` · ${selected.provider}` : ''}
        </p>
        <h1>{selected.title}</h1>
        <p className="detail-description">{selected.description}</p>
        {selected.format === 'SVG' && <div className="svg-preview"><img src={`/downloads/${selected.file}`} alt={selected.title} /></div>}
        <div className="resource-description">
          <p>{selected.content}</p>
        </div>
      </section>
      <aside className="resource-download-panel">
        <dl className="detail-metadata">
          <div><dt>格式</dt><dd>{selected.format}</dd></div>
          <div><dt>大小</dt><dd>{fileSize(selected.bytes)}</dd></div>
          <div><dt>更新</dt><dd>{selected.updated}</dd></div>
        </dl>
        <div className="detail-actions">
          <DownloadButton resource={selected} />
          <Button variant="outline" size="icon" aria-label="复制资源链接" title="复制资源链接" onClick={() => copyText(location.href, '链接已复制')}><Copy /></Button>
        </div>
        {selected.externalUrl && (
          <a href={selected.externalUrl} target="_blank" rel="noopener noreferrer" className="detail-submit">
            打开原文链接<ExternalLink size={15} />
          </a>
        )}
        {selected.category === '投稿模板' && (
          <button type="button" className="detail-submit" onClick={() => setContact(selected.id === 'member-profile' ? 'member' : 'work')}>
            在线填写提交<ArrowUpRight size={15} />
          </button>
        )}
      </aside>
    </div>
  </div>
}
