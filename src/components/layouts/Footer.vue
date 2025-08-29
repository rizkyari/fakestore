<template>
    <footer class="bg-white border-t">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex flex-col md:flex-row items-center justify-between gap-4">
                <p class="text-sm text-gray-500">
                    &copy; {{ year }} Fakestore Demo. {{ t('copyright.desc') }}
                </p>

                <div class="flex items-center gap-6 text-sm">
                    <RouterLink to="/products" class="text-gray-500 hover:text-rose-600 transition-colors">
                        {{ t('nav.products') }}
                    </RouterLink>
                    <RouterLink to="/cart" class="text-gray-500 hover:text-rose-600 transition-colors">
                        {{ t('nav.cart') }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const year = new Date().getFullYear()
</script>