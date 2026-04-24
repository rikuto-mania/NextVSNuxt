<script setup lang="ts">
import LoginDialog from './components/Dialog/LoginDialog.vue';
import Header from './components/Header.vue';

</script>

<template>
  <div class="min-h-screen">
    <Header />
      <div class="h-120 bg-linear-to-t from-[#FF6A33] to-[#FFD900] ">

      </div>

      <section class=" max-w-5xl mx-auto py-16">
        <div class="pb-8">
          <p class="text-3xl">新しい商品</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-10">
          <ProductCard title="SMCS" :price=2000 :reviews=2 />
          <ProductCard title="SMCS" :price=2000 :reviews=2 />
          <ProductCard title="SMCS" :price=2000 :reviews=2 />
          <ProductCard title="SMCS" :price=2000 :reviews=2 />
          <ProductCard title="SMCS" :price=2000 :reviews=2 />
          <ProductCard title="SMCS" :price=2000 :reviews=2 />
        </div>

        <div class="flex justify-center"> 
          <NuxtLink to="/products" class="text-white text-center bg-[#FF6A33] px-8 py-2.5">もっと見る</NuxtLink>
        </div>
      </section>
    <Footer />
  </div>
</template>
