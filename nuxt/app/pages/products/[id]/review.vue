<script setup lang="ts">
    import textArea from '~/components/textArea.vue';
    import submitButton from '~/components/submitButton.vue';
    import Breadcrumb from '~/components/Breadcrumb.vue';

    //リクエストデータ
    const level = ref(5);
    const description = ref("");

    //商品ID取得
    const route = useRoute();
    const productId = Number(route.params.id);

    const breadcrumb = [
        { name: '商品一覧', path: '/products' },
        { name: '商品詳細', path: `/products/${productId}` },
        { name: 'レビュー', path: `/products/${productId}/review` }
    ]
</script>

<template>
    <section class="px-4 py-10 max-w-4xl mx-auto">
        <Breadcrumb :items="breadcrumb"/>
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


