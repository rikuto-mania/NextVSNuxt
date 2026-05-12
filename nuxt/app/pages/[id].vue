<script setup lang="ts">
const pieces = Array.from({length: 99},(_,i) => i +1)
const route = useRoute();
const id = Number(route.params.id);

const {data:productData,error:productError} = useProduct(id);
const {data:reviewData} = await useReview(id);

</script>

<template>
        <section class="flex flex-col md:flex-row justify-between px-4 xl:px-11 py-10" v-if="productData">
            <div class="flex flex-col md:flex-row">
                <div class="flex flex-row md:flex-col gap-3 md:pr-4.5 pb-3">
                    <div class="w-12 h-12 bg-[#F2F1F1]"></div>
                    <div class="w-12 h-12 bg-[#F2F1F1]"></div>
                    <div class="w-12 h-12 bg-[#F2F1F1]"></div>
                    <div class="w-12 h-12 bg-[#F2F1F1]"></div>
                </div>
                <div class="flex flex-col md:flex-row">
                    <div class="w-full h-100 md:w-100 md:h-100 bg-[#F2F1F1]"></div>
                    <div class="md:pl-9 py-3">
                        <p class="text-4xl">{{productData.name}}</p>
                        <p class="font-bold text-2xl hidden md:block">¥<span class="pl-1.5 text-[#FF6A33]">{{productData.price}}</span></p>
                    </div>
                </div>
            </div>

            <div class="flex flex-col gap-4 w-full md:w-50 justify-center">
                <p class="font-bold text-4xl">¥<span class="pl-1.5 text-[#FF6A33]">{{productData.price}}</span></p>
                <div class="pb-2.5 ">
                    <label for="pieces">個数を選択</label>
                    <select name="pieces" id="pieces" class="w-full py-2.5 border border-[#BBB7B7]">
                        <option v-for="num in pieces" :key="num" value="num">
                            {{num}}
                        </option>
                    </select>
               </div>
               <button class="w-full py-2.5 text-white bg-[#FF6A33]">購入する</button>
               <button class="w-full py-2.5 bg-[#F2F1F1]">カートに追加</button>
            </div>
        </section>

        <section class="px-4 xl:px-11 py-10">
            <div class="pb-8 flex gap-2">
                <div class="bg-[#FF6A33] w-1 h-auto"></div>
                <p class="text-3xl">レビュー</p>
            </div>
            <hr class="border border-[#BBB7B7]"> 
            <div v-for="reviews in reviewData">
                <div class="py-4">
                    <!-- <p>{{reviews.userId}}</p> -->
                    <p class="text-yellow-400 pr-1.5">★★★★★</p>
                    <p>{{reviews.description}}</p>
                </div>
                <hr class="border-b border-[#BBB7B7]">
            </div>
        </section>
</template>