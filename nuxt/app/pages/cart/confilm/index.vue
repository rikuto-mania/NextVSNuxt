<script lang="ts" setup>
import ConfilmProduct from '~/components/cart/ConfilmProduct.vue';
    const {cartData} = await useCart();
</script>

<template>
    <section class="max-w-5xl mx-auto px-4 py-10">
         <div class="pb-8 flex gap-2">
            <div class="bg-[#FF6A33] w-1 h-auto"></div>
            <h2 class="text-3xl">購入確認</h2>
        </div>

        <div v-if="cartData?.data" class="flex gap-28.5 flex-col lg:flex-row-reverse justify-between">
            <div>
                <p>合計金額</p>
                <p class="font-bold text-3xl pb-9">¥<span class="pl-1.5 text-[#FF6A33]">20000</span></p>
                 <button class="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">購入する</button>
            </div>
            <div v-if="cartData.data" class="flex flex-col xl:w-170">
                <div  v-for="(item,index) in cartData.data" :key="item.id" class="flex flex-col">
                    <ConfilmProduct :title="item.product.name" :price="item.product.price" :quantity="item.quantity" />
                    <hr v-if="index !== cartData.data.length -1" class="border border-[#BBB7B7] my-6"> 
                </div>
            </div>
        </div>
    </section>
</template>