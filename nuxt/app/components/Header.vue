<script lang="ts" setup>
    import LoginDialog from './Dialog/loginDialog.vue';
    import {ref} from 'vue';
import SearchBar from './SearchBar.vue';

    const isOpenDialog = ref(false)

    const toggle = () => {
        isOpenDialog.value = !isOpenDialog.value
    }
</script>

<template>
    <header class=" border-b border-gray-400 px-6 py-5">
        <div class="flex items-center justify-between pb-3 sm:pb-0">
            <div class="flex gap-4">
                <NuxtLink href="/">
                     <p class="text-[#FF6A33] text-4xl font-bold">Rikushop</p>
                </NuxtLink>
                <div class="hidden sm:flex">
                    <SearchBar />
                </div>
            </div>
            <div class="flex items-center gap-2">
                <p class="text-lg" @click="toggle">ログイン</p>
                <LoginDialog v-if="isOpenDialog" @close="isOpenDialog = false"/>
                <NuxtLink href="/cart">
                    <Icon name="mdi:cart" style="color: #FF6A33" size="2em" />
                </NuxtLink>
            </div>
        </div>
        <div class="sm:hidden">
            <SearchBar />
        </div>
    </header>
</template>