<template>
    <article class="bg-whie rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition">
        <RouterLink :to="`/product/${product.id}`" class="block">
            <div class="aspect-[4/3] bg-gray-50 flex items-center justify-center">
                <img :src="product.image" :alt="product.title" class="h-40 object-contain" loading="lazy"/>
            </div>
            <div class="p-4 space-y-2">
                <h3 class="text-sm font-medium line-clamp-2">{{ product.title }}</h3>
                <div class="flex items-center justify-between">
                    <p class="text-lg font-semibold">$ {{ product.price.toFixed(2) }}</p>
                    <p v-if="product.rating" class="flex items-center text-xs text-gray-500">
                        <img :src="Star" class="h-4 w-4 mr-1"/> {{ product.rating.rate }}/5 ({{ product.rating.count }})
                    </p>
                </div>
            </div>
        </RouterLink>

        <div class="p-4 pt-0 text-center">
            <BaseButton class="p-2 rounded bg-blue-500 cursor-pointer hover:bg-blue-400 text-white" @click.stop.prevent="addToCart">
                {{ t('common.addToCart') }} <img :src="Cart" class="h-5 w-5 text-white ml-2"/>
            </BaseButton>
            <Alert 
            :message="alertMessage"
            variant="success"
            :timeout="2000"
            class="mt-2" />
        </div>
    </article>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import type { Product } from '@/lib/types/product';
import { useCartStore } from '@/stores/cart';
import { useI18n } from 'vue-i18n';

import Star from "@/assets/icons/star.svg";
import BaseButton from "@/components/ui/BaseButton.vue";
import Alert from "@/components/ui/Alert.vue";
import Cart from "@/assets/icons/cart.svg";

const props = defineProps<{
    product: Product;
}>();

const { t } = useI18n()
const cart = useCartStore();
const alertMessage = ref("");

async function showAlert(msg: string) {
  alertMessage.value = "";
  await nextTick();
  alertMessage.value = msg;
}

function addToCart() {
    cart.add({
        id: props.product.id,
        title: props.product.title,
        price: props.product.price,
        image: props.product.image,
    }, 1);

    showAlert(t('common.added'));
}
</script>