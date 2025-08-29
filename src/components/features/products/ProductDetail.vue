<template>
  <section class="space-y-4">
    <button
      @click="goBack"
      class="cursor-pointer text-sm text-gray-600 hover:text-rose-600 inline-flex items-center gap-1"
    >
     <- {{ t('common.backToProduct') }}
    </button>

    <div v-if="product.loading" class="grid gap-6 md:grid-cols-2 rounded-lg border p-5">
        <div class="h-64 bg-neutral-800 rounded-lg animate-pulse"></div>
        <div>
            <div class="h-10 bg-neutral-800 rounded-lg animate-pulse"></div>
            <div class="h-10 bg-neutral-800 rounded-lg animate-pulse my-3"></div>
            <div class="h-10 bg-neutral-800 rounded-lg animate-pulse"></div>
        </div>
    </div>
    <div v-else-if="product.error" class="bg-rose-50 border border-rose-200 text-rose-700 rounded p-4">{{ product.error }}</div>
    <div v-else-if="product" class="bg-white rounded-lg border shadow-sm p-6 grid gap-6 md:grid-cols-2">
      <div class="flex items-center justify-center bg-gray-50 p-6 rounded">
        <img :src="product.current?.image" :alt="product.current?.title" class="h-64 object-contain" />
      </div>
      <div>
        <h1 class="text-2xl font-semibold mb-2">{{ product.current?.title }}</h1>
        <p class="text-lg font-semibold mb-4">$ {{ product.current?.price.toFixed(2) }}</p>
        <p class="text-gray-700 mb-6">{{ product.current?.description }}</p>
        <p v-if="product.current?.rating" class="text-sm text-gray-500 flex items-center">
          <img :src="Star" class="h-4 w-4 mr-2"/> {{ product.current?.rating.rate }}/5 ({{ product.current?.rating.count }})
        </p>

        <BaseButton class="mt-5" @click="addCurrentToCart">
          {{ t('common.addToCart') }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart";
import { useI18n } from 'vue-i18n';

import BaseButton from "@/components/ui/BaseButton.vue";
import Star from "@/assets/icons/star.svg"

const route = useRoute();
const router = useRouter();
const product = useProductStore();
const cart = useCartStore();
const { t } = useI18n()

onMounted(() => {
    product.fetchProductById(route.params.id as string);
});

function goBack() {
  router.push("/products");
}

function addCurrentToCart() {
  const p = product.current!;
  cart.add({ id: p.id, title: p.title, price: p.price, image: p.image }, 1);
}
</script>
