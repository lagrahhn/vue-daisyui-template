<script setup>
import {onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';

const currentTheme = ref('light');
const isSidebarCollapsed = ref(false); // 新增侧边栏折叠状态
const username = ref(''); // 用于存储用户名称的响应式变量
// 存储展开的子菜单
const expandedMenus = ref([]);

// 切换子菜单展开/折叠状态
const toggleSubmenu = (menuName) => {
  if (expandedMenus.value.includes(menuName)) {
    expandedMenus.value = expandedMenus.value.filter(name => name !== menuName);
  } else {
    expandedMenus.value.push(menuName);
  }
};

// 检查菜单是否展开
const isMenuExpanded = (menuName) => {
  return expandedMenus.value.includes(menuName);
};

// 侧边栏菜单项数据
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
  {
    name: '文章管理', 
    icon: '📝', 
    children: [
      {name: '发布文章', icon: '✍️', link: '/articles/create'},
      {name: '文章列表', icon: '📚', link: '/articles/list'},
      {name: '草稿箱', icon: '📄', link: '/articles/drafts'}
    ]
  },
  {name: '归档', icon: '💊', link: '/list'},
  {name: '关于我', icon: '👤', link: '/aboutme'},
];


const setTheme = (event) => {
  const theme = event.target.getAttribute('data-theme');
  if (theme) {
    currentTheme.value = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
};

const themes = [
  {value: "light", name: "Light", icon: "☀️"},
  {value: "dark", name: "Dark", icon: "🌙"},
  {value: "cupcake", name: "Cupcake", icon: "🧁"},
  {value: "bumblebee", name: "Bumblebee", icon: "🐝"},
  {value: "emerald", name: "Emerald", icon: "✳️"},
  {value: "corporate", name: "Corporate", icon: "🏢"},
  {value: "synthwave", name: "Synthwave", icon: "🌆"},
  {value: "retro", name: "Retro", icon: "📺"},
  {value: "cyberpunk", name: "Cyberpunk", icon: "🤖"},
  {value: "valentine", name: "Valentine", icon: "❤️"},
  {value: "halloween", name: "Halloween", icon: "🎃"},
  {value: "garden", name: "Garden", icon: "🌷"},
  {value: "forest", name: "Forest", icon: "🌲"},
  {value: "aqua", name: "Aqua", icon: "💧"},
  {value: "lofi", name: "Lofi", icon: "🎧"},
  {value: "pastel", name: "Pastel", icon: "🎨"},
  {value: "fantasy", name: "Fantasy", icon: "🦄"},
  {value: "wireframe", name: "Wireframe", icon: "📐"},
  {value: "black", name: "Black", icon: "◼️"},
  {value: "luxury", name: "Luxury", icon: "💎"},
  {value: "dracula", name: "Dracula", icon: "🧛"},
  {value: "cmyk", name: "CMYK", icon: "🖨️"},
  {value: "autumn", name: "Autumn", icon: "🍂"},
  {value: "business", name: "Business", icon: "💼"},
  {value: "acid", name: "Acid", icon: "⚠️"},
  {value: "lemonade", name: "Lemonade", icon: "🍋"},
  {value: "night", name: "Night", icon: "🌌"},
  {value: "coffee", name: "Coffee", icon: "☕"},
  {value: "winter", name: "Winter", icon: "❄️"},
  {value: "dim", name: "Dim", icon: "🔅"},
  {value: "nord", name: "Nord", icon: "⛄"},
  {value: "sunset", name: "Sunset", icon: "🌅"}
]

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

// 初始化主题
onMounted(() => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  currentTheme.value = savedTheme;
  document.documentElement.setAttribute('data-theme', savedTheme);
  // 获取用户名称
  username.value = localStorage.getItem('username') || 'Guest';
  
  // 默认展开文章管理菜单
  expandedMenus.value = ['文章管理'];
});

const router = useRouter();

const logout = () => {
  // 清除用户信息
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  // 跳转到登录页面
  router.push('/login');
};
</script>

