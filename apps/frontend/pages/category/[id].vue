<template>
  <div>
    <h1 class="text-4xl font-semibold mb-8">
      {{ category?.attributes.title }}
    </h1>
    <div class="max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
      <ArticleBox v-for="(article, index) in articles" :article="article" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArticlesResponse } from "~~/types/Article";
import { CategoryResponse } from "~~/types/Category";

const { find, findOne } = useStrapi4();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const { data, pending, refresh, error } = await useAsyncData("categories", () =>
  findOne("categories", route.params.id as string)
);
const category = computed(() => {
  if (!data.value) {
    return null;
  }
  return (data.value as CategoryResponse).data;
});

if (!pending.value && error.value) {
  router.push("/");
}

const articleResponse = await useAsyncData("articles", () =>
  find("articles", {
    populate: ["banner"],
    sort: "publishedAt:DESC",
    filters: {
      category: route.params.id,
    },
  })
);

const articles = computed(() => {
  if (!articleResponse.data) {
    return [];
  }
  return (articleResponse.data.value as ArticlesResponse).data;
});

useMeta({
  title: computed(() => {
    return config.APP_NAME + " - " + category.value?.attributes.title ?? "";
  }),
});
</script>
