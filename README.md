# Mould

简体中文 | [English](./README.en-US.md)

Mould 是一个试验性项目，它通过在 GUI 和 Code 间建立接口，帮设计师和工程师在各自的侧达成自治。
预想中，Mould 可以解决以下在现有条件下较难解决的问题：

-   设计师和工程师相互制约
-   GUI 程序难以测试
-   本地化难题
-   Design system

## 使用

使用 Mould 的 GUI 工程中，预设了三个不可或缺的角色（但不一定需要三个人）：

-   架构（对业务逻辑和 GUI 组织负责：构建接口、分解工程复杂度）
-   视觉（对最终呈现的效果负责：进行组件化设计）
-   程序（对业务逻辑的实现负责：根据接口生成的函数签名，写具体实现）

具体工作流程是，首先架构根据业务需求，梳理出需要哪些界面，将界面分解为小颗粒的组件（Mould），定义组件的功能和接口：

-   input： 组件接受的输入参数，通过动态表单生成字段和 Controller
-   scope：组件的内部数据
-   kits：与内部数据绑定的组件，与 scope 绑定
-   states：不同状态下显示不同的界面

架构定义完毕之后，视觉和程序可以同步进行各自的工作。

视觉需要对架构给出的每一个组件进行设计。需要理解架构对业务的定义，正确地结合 kits 进行设计。

> 对 kits 可以这样理解：我们小时候玩过的注塑拼装玩具（高达模型），厂商规定好玩具的设计蓝图，组成模型的每一个构件都会给出来，我们只需要根据说明书组装这些构件即可。这里的 Mould 即为蓝图，kits 则是要完成拼装所需的构件。

程序需要完成每一个组件定义的函数。带类型的函数签名可以根据架构给到的接口信息自动生成，辅助程序开发。函数的模型为：`input -> [state, scope]`

视觉和程序是完全自治的。即，程序不需要等待视觉的设计，可同步进行工作。而设计也不依赖程序对界面的实现，且可随时对不满意的部分进行修改。

一句话总结 Mould 工程的角色分工：架构定义骨架 -> 视觉填充血肉 -> 程序注入魔法。

## Roadmap

-   [x] MVP
-   [ ] 自举
-   [ ] 产品化
-   [ ] 跨平台

## 相关链接

[知乎提问](https://www.zhihu.com/question/382742971)
