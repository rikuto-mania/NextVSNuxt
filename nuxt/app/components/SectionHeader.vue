<script lang="ts" setup>
    interface SectionHeaderProps{
        title: string;
    }

    const props = defineProps<SectionHeaderProps>();
</script>


<template>
    <div class="pb-8 flex gap-2">
        <div className="bg-[#FF6A33] w-1 h-auto"></div>
        <h2 class="text-3xl">{{props.title}}</h2>
    </div>
</template>