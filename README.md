将next.js相关内容全部去掉换为vanilla；
tailwind css不能用，需要按照tailwind的重新写一下vanilla样式；
globals.css重新放在app.tsx里面；
radix ui不能用，我们需要简单实现下vanilla的组件，但是整体应该不复杂；
api请求直接从网络请求，地址是https://oseddl.openatom.club/api/data
去掉时区功能，不再依赖luxon库；
lucide-react在harmony下不可用，我们需要改用静态svg；
class-variance-authority是用来管理css类名的，clsx和tailwind-merge等与css相关，也去掉换为写死的vanilla rn css；
zustand持久化时区和favorites的相关内容暂时全部注释掉


使用react-native-vector-icons替换现有的图标库；

# todo
- 完善持久化

# ref
三方库支持列表：https://gitee.com/react-native-oh-library/usage-docs/blob/master/zh-cn/README.md