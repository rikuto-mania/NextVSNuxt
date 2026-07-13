<script lang="ts" setup>
    interface formProps{
        label:string,
        name:string,
        id:string,
        placeholder?:string,
        value?: string, 
    }

    const props = defineProps<formProps>()
    
    //emit 子コンポーネントから親コンポーネントへデータを渡したり、イベントを通知したりするための機能
    //親コンポーネントへ「modelValue」イベントを送信
    const emit = defineEmits<{
        (e:"update:modelValue",value:string) : void
    }>()
</script>

<template>
    <div class="flex flex-col pb-6">
        <label :for="id" class="pb-3">{{label}}</label>
        <textarea 
            @input="emit('update:modelValue',($event.target as HTMLInputElement).value)"
            :name="name"
            :id="id"
            :placeholder="placeholder" 
            class="px-3 py-2.5 rounded-lg border-2 border-[#BBB7B7] w-full"
         />
    </div>
</template>

//MEMO
//emit子コンポーネントから親コンポーネントへデータを渡したり、イベントを通知したりするための機能