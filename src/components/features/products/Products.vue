<template>
  <section class="space-y-6">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex-1 max-w-lg">
        <BaseInput
          id="search"
          :label=" t('common.search')"
          :placeholder=" t('common.searchProducts')"
          v-model="ui.q"
        />
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <div>
          <label class="block text-sm text-gray-700 mb-1">{{ t('common.category') }}</label>
          <select v-model="ui.category"
            class="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200">
            <option value="all">{{ t('common.all') }}</option>
            <option v-for="c in products.categories" :key="c" :value="c">{{ c }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm text-gray-700 mb-1">{{ t('common.sort') }}</label>
          <select v-model="ui.sort"
            class="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-200">
            <option value="relevance">{{ t('common.relevance') }}</option>
            <option value="price-asc">{{ t('common.price') }} &uarr;</option>
            <option value="price-desc">{{ t('common.price') }} &darr;</option>
            <option value="title-asc">{{ t('common.title') }} A-Z</option>
            <option value="title-desc">{{ t('common.title') }} Z-A</option>
          </select>
        </div>
        
      </div>
    </div>

    <div v-if="products.loading" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="h-64 bg-neutral-500 rounded-lg border animate-pulse"></div>
    </div>

    <div v-else-if="products.error" class="bg-rose-50 border border-rose-200 text-rose-700 rounded p-4">
      {{ products.error }}
      <BaseButton class="ml-3" @click="products.fetchProducts()">{{ t('process.tryAgain') }}</BaseButton>
    </div>

    <div v-else-if="products.isEmpty" class="text-gray-600">{{ t('common.emptyProducts') }}</div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from "vue";
import { useProductStore } from "@/stores/product";
import { useI18n } from 'vue-i18n';
import ProductCard from "./ProductCard.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

const products = useProductStore();
const { t } = useI18n();

const ui = reactive({
  q: "",
  category: "all",
  sort: "relevance" as "relevance" | "price-asc" | "price-desc" | "title-asc" | "title-desc",
});

onMounted(async () => {
  await Promise.all([products.fetchProducts(), products.fetchCategories()]);
});

const filtered = computed(() => {
  let list = products.items.slice();

  if (ui.category !== "all") {
    list = list.filter(p => p.category === ui.category);
  }

  const q = ui.q.trim().toLowerCase();
  if (q) {
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  switch (ui.sort) {
    case "price-asc":  list.sort((a, b) => a.price - b.price); break;
    case "price-desc": list.sort((a, b) => b.price - a.price); break;
    case "title-asc":  list.sort((a, b) => a.title.localeCompare(b.title)); break;
    case "title-desc": list.sort((a, b) => b.title.localeCompare(a.title)); break;
    default: break;
  }

  return list;
});
</script>