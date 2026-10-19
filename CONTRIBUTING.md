# 贡献指南 / Contributing

感谢来玩额度鲸喵~ ❤️

## 开发

```bash
git clone https://github.com/Jianmo-R/quota-whale.git
cd quota-whale
npm test
npm run check
```

项目没有构建步骤，也没有运行时依赖。`client.js` 是手写的懒加载 CJS 浏览器 bundle，直接编辑即可。

本地调试建议：

1. 在 DSH 插件页安装本目录，或把本目录链接进 profile。
2. 修改 `client.js` 后刷新页面（DSH 的客户端模块系统通常会自动热加载）。
3. 运行 `npm test` 和 `npm run check`。

## 提交 PR

- 保持 `client.js` 为纯 JavaScript，不引入 JSX、TypeScript 或额外运行时依赖。
- 如果改了余额请求、拖动、缩放或台词逻辑，请同时更新 `scripts/smoke-test.mjs`。
- 如果新增台词，请保持中英文两套台词都完整。
- 不要提交 token、浏览器存储、个人路径或 `assets/reference.jpg`。

## 素材

- 代码：MIT。
- 角色贴图：不包含在 MIT 内，详见 [NOTICE](NOTICE)。提交新素材前请确认授权。
