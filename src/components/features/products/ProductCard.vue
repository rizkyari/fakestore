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
    </article>
</template>

<script setup lang="ts">
import type { Product } from '@/lib/types/product';
import Star from "@/assets/icons/star.svg"

defineProps<{
    product: Product;
}>();
</script>