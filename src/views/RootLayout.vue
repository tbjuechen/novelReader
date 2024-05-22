<template>
  <t-layout id="root-layout">
    <t-header id="layout-header">
      <t-head-menu id="header-menu">
        <template #logo>
          <h1 id="site-title">绝尘阅读</h1>
        </template>
        <t-menu-item value="home" :router="router" :to="{ path: '/' }"
          >书架
        </t-menu-item>
        <t-menu-item
          value="down"
          :onClick="
            () => {
              console.log('也可以使用这种绑定');
              router.push('/down');
            }
          "
        >
          下载
        </t-menu-item>
        <template #operations>
          <t-button variant="text" shape="square">
            <template #icon>
              <SearchIcon shape="square" />
            </template>
          </t-button>
          <ThemeSwitch />
          <t-button variant="text" shape="square">
            <template #icon>
              <UserIcon shape="square" />
            </template>
          </t-button>
          <t-button variant="text" shape="square">
            <template #icon>
              <EllipsisIcon shape="square" />
            </template>
          </t-button>
        </template>
      </t-head-menu>
    </t-header>
    <t-content id="layout-content">
      <RouterView :key="router.currentRoute.value.fullPath" />
    </t-content>
    <t-footer>
      <div id="footer-copyright">绝尘阅读 © 2021</div>
    </t-footer>
  </t-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import ThemeSwitch from "@/components/ThemeSwitch.vue";
import {
  SearchIcon,
  UserIcon,
  EllipsisIcon,
} from "tdesign-icons-vue-next";

const router = useRouter();
</script>

<style scoped lang="css">
#site-title {
  white-space: nowrap;
  background-image: linear-gradient(
    to right,
    orangered,
    orange,
    gold,
    lightgreen,
    cyan,
    dodgerblue,
    mediumpurple,
    hotpink,
    orangered
  );
  background-size: 110vw;
  animation: rainbow-sliding 60s linear infinite;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

@keyframes rainbow-sliding {
  to {
    background-position: -2000vw;
  }
}

#footer-copyright {
  text-align: center;
}

@media only screen and (max-width: 600px){
  #root-layout {
    width: 100vw;
    position: relative;
    padding:0;
  }
  #site-title{
    font-size: 16px;
  
  }
}
 
@media only screen and (min-width: 600px){
  #root-layout {
    width: max(900px,60vw);
    position: relative;
    padding:10px;
  }
}


#layout-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 1;
}


#layout-header::after {
  pointer-events: none;
  content: "";
  user-select: none;

  position: absolute;
  z-index: -1;
  inset: -1px 0 -50%;
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  -webkit-mask-image: linear-gradient(to bottom, black 64px, transparent);
  mask-image: linear-gradient(to bottom, black 64px, transparent);
}

#layout-content {
  margin-top: -64px;
  padding-top: 80px;
}

#header-menu {
  background: transparent;
}
#root-layout {
  margin: 0 auto;
  min-height: 100vh;
}

#layout-content {
  display: flex;
}
</style>