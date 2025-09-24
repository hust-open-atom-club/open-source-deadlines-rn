# Open Source Deadlines OpenHarmony
一个 [open-source-deadlines](https://github.com/hust-open-atom-club/open-source-deadlines) 的 React Native OpenHarmony 版本。

# 使用
运行以下命令来生成react-native bundle。
```bash
npm install
npm run harmony
```

# 适配
- 移除所有 Next.js 相关内容，改为 vanilla 实现。
- Tailwind CSS 不可用，移除 class-variance-authority、clsx、tailwind-merge 等 CSS 类名管理工具，参考其样式使用 react-native styles 重写。
- Radix UI 不可用，使用 react-native 基础组件实现。
- API 请求直接通过网络访问：`https://oseddl.openatom.club/api/data`。
- 移除时区功能，不再依赖 luxon 库。
- 使用 react-native-vector-icons 替换现有图标库。
- 暂时注释掉 zustand 持久化时区和 favorites 相关内容。


# todo

- [x] 完善持久化，引入 @react-native-async-storage/async-storage。

- [x] ~~fuse.js在中文搜索时卡死~~ 实机没有问题


# ref
[OpenHarmony 官方三方库支持列表](https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/README.md)
[React Native OpenHarmony 官方文档](https://gitcode.com/openharmony-sig/ohos_react_native/blob/master/docs/zh-cn/%E5%BA%94%E7%94%A8%E5%BC%80%E5%8F%91%E5%AE%9E%E8%B7%B5/RN%E5%BA%94%E7%94%A8%E9%B8%BF%E8%92%99%E5%8C%96%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.md)
