# Godot 4 游戏开发从入门到进阶路线图

> 整理与提供：Amiya_desi（社团宣传网站联合发起人 · 个人站 https://sayori.org）

本手册面向社团宣传网站新成员与零基础游戏开发爱好者，提供一条经过实战验证的「跟练入门 → 进阶系统搭建 → 常用插件武装 → Game Jam 实战」完整学习路线。

---

## 一、核心视频教程（由 Amiya_desi 推荐提供）

### 1. 零基础入门（1 小时做出第一款游戏）
- **教程名称**：[Brackeys] How To Make A Video Game - Godot Beginner Tutorial（中英熟肉）
- **观看链接**：https://www.bilibili.com/video/BV12htQeQEMs/
- **适合人群**：完全没有接触过游戏引擎的新成员
- **核心收获**：
  - 认识 Godot 4 的节点（Node）与场景树（Scene Tree）核心思想
  - 掌握角色移动、TileMap 瓦片地图绘制、碰撞检测与动画播放
  - 用不到 1 小时的实操建立正反馈，完成人生第一个可运行的 2D 平台跳跃小作品

### 2. 进阶系统实战（横版卷轴动作游戏全流程）
- **教程名称**：十分钟制作横版动作游戏｜Godot 4 教程《勇者传说》系列（共 30 集）
- **观看链接**：https://www.bilibili.com/video/BV1SP411m7aj/
- **适合人群**：已完成入门跟练、希望独立搭建完整游戏架构的成员
- **核心收获**：
  - 有限状态机（Finite State Machine）管理角色待机、奔跑、跳跃、攻击与受击状态
  - 攻击框（Hitbox）与受击框（Hurtbox）解耦设计
  - 场景切换、存档序列化与反序列化、UI 血条与音效管理

---

## 二、常用 Godot 实战插件清单（源自 blog.sayori.org）

原文参考：https://blog.sayori.org/posts/godot-useful-plugins/

1. **DialogueManager**（`nathanhoad/godot_dialogue_manager`）
   - 功能强大的非线性对话系统，支持条件分支、变量调用与高度自定义对话框 UI。
2. **SceneManager**（`m-canton/godot-scene-manager`）
   - 便捷的场景过渡与异步加载管理插件。
3. **PhantomCamera**（`ramokz/phantom-camera`）
   - 受 Unity Cinemachine 启发的 Godot 4 相机插件，轻松实现平滑跟随、区域限制与镜头震动。
4. **SoundManager**（`nathanhoad/godot_sound_manager`）
   - 轻量级 BGM 与音效播放管理器，适合中小型独立游戏与 Game Jam 快速接入。
5. **Enhanced Save System**（`Amiyadesi/enhance_save_system`）
   - 由社员 Amiya_desi 开源维护的模块化存档插件，提供 GDScript 与 C# 双实现，支持 Hook 扩展与加密存档。
   - 仓库地址：https://github.com/Amiyadesi/enhance_save_system
6. **GodotSteam**
   - 计划将作品发布至 Steam 平台时必备的成就、云存档与好友系统接入插件。

---

## 三、从教程走向原创原型的四条建议

1. **先做灰盒，再填血肉**：用最简单的纯色方块把核心交互机制跑通，确认好玩后再替换美术与音效。
2. **场景预制体解耦**：机关、陷阱、敌人务必封装为独立场景（PackedScene）再实例化摆放，避免在主场景堆叠零散节点。
3. **养成 Git 版本控制习惯**：每次完成一个可运行的小功能就提交一次 Commit，遇到大改崩盘可随时安全回退。
4. **用 Game Jam 检验学习成果**：在 48 小时或一周的限时主题创作中学会果断砍掉冗余设想，优先交付一个“有头有尾、能顺利通关”的小作品。
