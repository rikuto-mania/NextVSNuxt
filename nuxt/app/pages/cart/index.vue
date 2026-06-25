<script lang="ts" setup>
    import CartProduct from '~/components/cart/CartProduct.vue';


    const dummyResponse = [
        {
            title:"macbookair 2020 intel silver",
            price:200000,
            review:4.5
        },
        {
            title:"ddd",
            price:20,
            review:4
        }
    ]
</script>

<template>
    <section class="max-w-5xl mx-auto px-4 py-10">
         <div class="pb-8 flex gap-2">
            <div class="bg-[#FF6A33] w-1 h-auto"></div>
            <h2 class="text-3xl">あなたのカート</h2>
        </div>

        <div class="flex gap-28.5 flex-col lg:flex-row-reverse justify-between">
            <div>
                <p>合計金額</p>
                <p class="font-bold text-3xl pb-9">¥<span class="pl-1.5 text-[#FF6A33]">20000</span></p>
                 <button class="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">確認画面へ</button>
            </div>
            <div class="flex flex-col xl:w-170">
                <div  v-for="(item,index) in dummyResponse" :key="index" class="flex flex-col">
                    <CartProduct :title="item.title" :price="item.price" :reviews="item.review" />
                    <hr v-if="index !== dummyResponse.length -1" class="border border-[#BBB7B7] my-6"> 
                </div>
            </div>
        </div>
    </section>
</template>