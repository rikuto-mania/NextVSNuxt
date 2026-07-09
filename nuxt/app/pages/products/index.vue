<script setup lang="ts">
    import type {Products} from '~/../types/index'
    import { ref } from 'vue';

    const {data,error} = useFetch<Products[]>("/api/products")

    //ページネーション管理
    const currentPage = ref<number>(1);
    const ITEM_PRE_PAGE = 24;

    //初めのページ
    const start = computed(() =>{
        return (currentPage.value -1) * ITEM_PRE_PAGE;
    });

    //最後のページ
    const end = computed(() =>{
        return start.value + ITEM_PRE_PAGE;
    });

    //合計ページ
    const total = computed(()=>{
        return Math.ceil(data.value?.length ?? 0) / ITEM_PRE_PAGE;
})
</script>

<template>
  <div class="min-h-screen">
      <section class="max-w-5xl mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          <ProductCard
          v-for="products in data?.slice(start,end)"
          :to="`/products/${products.id}`"
          :title="products.name"
          :image="products.image[0]?.img_path"
          :price="products.price" 
          :reviews="products._count.review" />
        </div>

        <div class="flex relative">
           
        <NuxtLink 
            v-if="currentPage > 1" 
            :to="`/products?page=${currentPage}`" 
            class="absolute text-white text-center bg-[#FF6A33] px-8 py-2.5 left-0"
        >
            <button @click="currentPage--">戻る</button>
        </NuxtLink>
            <NuxtLink 
            v-if=" currentPage < total"
            :to="`/products?page=${currentPage}`" 
            class="absolute text-white text-center bg-[#FF6A33] px-8 py-2.5 right-0"            
        >
            <button @click="currentPage++">進む</button>
        </NuxtLink>
        </div>
      </section>
  </div>
</template>