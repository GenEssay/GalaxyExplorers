# 目录架构

理想的目录架构参考如下，但目前还没有完整支持，仍在重构。

```bash
src
├── app        # 应用主要逻辑和状态管理相关的代码
├── components # 可复用的 UI 组件
├── config     # 应用的配置文件，包含客户端环境变量与服务端环境变量
├── constant   # 用于定义常量，如 action 类型、路由名等
├── features   # 与业务功能相关的功能模块，如 Agent 设置、插件开发弹窗等
├── hooks      # 全应用复用自定义的工具 Hooks
├── layout     # 应用的布局组件，如导航栏、侧边栏等
├── locales    # 国际化的语言文件
├── services   # 封装的后端服务接口，如 HTTP 请求
├── store      # 用于状态管理的 zustand store
├── types      # TypeScript 的类型定义文件
└── utils      # 通用的工具函数
```
