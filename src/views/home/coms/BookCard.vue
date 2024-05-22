<template>
    <div class="book-card">
        <img class="book-cover" :src="book_cover_url" alt="book_cover" width="200" height="300">
        <p class="book-name">{{ book_info.title }}</p>
        <p class="book-author">作者：{{ book_info.author }}</p>
        <div id="reading-process-box">
            <t-link 
            id="reading-process" 
            v-if="is_read_begin"
            @click="(e)=> {
                router.push({
                    name: 'book',
                    params: {
                        bookId: book_id,
                        chapterId: latest_read_chapter_index
                    }
                })
                e.stopPropagation();
            }">
                阅读进度：{{ latest_read_chapter_name }}
            </t-link>
            <t-link id="reading-process" v-else>未开始阅读</t-link>  
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();


const props = defineProps({
    book_id: String,
    is_read_begin: Boolean,
    latest_read_chapter_index: Number,
    latest_read_chapter_name: String,
    reading_process: Number
})


const book_id = ref(props.book_id);
const is_read_begin = ref(props.is_read_begin);
const latest_read_chapter_index = ref(props.latest_read_chapter_index);
const latest_read_chapter_name = ref(props.latest_read_chapter_name);


const book_info = ref({});
const book_cover_url = `/api/book/${book_id.value}/cover`;

axios.get(`/api/book/${book_id.value}/info`).then((res) => {
    book_info.value = res.data;
    console.log(book_info.value);
})

</script>

<style scoped>
@media screen and (max-width: 600px){
    .book-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 160px;
        height: 240px;
        gap: 5px;
        border-radius: 10px;
        -webkit-transition: 0.25s;
        transition: 0.25s;
    }

    .book-card:hover {
        box-shadow: 0 0.5em 0.5em -0.4em var(--sd-color);
        background-color: var(--sd-color);
        border: 1px solid var(--l-color);
        -webkit-transform: translateY(-0.5em);
        transform: translateY(-0.5em);
    }

    .book-cover {
        width: 96px;
        height: 144px;
        margin-top: 5px;
    }

    .book-name {
        font-size: 16px;
        font-weight: bold;
        height: 16px;
    }

    .book-author {
        font-size: 12px;
        height: 12px;
    }

    #reading-process {
        font-size: 10px;
        color: dodgerblue;
        height: 12px;
        margin-top: 3px;
    }
    #reading-process-box{
        width: 95%;
    }
}

@media screen and (min-width: 600px) {
    .book-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 320px;
        gap: 10px;
        border-radius: 8px;
        -webkit-transition: 0.25s;
        transition: 0.25s;
    }

    .book-card:hover {
        box-shadow: 0 1em 1em -0.4em var(--sd-color);
        background-color: var(--sd-color);
        border: 1px solid var(--l-color);
        -webkit-transform: translateY(-0.5em);
        transform: translateY(-0.5em);
        cursor: pointer;
    }

    .book-cover {
        width: 150px;
        height: 200px;
        margin-top: 10px;
    }

    .book-name {
        font-size: 22px;
        font-weight: bold;
    }

    .book-author {
        font-size: 14px;
    }

    #reading-process {
        font-size: 14px;
        color: dodgerblue
    }   
}

#reading-process {
    width:auto;
    text-align: center;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis; 
}

#reading-process-box{
    max-width:180px;
    margin-left: 20px;
    margin-right: 20px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden; 
    text-overflow: ellipsis;
}



</style>