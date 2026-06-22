import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app:{
    head:{
      title:"Rikushop",
      meta:[
        {name:"description", content:"rikuto shop"},
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      htmlAttrs:{
        lang:"ja"
      }
    }
  },
  css:['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@nuxt/image'
  ],
  vite:{
    plugins:[
      tailwindcss(),
    ],
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
})
