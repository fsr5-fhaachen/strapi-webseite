<template>
  <div>
    <div
      v-if="!pending && !error"
      class="flex flex-col rounded-lg shadow-lg overflow-hidden"
    >
      <div class="flex-shrink-0">
        <img
          class="w-full object-cover h-96"
          :src="thumbnailUrl"
          alt=""
          loading="lazy"
        />
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
          <p class="font-semibold text-gray-900 text-2xl">
            {{ article.attributes.title }}
          </p>
          <div class="mt-3 text-base text-gray-900">
            <div class="flex gap-2 flex-col" v-html="computedHtml" />
          </div>
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
  </div>
</template>

<script setup lang="ts">
import { JSDOM } from "jsdom";
import { ArticleResponse } from "~~/types/Article";
const { findOne } = useStrapi4();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const { data, pending, refresh, error } = await useAsyncData("articles", () =>
  findOne("articles", route.params.id as string, {
    populate: ["banner", "category"],
  })
);

if (!pending.value && error.value) {
  router.push("/error");
}

const article = computed(() => {
  if (!data) {
    return null;
  }
  return (data.value as ArticleResponse).data;
});

useMeta({
  title: computed(() => {
    return config.APP_NAME + " - " + article.value?.attributes.title ?? "";
  }),
});

const publishedAtDate = computed(() => {
  if (!article.value.attributes.publishedAt) {
    return new Date();
  }
  return new Date(article.value.attributes.publishedAt);
});
const readingTime = computed(() => {
  if (!article.value.attributes.message) {
    return null;
  }

  // calculate reading time in minutes from the message length with 130 words per minute
  const words = article.value.attributes.message.split(" ").length;

  return `${Math.ceil(words / 130)} min`;
});

const thumbnailUrl = computed(() => {
  if (article && article.value.attributes.banner?.data?.id) {
    return (
      config.STRAPI_URL +
      article.value.attributes.banner.data.attributes.formats.large.url
    );
  }
  return "/images/article/default.jpg";
});

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

const html = ref(article.value.attributes.message);

const computedHtml = computed(() => {
  if (!html.value) return "";

  const dom = new JSDOM(html.value);

  // replace all image src and activate lazy loading
  const images = dom.window.document.querySelectorAll("img");
  images.forEach((image) => {
    image.setAttribute("loading", "lazy");
    image.setAttribute("src", config.STRAPI_URL + image.getAttribute("src"));
  });

  // modify all links
  const links = dom.window.document.querySelectorAll("a");
  links.forEach((link) => {
    link.classList.add("text-teal-600", "hover:underline");
  });

  // modify all headings
  const h1 = dom.window.document.querySelectorAll("h1");
  h1.forEach((h) => {
    h.classList.add("text-4xl", "font-semibold");
  });
  const h2 = dom.window.document.querySelectorAll("h2");
  h2.forEach((h) => {
    h.classList.add("text-3xl", "font-semibold");
  });
  const h3 = dom.window.document.querySelectorAll("h3");
  h3.forEach((h) => {
    h.classList.add("text-2xl", "font-medium");
  });
  const h4 = dom.window.document.querySelectorAll("h4");
  h4.forEach((h) => {
    h.classList.add("text-xl", "font-medium");
  });
  const h5 = dom.window.document.querySelectorAll("h5");
  h5.forEach((h) => {
    h.classList.add("text-lg", "font-normal");
  });
  const h6 = dom.window.document.querySelectorAll("h6");
  h6.forEach((h) => {
    h.classList.add("text-base", "font-normal");
  });

  return dom.window.document.body.innerHTML;
});
</script>