<template>
  <div :data-theme="currentTheme" class="min-h-screen">
    <!-- 导航栏 -->
    <div class="navbar bg-base-100 shadow-lg px-4 fixed top-0 z-50 h-16">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl gap-0">
          <img src=".././assets/logo.svg" alt="药典图谱" class="w-8 h-8 mr-2">
          全球上市药物知识图谱
        </a>
      </div>
      <div class="flex-none">
        <!-- 桌面导航菜单 -->
        <ul class="menu menu-horizontal px-1">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/about">关于我们</router-link>
          </li>
          <li>
            <router-link to="/contact">联系我们</router-link>
          </li>
          <!-- 测试404的隐藏入口 -->
          <li>
            <router-link to="/invalid-path" class="text-error">404测试</router-link>
          </li>
        </ul>

        <!-- 用户信息 -->
        <div class="dropdown dropdown-end ml-2">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <!-- 使用UIAvatars生成随机头像 -->
              <img :src="`https://ui-avatars.com/api/?name=${username}&background=random`" alt="User Avatar"
                   class="w-10 rounded-full">
            </div>
          </label>
          <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
            <!--            <li>-->
            <!--              <a class="justify-between">-->
            <!--                个人信息-->
            <!--                <span class="badge">{{ username }}</span>-->
            <!--              </a>-->
            <!--            </li>-->
            <li><a @click="logout">退出登录</a></li>
          </ul>
        </div>

        <!-- 主题切换 -->
        <div class="dropdown dropdown-end ml-2">
          <label tabindex="0" class="btn m-1">
            主题
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </label>
          <div
              class="dropdown-content scrollbar top-px mt-16 h-[70vh] max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl rounded-t-box rounded-b-box">
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52" @click="setTheme">
              <li v-for="theme in themes" :key="theme.value">
                <a :data-theme="theme.value">{{ theme.name }} {{ theme.icon }}</a>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </div>

    <!-- 侧边栏 -->
    <div
        class="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-base-100 shadow-lg transition-all duration-300 z-40"
        :class="isSidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <div class="flex flex-col h-full">
        <!-- 折叠按钮 -->
        <button
            @click="isSidebarCollapsed = !isSidebarCollapsed"
            class="btn btn-ghost btn-sm rounded-btn self-end mr-1 mt-1"
        >
          <span v-if="!isSidebarCollapsed">◀</span>
          <span v-else>▶</span>
        </button>

        <!-- 菜单项 -->
        <ul class="menu flex-1 p-2">
          <li v-for="item in menuItems" :key="item.name">
            <!-- 有子菜单的项目 -->
            <template v-if="item.children">
              <div 
                class="menu-title flex items-center cursor-pointer p-2 hover:bg-base-200 rounded-lg tooltip"
                :class="isSidebarCollapsed ? 'tooltip-right justify-center' : ''"
                :data-tip="isSidebarCollapsed ? item.name : ''"
                @click="toggleSubmenu(item.name)"
              >
                <span class="text-xl">{{ item.icon }}</span>
                <span v-show="!isSidebarCollapsed" class="ml-2">{{ item.name }}</span>
                <span v-show="!isSidebarCollapsed" class="ml-auto transition-transform duration-300" :class="{'rotate-180': isMenuExpanded(item.name)}">▼</span>
              </div>
              <ul 
                v-show="!isSidebarCollapsed && isMenuExpanded(item.name)" 
                class="ml-4 mt-1 submenu-animation"
              >
                <li v-for="child in item.children" :key="child.name">
                  <router-link
                    :to="child.link"
                    class="flex items-center py-2 px-2 hover:bg-base-200 rounded-lg"
                  >
                    <span class="text-lg">{{ child.icon }}</span>
                    <span class="ml-2">{{ child.name }}</span>
                  </router-link>
                </li>
              </ul>
            </template>
            
            <!-- 无子菜单的项目 -->
            <router-link
                v-else
                :to="item.link"
                class="tooltip p-2 flex items-center hover:bg-base-200 rounded-lg"
                :class="isSidebarCollapsed ? 'tooltip-right' : ''"
                :data-tip="item.name"
            >
              <span class="text-xl">{{ item.icon }}</span>
              <span v-show="!isSidebarCollapsed" class="ml-2">{{ item.name }}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 页面内容 -->
    <main class="pt-20 px-4 pb-16 transition-all duration-300 bg-base-200" :class="isSidebarCollapsed ? 'ml-16' : 'ml-64'">
      <div class="max-w-2xl mx-auto">
        <!-- 这里可以添加页面主要内容 -->
        <div v-for="i in 50" :key="i" class="mb-4 p-4 bg-base-100 rounded-lg shadow">页面内容区块 {{ i }}</div>
      </div>
    </main>

    <!-- 返回顶部按钮 -->
    <button
        class="btn btn-circle btn-primary fixed bottom-16 right-4"
        @click="scrollToTop">
      ↑
    </button>

    <!-- 版权信息 -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content transition-all duration-300"
            :class="isSidebarCollapsed ? 'ml-16' : 'ml-64'" style="width: auto">
      <div>
        <p>版权所有 © 2023，保留所有权利</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 20px;
  height: 20px;
}

.scrollbar::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #f7f4ed;
}

.scrollbar::-webkit-scrollbar-thumb {
  background: #e0cbcb;
  border-radius: 100vh;
  border: 3px solid #f6f7ed;
}

.scrollbar::-webkit-scrollbar-thumb:hover {
  background: #c0a0b9;
}

/*.h-[calc(100vh-4rem)] {
  height: calc(100vh - 4rem);
}*/

.menu a {
  @apply justify-start;
}

.tooltip::before {
  @apply transition-opacity delay-200;
}

.submenu-animation {
  animation: slideDown 0.3s ease-in-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
