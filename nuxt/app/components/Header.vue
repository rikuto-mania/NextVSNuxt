<script lang="ts" setup>
    import LoginDialog from './Dialog/LoginDialog.vue';
    import {ref} from 'vue';
import SearchBar from './SearchBar.vue';

    const isOpenDialog = ref(false)

    const toggle = () => {
        isOpenDialog.value = !isOpenDialog.value
    }
</script>

<template>
    <header class=" border-b border-gray-400 flex items-center justify-between px-6 py-5">
        <div class="flex gap-4">
            <p class="text-[#FF6A33] text-4xl font-bold">Rikushop</p>
            <SearchBar />
        </div>
        <div class="flex items-center gap-2">
            <p class="text-lg" @click="toggle">ログイン</p>
            <LoginDialog v-if="isOpenDialog" @close="isOpenDialog = false"/>
            <Icon name="mdi:cart" style="color: #FF6A33" size="2em" />
        </div>
    </header>
</template>