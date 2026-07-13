<script lang="ts" setup>
     interface butonProps{
        value:string,
        url:string,
        method:"GET" | "POST" | "PUT" | "DELETE",
        body?:any,
        redirectUrl:string;
    }

    const props = defineProps<butonProps>();

    const rotue = useRouter()


   
    //親コンポーネントへ「success」イベントを送信するための「emit」
    const emit = defineEmits<{
        (e:"success") : void
    }>()

    //ボタン送信処理
    const submit = async() =>{
        try{
            await useApi(props.url,props.method,{body:props.body});

             emit("success");
            rotue.push(props.redirectUrl);
             
        }catch(error){
            console.error("送信エラー:",error);
        }
    }
</script>

<template>
    <button 
        type="button" 
        class="bg-[#FF6A33] text-white border py-2.5 w-full rounded-full" 
        @click.prevent="submit"
    >
        {{props.value}}
    </button>
</template>