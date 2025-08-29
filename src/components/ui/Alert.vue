<template>
  <div
    v-if="visible"
    :class="[
      'rounded-md border px-3 py-2 text-sm',
      variant === 'success' && 'bg-emerald-50 border-emerald-200 text-emerald-800',
      variant === 'error' && 'bg-rose-50 border-rose-200 text-rose-800',
      variant === 'info' && 'bg-sky-50 border-sky-200 text-sky-800',
    ]"
  >
    {{ message }}
  </div>  
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue";

const props = withDefaults(defineProps<{
  message?: string;
  variant?: "error" | "success" | "info";
  timeout?: number;
}>(), {
  message: "",
  variant: "error",
  timeout: 0,
});

const visible = ref(true);
let timer: number | undefined;

function startTimer() {
  if (timer) clearTimeout(timer);
  if (props.timeout && props.timeout > 0) {
    timer = window.setTimeout(() => { visible.value = false; }, props.timeout);
  }
}

watch(() => props.message, (val) => {
  visible.value = !!val;
  if (val) startTimer();
}, { immediate: true });

onBeforeUnmount(() => { if (timer) clearTimeout(timer); });
</script>
