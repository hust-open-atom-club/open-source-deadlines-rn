# open-source-deadlines-openharmony
一个 [open-source-deadlines](https://github.com/hust-open-atom-club/open-source-deadlines) 的 React Native OpenHarmony 版本。

# 适配
- 移除所有 Next.js 相关内容，改为 vanilla 实现。
- Tailwind CSS 不可用，移除 class-variance-authority、clsx、tailwind-merge 等 CSS 类名管理工具，参考其样式使用 react-native styles 重写。
- Radix UI 不可用，使用 react-native 基础组件实现。
- API 请求直接通过网络访问：`https://oseddl.openatom.club/api/data`。
- 移除时区功能，不再依赖 luxon 库。
- 使用 react-native-vector-icons 替换现有图标库。
- 暂时注释掉 zustand 持久化时区和 favorites 相关内容。


# todo
- 完善持久化
- fuse.js在中文搜索时卡死


# ref
[OpenHarmony 官方三方库支持列表](https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/README.md)