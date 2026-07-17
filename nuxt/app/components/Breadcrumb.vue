<script setup lang="ts">
    interface BreadcrumbItem{
        name: string;
        path: string;
    }


    const props = defineProps<{
        items:BreadcrumbItem[];
    }>();
</script>

<template>
    <nav aria-label="breadcrumb" class="pb-4">
        <ol class="flex items-center text-gray-500 gap-2">
            <li v-for="(item,index) in items" :key="index" class="flex items-center ">
                <Icon v-if="index > 0" name="formkit:right" size="24px"  class="text-gray-400"/>
            
                <span v-if="index === items.length -1" class="text-[#FF6A33] font-semibold" aria-current="page">
                    {{item.name}}
                </span>

                <NuxtLink v-else :to="item.path" class="hover:text-[#FF6A33] huver:underline transition-colors">
                        {{ item.name }}
                </NuxtLink>
            </li>
        </ol>
    </nav>
</template>