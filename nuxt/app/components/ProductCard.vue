<script lang="ts" setup>
    interface productCardProps{
        to:string;
        image?:string;
        title:string;
        price:number;
        reviews:number;
    }
    
    const props = defineProps<productCardProps>();

    const imagepath = "/products/" + props.image;
</script>

<template>
    <NuxtLink :to="to">
        <div class="flex justify-center items-center bg-[#F2F1F1] w-full md:w-60 h-60 rounded-2xl ">
           <NuxtImg :src="imagepath" width="200" height="auto"/>
        </div>
        <p class="text-2xl font-medium py-3">{{title}}</p>
        <p class="font-bold">¥<span class="pl-1.5 text-[#FF6A33]">{{price}}</span></p>
        <p><span class="text-yellow-400 pr-1.5">★★★★★</span>({{reviews}})</p>
    </NuxtLink>
</template>