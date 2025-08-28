<template>
    <header class="bg-white border-b">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-14 items-center justify-between">
                <div class="flex items-center">
                    <RouterLink to="/" class="flex items-center gap-2 font-semibold">
                        <span class="text-lg">Fakestore</span>
                    </RouterLink>
                </div>
                

                <nav class="hidden md:flex items-center gap-6">
                    <div class="flex items-center gap-2 ml-5">
                        <label for="lang" class="text-sm">{{ t('nav.language') }}</label>
                        <select
                        id="lang"
                        class="rounded-xl cursor-pointer border px-2 py-1 text-sm bg-white"
                        :value="locale"
                        @change="onChangeLang"
                        >
                            <option value="en">{{ t('lang.en') }}</option>
                            <option value="id">{{ t('lang.id') }}</option>
                        </select>
                    </div>
                    <RouterLink to="/products" :class="[baseLink, route.path.startsWith('/products') ? activeClass : '']">
                        {{ t('nav.products') }}
                    </RouterLink>
                    <RouterLink to="/cart" :class="[baseLink, route.path.startsWith('/cart') ? activeClass : '']">
                        {{ t('nav.cart') }}
                    </RouterLink>
                    <button
                    v-if="isAuthenticated"
                    @click="onLogout"
                    class="text-sm text-gray-700 hover:text-rose-600"
                    >
                        {{ t('auth.logout') }}
                    </button>
                    <RouterLink
                    v-else
                    v-show="!onLoginPage"
                    to="/login"
                    class="text-sm text-gray-700 hover:text-rose-600"
                    >
                        Login
                    </RouterLink>
                </nav>

                <!-- Right: Mobile burger -->
                <button
                type="button"
                class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-300"
                :aria-expanded="mobileOpen"
                aria-controls="mobile-menu"
                @click="toggleMobile"
                >
                    <span class="sr-only">Open main menu</span>
                    <img v-if="!mobileOpen" :src="Menu" class="h-6 w-6 cursor-pointer"/>
                    <img v-else :src="Close" class="h-6 w-6 cursor-pointer"/>
                </button>
            </div>
        </div>

        <!-- Mobile panel -->
        <div id="mobile-menu" class="md:hidden" v-show="mobileOpen">
            <div class="space-y-1 px-4 pb-4 pt-2 border-t">
                <RouterLink
                to="/products"
                @click="closeMobile"
                :class="[
                    'block rounded px-3 py-2',
                    route.path.startsWith('/products') ? 'bg-rose-50 text-rose-700' : 'hover:bg-gray-100'
                ]"
                >
                    Products
                </RouterLink>

                <RouterLink
                to="/cart"
                @click="closeMobile"
                :class="[
                    'block rounded px-3 py-2',
                    route.path.startsWith('/cart') ? 'bg-rose-50 text-rose-700' : 'hover:bg-gray-100'
                ]"
                >
                    Cart
                </RouterLink>

                <div class="flex items-center gap-2 px-3 py-2">
                    <label for="lang" class="text-sm">{{ t('nav.language') }}</label>
                    <select
                    id="lang"
                    class="rounded-xl cursor-pointer border px-2 py-1 text-sm bg-white"
                    :value="locale"
                    @change="onChangeLang"
                    >
                        <option value="en">{{ t('lang.en') }}</option>
                        <option value="id">{{ t('lang.id') }}</option>
                    </select>
                </div>

                <button
                v-if="isAuthenticated"
                @click="onLogout"
                class="block w-full text-left rounded px-3 py-2 hover:bg-gray-100"
                >
                    Logout
                </button>

                <RouterLink
                v-else
                v-show="!onLoginPage"
                to="/login"
                @click="closeMobile"
                class="block rounded px-3 py-2 hover:bg-gray-100"
                >
                    Login
                </RouterLink>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { setLocale } from '@/i18n';

import Menu from '@/assets/icons/menu.svg';
import Close from '@/assets/icons/close.svg';

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();
const { isAuthenticated } = storeToRefs(auth);
const { t, locale } = useI18n()
const mobileOpen = ref(false);
function toggleMobile() { mobileOpen.value = !mobileOpen.value }
function closeMobile() { mobileOpen.value = false }

function onLogout() {
    auth.logout();
    closeMobile();
    router.push("/login");
}

const activeClass = "text-rose-600 font-medium";
const baseLink = "hover:text-rose-600 transition-colors";
const onLoginPage = computed(() => route.path === "/login");

function onChangeLang(e: Event) {
    const value = (e.target as HTMLSelectElement).value as 'en' | 'id'
    setLocale(value)
}
</script>