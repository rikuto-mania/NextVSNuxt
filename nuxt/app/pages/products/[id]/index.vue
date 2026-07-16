<script setup lang="ts">
    import type {Products} from '~/../types/index'
    const pieces = Array.from({length: 99},(_,i) => i +1);
    const route = useRoute();
    const id = Number(route.params.id);

    const {data:productData} = useFetch<Products>(`/api/products/${id}`);
    const {reviewdata} = useReview(id);

    //画像入れ替え機能
    const currentImage = ref<string>('');
    
    //数量
    const currentQuantity = ref(1);

    const level = ref(5);
    
    //カート追加
    const addCart = (id:number) =>{
         useApi(`/cart/create`,"POST",{body:{"productId":id,"quantity":currentQuantity.value}});
    }

    //平均レビュー
    const avgReview =computed(() =>{
        if(!reviewdata.value?.reviewCount || reviewdata.value.reviews.length === 0) return; 

        const counts = reviewdata.value.reviewCount;

        const totalScore =(
            (5 * counts[5] || 0) + 
            (4 * counts[4] || 0) + 
            (3 * counts[3] || 0) + 
            (2 * counts[2] || 0) + 
            (1 * counts[1] || 0));

        return (totalScore / reviewdata.value.reviews.length).toFixed(1);
    });


    const getParcentage = (rating: keyof Rating) =>{
        if(!reviewdata.value?.reviewCount || reviewdata.value?.reviews.length === 0) return;

        const count = reviewdata.value.reviewCount[rating] || 0;
        return Math.round((count / reviewdata.value.reviews.length) * 100);
    }

    //初期値リセット
    watchEffect(() =>{
        if(productData.value?.image?.length && !currentImage.value){
            currentImage.value =  productData.value.image[0]?.img_path ?? '';
        }
    })
</script>

<template>
    <section class="flex flex-col md:flex-row justify-between px-4 xl:px-11 py-10" v-if="productData">
        <div class="flex flex-col md:flex-row">
            <div class="flex flex-row md:flex-col gap-3 md:pr-4.5 pb-3">
                <div
                    class="flex justify-center items-center w-12 h-12 bg-[#F2F1F1] cursor-pointer"
                    v-for="image in productData.image"
                    :key="image.img_path"
                    @click="currentImage = image.img_path ,console.log('clicked:', image.img_path, 'currentImage:', currentImage)"
                >
                    <NuxtImg :src="`/products/${image.img_path}`" width="80" class="h-auto"/>
                </div>
            </div>
            <div class="flex flex-col md:flex-row">
                <div  class="flex justify-center items-center w-full h-100 md:w-100 md:h-100 bg-[#F2F1F1]">
                    <NuxtImg v-if="currentImage" :src="`/products/${currentImage}`" width="360" class="h-auto"/>
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
                <select v-model="currentQuantity" name="pieces" id="pieces" class="w-full py-2.5 border border-[#BBB7B7]">
                    <option v-for="num in pieces" :key="num" :value="num">
                        {{num}}
                    </option>
                </select>
            </div>
            <button class="w-full py-2.5 text-white bg-[#FF6A33]">購入する</button>
            <button @click="addCart(id)" class="w-full py-2.5 bg-[#F2F1F1]">カートに追加</button>
        </div>
    </section>

    <section v-if="reviewdata?.reviews" class="px-4 xl:px-11 py-10">
        <div  class="pb-8 flex gap-2">
            <div class="bg-[#FF6A33] w-1 h-auto"></div>
            <p class="text-3xl">{{reviewdata.reviews.length}}<span>件のレビュー</span></p>
        </div>

      <div v-if="reviewdata.reviews" class="pb-8">
        <div v-for="rating in [5,4,3,2,1]" class="flex items-center pb-2">
            <Icon v-for="n in 5" :name="n <= rating ? 'material-symbols:star-rounded' :'material-symbols:star-outline-rounded'" style="color: gold" size="36px" class=""/>    
            <div class="flex items-center gap-4">
                <div class="w-64 h-2 bg-gray-400">
                    <div class="h-2 bg-[#FF6A33]" :style="{width:getParcentage(rating) + '%'}"></div>
                </div>
                <p class=" text-gray-500">{{reviewdata.reviewCount?.[rating]}}</p>
            </div>
        </div>
            
         <NuxtLink :to="`/products/${id}/review`">
             <button class="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33] mt-5">レビューを投稿する</button>
         </NuxtLink>
      </div>
        <hr class="border border-[#BBB7B7]"> 
      
        <div v-for="reviews in reviewdata.reviews" :key="reviews.id">
            <div class="py-4">
                <p class="font-semibold">{{reviews.user.username}}</p>
                <div class="flex flex-row pb-3">
                    <Icon v-for="n in 5" :name="n <= reviews.level ? 'material-symbols:star-rounded' :'material-symbols:star-outline-rounded'" style="color: gold" size="24px" class=""/>    
                </div>
                <p>{{reviews.description}}</p>
            </div>
            <hr class="border-b border-[#BBB7B7]">
        </div>
        <div v-if="reviewdata.reviews.length === 0" class="flex flex-col justify-center items-center">
            <p class="text-center py-6">レビューがまだありません...</p>
            <NuxtLink :to="`/products/${id}/review`">
             <button class="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">レビューを投稿する</button>
            </NuxtLink>
        </div>
    </section>
</template>