<template>
  <div
    v-if="message"
    :class="[
      'rounded-md border px-3 py-2 text-sm',
      variant === 'error' ? 'border-rose-300 bg-rose-50 text-rose-700'
                          : 'border-emerald-300 bg-emerald-50 text-emerald-700'
    ]"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string;
  variant?: "error" | "success";
}>(), {
  message: "",
  variant: "error",
});
</script>
