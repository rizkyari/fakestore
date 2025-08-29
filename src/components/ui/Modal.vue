<template>
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
                <div class="absolute inset-0 bg-black/40" @click="closeOnBackdrop && emit('cancel')" />
                <div
                class="relative z-10 w-full max-w-md rounded-xl bg-white p-5 shadow-xl"
                role="dialog" aria-modal="true"
                >
                    <h3 v-if="title" class="text-lg font-semibold mb-2">{{ title }}</h3>

                    <div class="text-sm text-gray-700">
                        <slot>
                            <p v-if="message">{{ message }}</p>
                        </slot>
                    </div>

                    <div class="mt-5 flex justify-end gap-2">
                        <button
                        v-if="!hideCancel"
                        class="cursor-pointer px-4 py-2 rounded-md border text-sm hover:bg-gray-50"
                        @click="emit('cancel')"
                        >
                            {{ cancelText }}
                        </button>
                        <button
                        class="cursor-pointer px-4 py-2 rounded-md bg-rose-600 text-white text-sm hover:bg-rose-700"
                        @click="emit('confirm')"
                        >
                            {{ confirmText }}
                        </button>
                    </div>

                    <button class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 cursor-pointer" @click="emit('cancel')">X</button>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted, onBeforeUnmount } from "vue";

const props = withDefaults(defineProps<{
    open: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    hideCancel?: boolean;
    closeOnBackdrop?: boolean;
}>(), {
    confirmText: "OK",
    cancelText: "Cancel",
    hideCancel: false,
    closeOnBackdrop: true,
});

const emit = defineEmits<{
    (e: "confirm"): void;
    (e: "cancel"): void;
}>();

function onKey(e: KeyboardEvent) {
    if (e.key === "Escape" && props.open) emit("cancel");
}

watch(() => props.open, (o) => {
    if (o) document.addEventListener("keydown", onKey);
    else document.removeEventListener("keydown", onKey);
}, { immediate: true });

onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<style scoped>
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
</style>
