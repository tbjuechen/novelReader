<template>
    <div class="book-shelf container">
        <book-card v-for="item in bookList" 
        :key="item.title" 
        :book_id="String(item.book_id)"
        :is_read_begin="item.is_read_begin"
        :latest_read_chapter_index="item.latest_read_chapter_index"
        :latest_read_chapter_name="item.latest_read_chapter_name"
        @click="() => {
            console.log(item.book_id);
            router.push({
                name: 'catalog',
                params: {
                    bookId: item.book_id
                }
            })
        }
        "/>
    </div>
        
</template>

<script setup>
import BookCard from './BookCard.vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import axiosInstance from '@/services/axiosinstance';

const router = useRouter();

const bookList = ref([]);

axiosInstance.get('/api/user/shelf').then((res) => {
    console.log(res.data);
    bookList.value = res.data;
})
</script>

<style scoped>
@media screen and (max-width: 600px){
    .book-shelf {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        grid-template-rows: repeat(auto-fill, 240px);
        grid-column-gap: 10px;
        grid-row-gap: 40px;
        margin-top: 20px;
    }
}
@media screen and (min-width: 600px){
    .book-shelf {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        margin-left: 40px;
        margin-right: 40px;
        grid-column-gap: 20px;
        grid-row-gap: 20px;
    }
    
}

.book-shelf {
    display: grid;
    margin: 20px 0px;
    flex-grow: 1;
    /* place-items: center; */
}

</style>