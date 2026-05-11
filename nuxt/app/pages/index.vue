<script setup lang="ts">
import { ref } from 'vue';
import { useProducts } from '#imports';

//ダミー背景用カラー配列
const slider = [
  'from-[#FF6A33] to-[#FFD900]',
  'from-[#3d9fb5] to-[#FFD900]'
]

const current = ref<number>(0)

const next = () =>{
  current.value = (current.value + 1) % slider.length;
}

const prev = () =>{
  current.value = (current.value -1 + slider.length) % slider.length;
}
const {data} = useProducts()

</script>

<template>
  <div class="min-h-screen">
      <div class="relative overflow-hidden w-full ease-in-out">
        <div 
          class="flex transition-transform duration-500" 
          :style="{transform:`translateX(-${current * 100}%)`}"
        >
          <div 
            v-for="(bg,index) in slider" 
            :key="index"
            class="w-full h-120 shrink-0 bg-linear-to-t" 
            :class="bg"
          ></div>
        </div>

        <button @click="prev" class="absolute py-3.25 px-5 bg-white/80 rounded-full top-1/2 left-3 -translate-y-1/2 flex items-center justify-center">
          <Icon name="formkit:left" style="color: black" size="24"/>
        </button>

        <button @click="next" class="absolute py-3.25 px-5 bg-white/80 rounded-full top-1/2 right-3 -translate-y-1/2 flex items-center justify-center">
          <Icon name="formkit:right" style="color: black" size="24"/>
        </button>
      </div>

      <section class="max-w-5xl mx-auto px-4 py-16">
        <div class="pb-8">
          <p class="text-3xl">新しい商品</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          <ProductCard
          v-for="products in data"
          :title="products.name"
          :price=products.price :reviews=2 />
        </div>

        <div class="flex justify-center"> 
          <NuxtLink to="/products" class="text-white text-center bg-[#FF6A33] px-8 py-2.5">もっと見る</NuxtLink>
        </div>
      </section>
  </div>
</template>