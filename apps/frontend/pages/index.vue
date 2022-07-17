<template>
  <div class="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
    <ArticleBox
      v-for="(article, index) in articles"
      :article="article"
      :theme="[0, 6].includes(index) ? 'medium' : 'default'"
      :class="{
        'lg:col-span-2': [0, 6].includes(index),
      }"
    />
  </div>
</template>

<script setup lang="ts">
import { ArticlesResponse } from "~~/types/Article";

const { find } = useStrapi4();

definePageMeta({
  title: "Home",
});

const { data } = await useAsyncData("articles", () =>
  find("articles", {
    populate: ["banner", "category"],
    sort: "publishedAt:DESC",
  })
);

const articles = computed(() => {
  if (!data) {
    return [];
  }
  return (data.value as ArticlesResponse).data;
});
</script>
