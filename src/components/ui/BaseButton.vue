<template>
    <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center px-4 py-2 rounded-md font-medium cursor-pointer
           bg-rose-600 text-white hover:bg-rose-700 focus:outline-none
           focus-visible:ring-2 focus-visible:ring-rose-300 disabled:opacity-50"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}>(), {
  type: "button",
  disabled: false,
});
</script>
