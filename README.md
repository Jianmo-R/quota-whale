# 额度鲸 / Quota Whale

[![License: MIT](https://img.shields.io/badge/code-MIT-blue.svg)](LICENSE)

一个给 **DeepSeek Harness (DSH)** Web UI 用的悬浮额度挂件：蓝发女仆鲸鱼娘贴在页面角落，思考气泡里显示 DeepSeek 账户剩余额度。

A floating DeepSeek Harness widget: a whale-girl mascot with a thought bubble that shows your remaining account balance.

![额度鲸贴纸](assets/quota-whale.png)

## 功能 / Features

- 显示 DeepSeek 账户的充值余额与赠金余额。
- 鼠标拖动改变位置，位置写入浏览器 `localStorage`。
- 鼠标悬停时滚轮缩放（`0.6x ~ 2.0x`），大小同样会记住。
- 点击播放 Q 弹果冻动画，气泡里随机冒出一句鲸鱼娘台词。
- “欧鲸鲸”加权出现，约占中文台词的 50%。
- 未登录显示“未登录”，接口不可用时显示“暂不可用”。
- 中英文文案跟随 DSH 语言设置。
- 无构建步骤、无第三方运行时依赖。

## 环境要求 / Requirements

- 一个带 `account` Remote 的 DeepSeek Harness Web UI。
- 已登录 DeepSeek 账号（用于读取余额）。
- 仅需浏览器即可运行；开发时需要 Node.js 20+ 用来跑检查脚本。

> 已在 DSH `0.2.1-rc.2` 上验证。客户端会优先读取 `window.__DSH_BOOT__.release.version` 作为账户请求的客户端版本；取不到时使用插件自身的 `1.0.0`。

## 安装 / Install

### 方式一：插件页安装（推荐）

1. 克隆仓库：

   ```bash
   git clone https://github.com/Jianmo-R/quota-whale.git
   ```

2. 打开 DSH Web UI → **Settings → Plugins → Add**（或等价的本地插件安装入口）。
3. 选择 `quota-whale` 目录，启用后刷新页面。

### 方式二：`plugin_manager`

让 DSH 的 `plugin_manager` 使用 `install_bundle`，`target` 指向本目录的绝对路径。

### 方式三：手工加入 profile

1. 把本目录放到任意位置。
2. 在 profile 的 `package.json` 依赖中加入：

   ```json
   "@local/quota-whale": "link:C:/path/to/quota-whale"
   ```

3. 在 `dsh.profile.bundles` 末尾加入 `"@local/quota-whale"`。
4. 在 profile 目录执行 `pnpm install`。
5. 重启 DSH，或刷新 Web 页面。

> `@local/quota-whale` 只是本地命名空间，不需要发布到 npm。若要发布，请同时修改 `package.json` 的 `name`、`cordis.patch.yml` 的 `name` 和 `client.js` 顶部的模块 `id`。

## 使用 / Usage

- 拖动：按住角色或气泡拖动。
- 刷新：单击气泡或角色。
- 缩放：鼠标悬停在挂件上，滚轮上下滚动。
- 关闭 / 卸载：在 DSH 插件页禁用或移除本插件。

位置和缩放保存在：

- `localStorage['dsh.quota-whale.position.v1']`
- `localStorage['dsh.quota-whale.scale.v1']`

清除这两项即可恢复默认位置和大小。

## 自定义 / Customize

`client.js` 是手写的懒加载 CJS 浏览器 bundle，不需要编译。

- 台词池：搜索 `const PHRASES`。
- “欧鲸鲸”权重：搜索 `const PHRASE_WEIGHT`（默认 11，其他台词权重为 1）。
- 缩放范围：搜索 `const MIN_SCALE` / `const MAX_SCALE`。
- 自动刷新间隔：搜索 `REFRESH_INTERVAL_MS`。
- 挂件基准尺寸：搜索 `const WIDGET_SIZE`。
- 角色贴图：`client.js` 中的 `MASCOT_URI` 是内嵌的 data URI；替换 `assets/quota-whale.png` 后，用新的 base64 替换它即可。

## 实现说明 / How it works

- `index.js` 是空的 Host 半边，仅用于让 bundle 在 Loader 中有一个入口。
- `client.js` 注册到 `shell.overlay`，用 `ctx.remote.account.getState()` / `getBalance()` 读取账户状态和余额。
- Remote 返回值是 `{ ok, value }` 包装；代码会检查 `ok` 再取 `value`。
- 账户请求只经过 DSH Host 的官方 `account` Remote，不读取、不保存 token。
- 贴图以 data URI 内嵌，运行时不依赖 `assets/` 目录；`assets/quota-whale.png` 仅用于 README 预览。

## 隐私 / Privacy

- 不采集分析数据，不发起第三方网络请求。
- 不访问 GitHub、DeepSeek token 或浏览器凭据。
- 只使用 DSH 的账户 Remote 和浏览器 `localStorage` 保存位置/缩放。

## 开发 / Development

```bash
npm test        # 无依赖冒烟测试
npm run check   # node --check
```

项目结构：

```text
quota-whale/
├── client.js            # 浏览器半边：挂件、拖动、缩放、台词、余额
├── index.js             # 空 Host 半边
├── cordis.patch.yml     # Loader 插入行
├── package.json
├── locale/              # 插件管理页标题与描述
├── icon.png             # 插件图标
├── assets/              # README 预览图
└── scripts/             # 冒烟测试
```

## License

- **代码**：MIT，见 [LICENSE](LICENSE)。
- **角色贴图**：`assets/quota-whale.png` 以及 `client.js` 中内嵌的同一张图是社区二创风格的鲸鱼娘素材，**不包含在 MIT 许可内**。如果 fork 后公开发布，请替换为自己的原创素材，或确认你拥有再分发权利。详见 [NOTICE](NOTICE)。

角色形象并非 DeepSeek 官方吉祥物；台词灵感来自社区“蓝色大肥鱼 / 鲸鱼娘”梗。
