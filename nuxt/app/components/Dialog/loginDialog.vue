<script lang="ts" setup>
import { ref } from 'vue';

//状態管理変数(初期値はログイン(true))
const isLoginMode = ref(true);

const emit = defineEmits(['close']); 

//モード切り替え
const toggleMenu = () =>{
    isLoginMode.value = !isLoginMode.value
}

</script>

<template>
    <div class=" bg-black/20 fixed inset-0 z-20" @click="emit('close')">
        <div class="flex justify-center p-4" @click.stop>
            <div class="px-8 py-9 w-131  md:rounded-l-2xl bg-white z-10">
                <p class="font-bold text-2xl pb-12">{{isLoginMode ? "ログイン" : "新規登録"}}</p>
                <TextInput label="メールアドレス" type="email" name="mail" id="mail" placeholder="exsample@rikushop.com"/>
                <TextInput label="パスワード" type="password" name="password" id="password" />

                <div v-if="!isLoginMode">
                     <TextInput label="パスワード(確認)" type="password" name="passwordConfilm" id="passwordConfilm" />
                </div>
                <div class="md:px-18.5">
                    <SubmitButton :value= "isLoginMode ? 'ログイン' : 'アカウントを作成' "/>
                </div>
                <p class="text-center  pt-4">{{isLoginMode ? "アカウントはありませんか？" : "アカウントはありますか？"}}<NuxtLink to="/signup" class="text-[#FF6A33] rounded-4xl" @click="toggleMenu">{{isLoginMode ? "新規登録" : "ログイン"}}</NuxtLink></p>
            </div>
            <div class="bg-[#FF6A33] w-79 h-auto rounded-r-2xl hidden md:block"></div>
        </div>
    </div>
</template>