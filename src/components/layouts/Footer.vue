<template>
    <footer class="bg-gray-100 border-t py-4 text-center text-sm text-gray-600">
        {{ t('copyright.copyright') }} &copy; {{ year }} Fakestore Demo {{ t('copyright.desc') }}
    </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
const year = new Date().getFullYear()
</script>