# Vue DaisyUI 模板

一个基于 Vue 3 和 DaisyUI 的现代化前端模板，具有响应式设计和丰富的主题切换功能。

![首页](/images/首页.png)

## 功能特性

- 🎨 **多主题支持**：内置 30+ 种精美主题，支持一键切换
- 📱 **响应式设计**：完美适配各种设备尺寸
- 🧩 **可折叠侧边栏**：智能空间利用，提升用户体验
- 📚 **多级菜单**：支持二级菜单，轻松组织复杂应用结构
- 🔒 **用户认证**：内置登录、注册和用户管理功能
- 🚀 **基于 Vue 3**：采用最新的 Vue 3 Composition API

## 技术栈

- **Vue 3**：渐进式 JavaScript 框架
- **Vue Router**：官方路由管理器
- **Tailwind CSS**：实用优先的 CSS 框架
- **DaisyUI**：基于 Tailwind CSS 的组件库
- **Axios**：基于 Promise 的 HTTP 客户端
- **Vite**：现代前端构建工具

## 安装说明

确保您已安装 Node.js (推荐 v14 或更高版本)

```bash
# 克隆项目
git clone <仓库地址>

# 进入项目目录
cd vue-daisyui-template

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 项目结构

```
vue-daisyui-template/
├── public/             # 静态资源
│   ├── assets/         # 项目资源文件
│   ├── router/         # 路由配置
│   ├── views/          # 页面组件
│   ├── App.vue         # 根组件
│   ├── main.js         # 入口文件
│   └── index.css       # 全局样式
├── index.html          # HTML 模板
├── package.json        # 项目依赖
├── vite.config.js      # Vite 配置
└── tailwind.config.cjs # Tailwind 配置
```

## 主要功能

### 主题切换

项目集成了 DaisyUI 提供的多种精美主题，用户可以通过顶部导航栏中的主题下拉菜单进行切换。主题偏好会自动保存在本地存储中。

### 响应式侧边栏

侧边栏可根据用户需求进行折叠/展开，提供更灵活的界面布局：
- 展开状态：显示完整菜单项文本
- 折叠状态：仅显示图标，悬停时显示提示信息

### 多级菜单

侧边栏支持二级菜单结构，可用于组织复杂的应用功能：
- 点击父菜单可展开/折叠子菜单
- 子菜单带有平滑过渡动画效果
- 默认展开指定的菜单项

### 用户认证

内置完整的用户认证流程：
- 登录/注册页面
- 记住登录状态
- 安全退出功能

## 自定义配置

### 添加新主题

可在 `tailwind.config.cjs` 文件中的 `daisyui.themes` 数组中添加或移除主题。

### 修改菜单项

编辑 `src/views/Home.vue` 文件中的 `menuItems` 数组可以自定义侧边栏菜单。

```javascript
const menuItems = [
  {name: '首页', icon: '🏠', link: '/'},
  {
    name: '分类管理', 
    icon: '📁', 
    children: [
      {name: '添加分类', icon: '➕', link: '/categories/add'},
      {name: '分类列表', icon: '📋', link: '/categories/list'}
    ]
  },
  // 更多菜单项...
];
```

## 页面预览

### 首页
![首页](/images/首页.png)

### 404页面
![404页面](/images/404.png)

## 许可证

[MIT](LICENSE)
