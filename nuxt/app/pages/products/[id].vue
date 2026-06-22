<script setup lang="ts">
const pieces = Array.from({length: 99},(_,i) => i +1)
const route = useRoute();
const id = Number(route.params.id);

const {data:productData} = useFetch(`/api/products/${id}`)
const {reviewdata} = useReview(id);

//画像入れ替え機能
const currentImage = ref<string>('');

//初期値リセット
watchEffect(() =>{
    if(productData.value?.image?.length && !currentImage.value){
        currentImage.value =  productData.value.image[0]?.img_path ?? '';
    }
})
</script>

<template>
    <section :v-if="productData" class="flex flex-col md:flex-row justify-between px-4 xl:px-11 py-10" v-if="productData">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-row md:flex-col gap-3 md:pr-4.5 pb-3">
                <div class="flex justify-center items-center w-12 h-12 bg-[#F2F1F1]" v-for="image in productData.image" @click="currentImage = image.img_path">
                    <NuxtImg :src="`/products/${image.img_path}`" width="80" class="h-auto"/>
                </div>
            </div>
            <div class="flex flex-col md:flex-row">
                <div  class="flex justify-center items-center w-full h-100 md:w-100 md:h-100 bg-[#F2F1F1]">
                    <NuxtImg v-if="productData.image" :src="`/products/${currentImage}`" width="360" class="h-auto"/>
                </div>
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

    <section v-if="reviewdata" class="px-4 xl:px-11 py-10">
        <div  class="pb-8 flex gap-2">
            <div class="bg-[#FF6A33] w-1 h-auto"></div>
            <p class="text-3xl">{{reviewdata.length}}<span>件のレビュー</span></p>
        </div>
        <hr class="border border-[#BBB7B7]"> 
    
        <div v-for="reviews in reviewdata">
            <div class="py-4">
                <!-- <p>{{reviews.userId}}</p> -->
                <p class="text-yellow-400 pr-1.5">★★★★★</p>
                <p>{{reviews.description}}</p>
            </div>
            <hr class="border-b border-[#BBB7B7]">
        </div>
        <div v-if="reviewdata.length === 0" class="flex flex-col justify-center items-center">
            <p class="text-center py-6">レビューがまだありません...</p>
            <button class="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">レビューを投稿する</button>
        </div>
    </section>
</template>