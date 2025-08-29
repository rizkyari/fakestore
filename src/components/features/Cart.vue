<template>
  <section class="space-y-6">
    <h1 class="text-2xl font-semibold">{{ t('common.yourCart') }}</h1>

    <div v-if="cart.isEmpty" class="text-gray-600">
      {{ t('common.yourCart') }} {{ t('common.isEmpty') }}
      <RouterLink to="/products" class="text-rose-600 hover:underline ml-1">{{ t('common.browseProduct') }}</RouterLink>
    </div>

    <div v-else class="grid gap-4">
      <div
        v-for="it in items"
        :key="it.id"
        class="flex items-center gap-4 bg-white border rounded-lg p-4"
      >
        <img :src="it.image" :alt="it.title" class="h-16 w-16 object-contain" />
        <div class="flex-1">
          <p class="font-medium line-clamp-2">{{ it.title }}</p>
          <p class="text-sm text-gray-500">$ {{ it.price.toFixed(2) }}</p>
        </div>

        <div class="flex items-center gap-2">
          <button class="px-2 py-1 border rounded" @click="dec(it.id)">−</button>
          <span class="w-8 text-center">{{ it.qty }}</span>
          <button class="px-2 py-1 border rounded" @click="inc(it.id)">+</button>
        </div>

        <div class="w-24 text-right font-semibold">
          $ {{ (it.price * it.qty).toFixed(2) }}
        </div>

        <button class="text-sm text-gray-500 hover:text-rose-600" @click="remove(it.id)">
          {{ t('common.remove') }}
        </button>
      </div>

      <div class="flex items-center justify-between bg-white border rounded-lg p-4">
        <p class="font-semibold">{{ t('common.total') }}</p>
        <p class="text-xl font-semibold">$ {{ total.toFixed(2) }}</p>
      </div>

      <div class="flex justify-end gap-3">
        <BaseButton class="bg-gray-200 text-gray-800 hover:bg-gray-300" @click="clear">{{ t('common.clear') }}</BaseButton>
        <BaseButton @click="() => console.log('Checkout simulated')">{{ t('common.checkout') }}</BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";
import { useI18n } from 'vue-i18n';
import BaseButton from "@/components/ui/BaseButton.vue";

const cart = useCartStore();
const { t } = useI18n();
const items = computed(() => cart.items);
const total = computed(() => cart.total);

function inc(id: number) {
  const it = cart.items.find(i => i.id === id);
  if (it) cart.setQty(id, it.qty + 1);
}
function dec(id: number) {
  const it = cart.items.find(i => i.id === id);
  if (it) cart.setQty(id, it.qty - 1);
}
function remove(id: number) {
  cart.remove(id);
}
function clear() {
  cart.clear();
}
</script>