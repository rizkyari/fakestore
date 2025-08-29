<template>
    <section class="min-h-[60vh] flex items-center justify-center">
        <div class="text-center max-w-lg">
            <div class="text-7xl mb-3 flex items-center justify-center">
                <img :src="Corrupted" class="w-50"/>
            </div>
            <h1 class="text-3xl font-semibold mb-2">{{ t('notFound.title') }}</h1>
            <p class="text-gray-600 mb-6">{{ t('notFound.desc') }}</p>

            <div class="flex gap-3 justify-center">
                <BaseButton @click="goHome">{{ t('notFound.backToProducts') }}</BaseButton>
                <RouterLink
                to="/cart"
                class="px-4 py-2 rounded-md border text-sm hover:bg-gray-50"
                >
                    {{ t('nav.cart') }}
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

import Corrupted from "@/assets/icons/corrupted.svg";
import BaseButton from "@/components/ui/BaseButton.vue";

const router = useRouter();
const { t } = useI18n();

function goHome() {
    router.push("/products");
}
</script>