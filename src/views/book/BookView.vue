<template>
  <div id="read-page" class="container">
    <h1 id="chapter-title">{{contentInfo.chapter_title}}</h1>
    <div id="chapter-info">
      <a @click="gotoCatalog" style="cursor: pointer;">{{ contentInfo.book_title }} </a>
      <a>{{contentInfo.book_author}}</a>
      <span>{{contentInfo.words_count}}字</span>
    </div>
    <div id="divider-horizontal"></div>
    <div style="margin-top: 24px;">
      <p v-for="text,key in contentInfo.chapter_content"
      :key="key"
      class="chapter-paragraph text">
      {{ text }}
      </p>
    </div>
    <div id="button-group">
      <t-button theme="default" variant="outline" @click="gotoPreChapter">上一章</t-button>
      <t-button theme="default" variant="outline" @click="gotoCatalog">返回目录</t-button> 
      <t-button theme="default" variant="outline" @click="gotoNextChapter">下一章</t-button>
    </div>
  </div>
  <t-space :style="{ position: 'relative', overflow: 'hidden' }"
  id="nail-box">
      <t-sticky-tool>
        <t-sticky-item label="chat">
          <template #icon><chat-icon /></template>
        </t-sticky-item>
        <t-sticky-item label="add">
          <template #icon><add-icon /></template>
        </t-sticky-item>
        <t-sticky-item
          label="aqcode"
          :icon="renderQrIcon"
          :popup="renderPopup"
          :popup-props="{
            overlayInnerStyle: { padding: '4px', height: '128px' },
          }"
        >
        </t-sticky-item>
      </t-sticky-tool>
    </t-space>
</template>

<script setup lang="jsx">
import {ChatIcon, AddIcon, QrcodeIcon } from "tdesign-icons-vue-next";
import { onMounted, onUpdated, ref } from "vue";
import { useRouter } from "vue-router";
import axiosInstance from "@/services/axiosinstance";

const renderQrIcon = () => {
  return <QrcodeIcon />;
};

const renderPopup = () => {
  return <img alt="TDesign Logo" width="120" height="120" src="https://tdesign.gtimg.com/site/site.jpg" />;
};

const contentInfo = ref({});
const router = useRouter();
const route = useRouter().currentRoute;

let book_id = route.value.params.bookId;
let chapter_id = route.value.params.chapterId;

onMounted(async () => {
  // 获取章节
  try{
    contentInfo.value = (await axiosInstance.get(`/api/book/${book_id}/chapter/${chapter_id}`)).data;
  }catch(e){
    console.log(e);
  }
  
});



function gotoCatalog() {
  router.push({
    name: 'catalog',
    params: {
      bookId: book_id
    }
  });
}

function gotoPreChapter() {
  if (chapter_id >= 1) {
    router.push({
      name: 'book',
      params: {
        bookId: book_id,
        chapterId: String(parseInt(chapter_id) - 1)
      }
    });
  } else {
    gotoCatalog()
  }
}

function gotoNextChapter() {
  if (parseInt(chapter_id) >= contentInfo.value.total_chapters -1 ) {
      gotoCatalog();
  } else{
    router.push({
      name: 'book',
      params: {
        bookId: book_id,
        chapterId: String(parseInt(chapter_id) + 1)
      }
    });
  }
}

onUpdated(() => {
  window.scrollTo(0, 0);
})

</script>

<style scoped>
#read-page {
  margin-top: 16px;

  /* width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0px 0px 10px 3px #D0D0D0; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;

}

#read-page>* {
  width: 90%;
}
#chapter-title {
  font-size: 24px;
  line-height: 32px;
  margin-top: 32px;
}
#chapter-info {
  margin-top: 4px;
  display: flex;
  column-gap: 16px;
}
#chapter-contentInfo {
  margin-top: 27px;
}

.chapter-paragraph {
  margin-bottom: 16px;
  font-size: 18px;
  line-height:2.0;
}

#button-group{
  display: flex;
  justify-content: space-around;
  margin: 20px 20px;
}

#divider-horizontal {
    height: 1.5px;
    background-color: var(--l-color);
}

@media screen and (max-width:600px) {
  #nail-box{
    display: none;
  }

  #read-page{
    padding: 20px 0;
    border-radius: 0;
    margin: 0;
  }
}
</style>