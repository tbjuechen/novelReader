<template>
    <div id="book-box">
        <div id="book-info-box" class="container">
            <div id="cover-container">
                <img :src=cover_url alt="book-cover" id="cover">
            </div>
            <div class="desktop" id="divider-vertical"></div>
            <div class="mobile" id="divider-horizontal"></div>
            <div id="info-container">
                <p class="title-text" id="center">{{ bookInfo.title }}</p>
                <p class="info-text" id="center"> 作者 : {{ bookInfo.author }}</p>
                <p class="info-text"> 简介 ： {{ bookInfo.introduction }}</p> 
                <p class="info-text" v-if="bookInShelf.is_read_begin" id="center"
                >阅读进度：
                    <t-link 
                    style="font-size: 16px; 
                    color: dodgerblue;
                    overflow: hidden;
                    text-overflow: ellipsis;"
                    @click="()=> {
                        router.push({
                            name: 'book',
                            params: {
                                bookId: book_id,
                                chapterId: bookInShelf.latest_read_chapter_index
                            }
                        })
                    }">
                        {{ bookInShelf.latest_read_chapter_name }}({{ bookInShelf.reading_progress }}%)
                    </t-link>
                </p>
            </div>

            <div class="desktop" id="divider-vertical"></div>
            
        </div>
        <div id="chapter-list" class="container">
            <h1 id="catalog-title">章节目录</h1>
            <div id="divider-horizontal"></div>
            <div id="catalog-box">
                <div 
                v-for="chapter in chapterList" 
                :key="chapter.chapter_id" 
                id="chapter-container"
                @click="()=>{
                    router.push({
                        name: 'book',
                        params: {
                            bookId: book_id,
                            chapterId: chapter.chapter_id
                        }
                    })
                
                }">
                    <p id="chapter-titile-text">{{ chapter.chapter_title }}</p>
                </div>
            </div>
        </div>
    </div>
  
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axiosInstance from '@/services/axiosinstance';

const book_id = useRouter().currentRoute.value.params.bookId;
let bookInShelf = ref({});
const chapterList = ref([]);
const cover_url = ref('');
const router = useRouter();
const bookInfo = ref({});


// axios.all([
//     axios.get(`/bookapi/book/info/${book_id}`),
//     axios.get(`/bookapi/book/catalog/${book_id}`)
// ])
// .then(axios.spread((info, catalog) => {
//     bookInfoJson.value = info.data;
//     schedule.value = info.data.schedule;
//     chapterList.value = catalog.data.data;
//     cover_url.value = `/bookapi/book/cover/${book_id}`;
// }));

axiosInstance.get(`/api/book/${book_id}/inshelf`).then((res) => {
    bookInShelf.value = res.data;
    bookInfo.value = res.data.book;
    cover_url.value = `/api/book/${book_id}/cover`;
}).catch((err) => {
    console.log(err);
});

axiosInstance.get(`/api/book/${book_id}/chapter`).then((res) => {
    chapterList.value = res.data;
}).catch((err) => {
    console.log(err);
});

</script>

<style>
#book-box {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    gap : 20px;
    /* min-height: 100vh; */
}

#book-info-box {
    display: grid;
    grid-template-columns: 200px 10px 1fr 10px;
    gap:20px;  
}

#cover {
    width: 180x;
    height: 250px;
    background-color: var(--sd-color) ;
    border-radius: 5px;
    padding: 20px;
}

#cover-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    /* border: 1px solid #c0c0c0; */
    /* background-color: var(--sd-color) ;
    border-radius: 5px; */
}

#info-container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
}

.title-text {
    font-size: 30px;
    font-weight: bold;
    height: 30px;
}

.info-text {
    font-size: 16px;
}

#divider-vertical {
    width: 1px;
    height: 100%;
    background-color: var(--l-color);
}
#chapter-list{
    /* width: 100%;
    background-color: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0px 0px 10px 3px #D0D0D0; */

    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: flex-start;
    gap: 20px;

    /* min-height: 100%; */

}

#catalog-title{
    font-size: 24px;
    font-weight: bold;
    /* margin-bottom: 20px; */
    margin-left: 3%;
    margin-top: 20px;
}

#divider-horizontal {
    width: 94%;
    height: 1px;
    background-color: var(--l-color);
    margin-left: 3%;
    margin-right: 3%;
}

#catalog-box{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap : 0 20px;
    margin-left: 3%;
    margin-right: 3%;
}

#chapter-container{
    /* white-space: nowrap; */
    position: relative;
    overflow: hidden; 
    height: 40px;
    border-radius: 5px;
}

#chapter-titile-text{
    position: absolute;
    left: 10px;
    top: 10px;
    max-width: 90%;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; 
    height: 20px;
}

#chapter-container:hover{
    background-color: var(--sd-color);
    cursor: pointer;
}

@media screen and (max-width: 600px){
    #book-info-box{
        grid-template-columns: 1fr;
        grid-template-rows: 260px 10px 1fr;
        width: 100%;
        padding-bottom: 40px;
        height: auto;
    }


    #center {
        text-align: center;
    }
    
    .info-text{
        width: 100%;
    }

    #cover{
        width: 180px;
        height: 240px;
    }

    #catalog-box{
        grid-template-columns: 1fr;
    }

    .title-text{
        height: 40px;
    }
    
}

</style>