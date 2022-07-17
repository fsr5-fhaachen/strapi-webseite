<template>
  <div v-if="!pending && !error" class="mt-3 text-base text-gray-900">
    <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div class="flex-1 bg-white p-6 flex flex-col justify-between">
        <div class="flex gap-2 flex-col" v-html="computedHtml" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { JSDOM } from "jsdom";
import { PagesResponse } from "~~/types/Page";
const { find } = useStrapi4();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();

const { data, pending, refresh, error } = await useAsyncData("pages", () =>
  find("pages", {
    filters: { name: route.params.page },
  })
);

// if (!pending.value && error.value) {
//   router.push("/error");
// }

const page = computed(() => {
  if (!data) {
    return null;
  }
  return (data.value as PagesResponse).data[0];
});

useMeta({
  title: computed(() => {
    return config.APP_NAME + " - " + page.value?.attributes.title ?? "";
  }),
});

const html = ref(page.value.attributes.content);

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
