<script lang="ts">
import { RouterLink } from 'vue-router';

</script>

<template>
    <div class=" bg-black/20 fixed inset-0 z-20">
        <div class="flex justify-center p-4">
            <div class="px-8 py-9 w-131 rounded-2xl md:rounded-l-2xl bg-white z-10">
                <p class="font-bold text-2xl pb-12">ログイン</p>
                <TextInput label="メールアドレス" type="email" name="mail" id="mail" placeholder="exsample@rikushop.com"/>
                <TextInput label="パスワード" type="password" name="password" id="password" />
                <div class="md:px-18.5">
                    <SubmitButton value="ログイン" />
                </div>
                <p class="text-center  pt-4">アカウントはありますか？<RouterLink to="/signup" class="text-[#FF6A33] rounded-4xl">ログイン</RouterLink></p>
            </div>
            <div class="bg-[#FF6A33] w-79 h-auto rounded-r-2xl hidden md:block"></div>
        </div>
    </div>
</template>