<script lang="ts" setup>
    import CartProduct from '~/components/cart/CartProduct.vue';
    const {cartData} = await useCart();

    //商品削除
    const handleDeletedItems = (deletedId:number) =>{
        if(cartData.value?.data){
            cartData.value.data = cartData.value.data.filter(item => item.id !== deletedId)
        }
    }

    //数量更新
    const updateQuantity = (id:number,newQuantity:number) =>{
        if(cartData.value?.data){
            const targetItem = cartData.value.data.find(item => item.id === id);
            if(targetItem){
                targetItem.quantity = newQuantity;
            }
        }
    }   
</script>

<template>
    <section class="max-w-5xl mx-auto px-4 py-10">
         <div class="pb-8 flex gap-2">
            <div class="bg-[#FF6A33] w-1 h-auto"></div>
            <h2 class="text-3xl">あなたのカート</h2>
        </div>

        <div v-if="cartData?.data.length" class="flex gap-28.5 flex-col lg:flex-row-reverse justify-between">
            <div>
                <p>合計金額</p>
                <p class="font-bold text-3xl pb-9">¥<span class="pl-1.5 text-[#FF6A33]">20000</span></p>
                <NuxtLink href="/cart/confilm">
                    <button class="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">確認画面へ</button>
                </NuxtLink>
                 
            </div>

            <div class="flex flex-col xl:w-170">
                <div  v-for="(item,index) in cartData?.data" :key="item.id" class="flex flex-col">
                    <CartProduct 
                        :id="item.id" 
                        :title="item.product.name" 
                        :price="item.product.price" 
                        :image="item.product.image?.[0]?.img_path"
                        :quantity="item.quantity" 
                        @deleted="handleDeletedItems"
                        @update-quantity="updateQuantity"
                    />
                    <hr v-if="index !== cartData.data.length -1" class="border border-[#BBB7B7] my-6"> 
                </div>
            </div>
        </div>
        <p v-else class="text-bold text-3xl">カートは空です</p>
    </section>
</template>