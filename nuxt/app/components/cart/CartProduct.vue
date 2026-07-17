<script lang="ts" setup>
    interface productCardProps{
        id:number
        image?:string;
        title:string;
        price:number;
        quantity:number;
    }
    
    const props = defineProps<productCardProps>();
    const emit = defineEmits(['deleted','update-quantity']) //表示更新用emit
    const imagepath = "/products/" + props.image;           //画像パス

    //数量追加
    const append = (id:number,currentQuantity:number) =>{
        const newQuantity = currentQuantity +1;
        
        useApi(`/cart/${id}`,"PUT",{body:{"quantity":newQuantity}});
        emit('update-quantity',id,newQuantity);
    }

    //数量減少
    const remove = (id:number,currentQuantity:number) =>{
        if(currentQuantity <= 1) return;
        const newQuantity = currentQuantity -1;
        useApi(`/cart/${id}`,"PUT",{body:{"quantity":newQuantity}});
        emit('update-quantity',id,newQuantity);
    }

    //カート商品削除
    const deleteCart = (id:number) =>{
        useApi(`/cart/${id}`,"DELETE");
        emit('deleted',id);
    }
</script>

<template>
    <div class="flex justify-between items-center gap-6 w-full h-30">
       <div class="flex items-center">
            <div class="flex justify-center items-center bg-[#F2F1F1] w-30 h-30 rounded-2xl">
                <NuxtImg :src="imagepath" width="100" height="auto"/>
            </div>
            <div class="pl-3 md:pl-6 md:text-2xl">
                <p class="font-medium pb-3 text-[16px]">{{title}}</p>
                <p class="font-bold">¥<span class="pl-1.5 text-[#FF6A33]">{{price}}</span></p>
            </div>
       </div>
        <div class="flex flex-col items-end justify-between h-full">
            <Icon @click="deleteCart(id)"  name="material-symbols-light:close-rounded" style="color:#F21010" size="24px"/>
            <div class="flex gap-3 md:gap-9  px-3 py-2 border border-[#BBB7B7] rounded-full">
                <Icon @click="remove(id,quantity)" name="ic:round-minus"  size="24px"/>
                <p >{{quantity}}</p>
                <Icon @click="append(id,quantity)" name="ic:round-plus" size="24px"/>
            </div>
        </div>
    </div>
</template>