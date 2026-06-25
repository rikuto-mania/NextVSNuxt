<script lang="ts" setup>
    interface productCardProps{
        image?:string;
        title:string;
        price:number;
        reviews:number;
    }
    
    const props = defineProps<productCardProps>();

    const imagepath = "/products/" + props.image;
</script>

<template>
    <div class="flex justify-between items-center gap-6 w-full h-30">
       <div class="flex items-center">
            <div class="flex justify-center items-center bg-[#F2F1F1] w-30 h-30 rounded-2xl">
                <NuxtImg :src="imagepath" width="100" height="auto"/>
            </div>
            <div class="pl-3 md:pl-6 md:text-2xl">
                <p class="font-medium pb-3">{{title}}</p>
                <p class="font-bold">¥<span class="pl-1.5 text-[#FF6A33]">{{price}}</span></p>
            </div>
       </div>
        <div class="flex flex-col items-end justify-between h-full">
            <Icon name="material-symbols-light:close-rounded" style="color:#F21010" size="24px"/>
            <div class="flex gap-3 md:gap-9  px-3 py-2 border border-[#BBB7B7] rounded-full">
                <Icon name="ic:round-minus"  size="24px"/>
                <p>11</p>
                <Icon name="ic:round-plus" size="24px"/>
            </div>
        </div>
    </div>
</template>