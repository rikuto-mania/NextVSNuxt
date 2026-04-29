<script lang="ts" setup>
     interface butonProps{
        value:string,
    }

    const props = defineProps<butonProps>();
</script>

<template>
    <button type="submit" class="bg-[#FF6A33] text-white border py-2.5 w-full rounded-full">{{value}}</button>
</template>