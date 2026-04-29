<script lang="ts" setup>
    interface formProps{
        label:string,
        type: "text" | "email" | "password",
        name:string,
        id:string,
        placeholder?:string,
        value?: string, 
    }

    const props = defineProps<formProps>()
</script>

<template>
    <div class="flex flex-col pb-6">
        <label :for="id" class="pb-3">{{label}}</label>
        <input 
            :type="type"
            :name="name"
            :id="id"
            :placeholder="placeholder" 
            :value="value"
            class="px-3 py-2.5 rounded-lg border-2 border-[#BBB7B7] w-full"
        >
    </div>
</template>