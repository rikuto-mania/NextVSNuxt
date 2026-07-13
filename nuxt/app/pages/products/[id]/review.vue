<script setup lang="ts">
    import textArea from '~/components/textArea.vue';
    import submitButton from '~/components/submitButton.vue';

    //リクエストデータ
    const level = ref(5);
    const description = ref("");

    //商品ID取得
    const route = useRoute();
    const productId = Number(route.params.id);
</script>

<template>
    <section class="px-4 py-10 max-w-4xl mx-auto">
        <div  class="pb-8 flex gap-2">
            <div class="bg-[#FF6A33] w-1 h-auto"></div>
            <p class="text-3xl">レビューを投稿</p>   
        </div>
        <div>
            <p>評価</p>
            <div class="flex flex-row">
                <Icon @click="level = n" v-for="n in 5" :name="n <= level? 'material-symbols:star-rounded' :'material-symbols:star-outline-rounded'" style="color: gold" size="48px" class=""/>    
            </div>
        </div>
        <textArea v-model="description" label="レビュー" id="review" name="review"/>
        <submitButton value="投稿する" :url="`/review/${productId}`" method="POST" :body="{level,description}" :redirectUrl="`/products/${productId}`" />
    </section>
</template>


