<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      <NuxtLink :to="articleTo">
        <img
          class="w-full object-cover h-48"
          :class="{
            'lg:h-64': theme === 'medium',
          }"
          :src="thumbnailUrl"
          alt=""
          loading="lazy"
        />
      </NuxtLink>
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <p
          v-if="article.attributes.category"
          class="text-sm font-medium text-teal-600"
        >
          <NuxtLink
            :to="'/category/' + article.attributes.category.data.id + '/'"
            class="hover:underline"
          >
            {{ article.attributes.category.data.attributes.title }}
          </NuxtLink>
        </p>
        <NuxtLink :to="articleTo" class="block mt-2">
          <p class="text-xl font-semibold text-gray-900">
            {{ article.attributes.title }}
          </p>
          <p
            class="mt-3 text-base text-gray-500 line-clamp-5"
            :class="{
              'lg:line-clamp-2': theme === 'medium',
            }"
          >
            {{ article.attributes.description }}
          </p>
        </NuxtLink>
      </div>
      <div class="mt-6 flex items-center">
        <div class="flex-shrink-0">
          <a :href="post.author.href">
            <span class="sr-only">{{ post.author.name }}</span>
            <img
              class="h-10 w-10 rounded-full"
              :src="post.author.imageUrl"
              alt=""
            />
          </a>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-gray-900">
            <a :href="post.author.href" class="hover:underline">
              {{ post.author.name }}
            </a>
          </p>
          <div class="flex space-x-1 text-sm text-gray-500">
            <time :datetime="publishedAtDate.toISOString()">
              {{ publishedAtDate.toLocaleDateString() }}
            </time>
            <span aria-hidden="true"> &middot; </span>
            <span> {{ readingTime }} read </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Article } from "~~/types/Article";
const config = useRuntimeConfig();

const post = ref({
  title: "Boost your conversion rate",
  href: "#",
  category: { name: "Category A", href: "#" },
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium praesentium eius, ut atque fuga culpa, similique sequi cum eos quis dolorum.",
  date: "Mar 16, 2020",
  datetime: "2020-03-16",
  imageUrl:
    "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80",
  readingTime: "6 min",
  author: {
    name: "Roel Aufderehar",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
});

const { article, theme } = defineProps({
  article: {
    type: Object as () => Article,
  },
  theme: {
    type: String,
    default: "default",
    validator: (value: string) => ["default", "medium"].includes(value),
  },
});

const publishedAtDate = computed(() => {
  if (!article.attributes.publishedAt) {
    return new Date();
  }
  return new Date(article.attributes.publishedAt);
});
const readingTime = computed(() => {
  if (!article.attributes.message) {
    return null;
  }

  // calculate reading time in minutes from the message length with 130 words per minute
  const words = article.attributes.message.split(" ").length;

  return `${Math.ceil(words / 130)} min`;
});

const thumbnailUrl = computed(() => {
  if (article && article.attributes.banner?.data?.id) {
    if (theme === "medium") {
      return (
        config.STRAPI_URL +
        article.attributes.banner.data.attributes.formats.medium.url
      );
    }

    return (
      config.STRAPI_URL +
      article.attributes.banner.data.attributes.formats.small.url
    );
  }
  return "/images/article/default.jpg";
});

const articleTo = computed(() => {
  let to = "/article/";

  to += article.id + "-";

  if (article.attributes.slug) {
    to += article.attributes.slug;
  } else {
    to += article.attributes.title.replace(/\s+/g, "-").toLowerCase();
  }

  return to;
});
</script>
