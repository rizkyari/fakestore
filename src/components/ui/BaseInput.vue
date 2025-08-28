<template>
    <div>
        <label :for="id" class="block text-sm text-gray-700 mb-1">{{ label }}</label>
        <div class="relative">
            <input
            :id="id"
            :type="computedType"
            :value="modelValue"
            :placeholder="placeholder"
            :autocomplete="autocomplete"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="w-full rounded-md border border-gray-300 px-3 py-2 pr-10
               focus:outline-none focus:ring-2 focus:ring-rose-200"
            :aria-invalid="!!error || undefined"
            :aria-describedby="error ? `${id}-error` : undefined"
            />

            <button
            v-if="type === 'password'"
            type="button"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            @click="show = !show"
            tabindex="-1"
            >
                <img v-if="show" :src="Eye" class="h-5 w-5 cursor-pointer"/>
                <img v-else :src="EyeShlash" class="h-5 w-5 cursor-pointer"/>
            </button>
        </div>

        <p v-if="hint && !error" class="text-xs text-gray-500 mt-1">{{ hint }}</p>
        <p v-if="error" :id="`${id}-error`" class="text-xs text-rose-600 mt-1">{{ error }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Eye from "@/assets/icons/eye.svg";
import EyeShlash from "@/assets/icons/eye-slash.svg"

const props = withDefaults(defineProps<{
    id: string;
    label: string;
    modelValue: string | number;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    autocomplete?: string;
    hint?: string;
    error?: string;
}>(), {
    type: "text",
});

defineEmits<{
    (e: "update:modelValue", v: string | number): void;
}>();

const show = ref(false);
const computedType = computed(() =>
  props.type === "password" ? (show.value ? "text" : "password") : props.type
);
</script>
