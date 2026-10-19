# 额度鲸 / Quota Whale

一个 DeepSeek Harness Web UI 的悬浮额度挂件：蓝发女仆鲸鱼娘贴在页面角落，思考气泡里显示 DeepSeek 账户剩余额度。

![额度鲸贴纸](assets/quota-whale.png)

## 功能

- 显示 DeepSeek 账户的充值余额与赠金余额。
- 鼠标拖动改变位置，位置保存在 `localStorage`，刷新后保持。
- 鼠标悬停时滚轮缩放，范围 `0.6x ~ 2.0x`，大小同样会记住。
- 点击时播放 Q 弹果冻动画，并在气泡里随机冒出一句鲸鱼娘台词。
- “欧鲸鲸”加权出现，约占中文台词的 50%。
- 未登录时显示“未登录”，接口不可用时显示“暂不可用”。
- 中英文界面文案跟随 DSH 语言设置。

## 台词

中文台词池：

`欧鲸鲸`、`想吃饭`、`我去吃饭了`、`吃什么呢？`、`不许叫大肥鱼！`、`鱼片，贴贴`、`好困，想睡`、`白米饭最香了`、`摸鱼一下下`、`才不胖呢`、`今天也要好好干活`、`给我一碗白饭`。

其中“欧鲸鲸”的权重为 11，其他每句为 1，因此约一半概率会出现“欧鲸鲸”。

## 安装

在 DeepSeek Harness 的桌面 profile 中，把本目录作为 bundle 安装：

```text
Settings → Plugins → Add → 选择本目录
```

或者让 DSH 的 `plugin_manager` 使用 `install_bundle` 指向本目录。

手工安装：

1. 把本目录放到任意位置。
2. 在 profile 的 `package.json` 依赖中加入：

   ```json
   "@local/quota-whale": "link:C:/path/to/quota-whale"
   ```

3. 在 `dsh.profile.bundles` 末尾加入 `"@local/quota-whale"`。
4. 在 profile 目录执行 `pnpm install`。
5. 重启 DSH，或刷新 Web 页面。

## 实现说明

- `client.js`：手写的懒加载 CJS 客户端 bundle，使用 `window.__ModuleLoader__.load`，无需构建步骤。
- `index.js`：空的 Host 半边，仅用于让 bundle 在 Loader 中有入口。
- 额度通过官方 `account` Remote 的 `getState()` / `getBalance()` 获取，不读取、不保存 token。
- 形象贴图以 data URI 内嵌在 `client.js`，因此运行时不依赖 `assets/` 目录。
- 台词和定位会随插件热更新重置，位置与缩放保存在浏览器 `localStorage` 中。

## 素材说明

角色形象来自使用者提供的参考图，属于社区二创风格的鲸鱼娘形象，并非 DeepSeek 官方吉祥物。台词灵感来自社区“蓝色大肥鱼 / 鲸鱼娘”梗，包括“爱吃白米饭”“我去吃饭了”“大肥鱼”等。

如果要在公开仓库中再分发角色图片，请先确认素材权利；`assets/reference.jpg` 默认不纳入版本控制。
