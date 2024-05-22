<template>
  <t-space>
    <t-dropdown :options="options" @click="clickHandler">
      <t-button variant="text" shape="square">
        <component :is="currentIcon" />
      </t-button>
    </t-dropdown>
  </t-space>
</template>
<script setup lang="jsx">
import {
  ModeLightIcon,
  ModeDarkIcon,
  SystemSettingIcon,
} from "tdesign-icons-vue-next";
import { ref, shallowRef, onMounted, onUnmounted } from "vue";

const iconMap = {
  light: ModeLightIcon,
  dark: ModeDarkIcon,
  system: SystemSettingIcon,
};

const options = [
  { content: "日间", value: "light", prefixIcon: () => <ModeLightIcon/> },
  { content: "夜间", value: "dark", prefixIcon: () => <ModeDarkIcon/> },
  { content: "系统", value: "system", prefixIcon: () => <SystemSettingIcon/> },
];

const currentMode = ref(localStorage.getItem("theme-mode") || "system");
// 我都不知道还有shallowRef
const currentIcon = shallowRef(iconMap[currentMode.value]);
const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
// const appElement = document.getElementById('app');

function clickHandler(option) {
  localStorage.setItem("theme-mode", option.value);
  currentMode.value = option.value;
  currentIcon.value = iconMap[option.value];
  setThemeMode(option.value);
}

function setThemeMode(theme){
  const targetMode = (function () {
    if (theme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return theme;
  })();

  document.documentElement.setAttribute("theme-mode", targetMode);
  if (targetMode === "dark") {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
//   if (targetMode === "dark") {
//     appElement.style.backgroundColor = "#181818";
//   } else {
//     appElement.style.backgroundColor = "#eeeeee";
//   }
}

function MQListener(event){
    if(currentMode.value === 'system'){
      setThemeMode(event.matches ? 'dark' : 'light')
    }
}
onMounted(()=>{
  setThemeMode(currentMode.value)
  mediaQueryList.addEventListener('change', MQListener)
})

onUnmounted(()=>{
  mediaQueryList.removeEventListener('change', MQListener)
})
</script>
