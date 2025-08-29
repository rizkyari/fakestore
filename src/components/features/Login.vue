<template>
  <section class="max-w-md mx-auto bg-white rounded-xl shadow p-6 mt-12">
    <h1 class="text-2xl font-semibold mb-4">{{ t('auth.login') }}</h1>
    <Alert :message="auth.error" variant="error" class="mb-3" />
    <form @submit.prevent="onSubmit" class="space-y-4">
      <BaseInput
      id="username"
      :label="t('auth.username')"
      :placeholder="t('auth.usernamePlaceholder')"
      v-model="form.username"
      :error="(touched.username || submitted) ? errors.username : ''"
      autocomplete="username"
      @blur="onBlur('username')"
      />

      <BaseInput
      id="password"
      :label="t('auth.password')"
      type="password"
      :placeholder="t('auth.passwordPlaceholder')"
      v-model="form.password"
      :error="(touched.password || submitted) ? errors.password : ''"
      autocomplete="current-password"
      @blur="onBlur('password')"
      />

      <BaseButton type="submit" :disabled="auth.loading" class="w-full">
        <span v-if="!auth.loading">{{ t('auth.login') }}</span>
        <span v-else>{{ t('process.loading') }}.</span>
      </BaseButton>
    </form>

    <p class="text-sm text-gray-600 mt-4">
      Use demo credentials:
      <code class="font-mono">johnd / m38rmF$</code>
    </p>
  </section>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useI18n } from "vue-i18n";
import { validateLogin } from '@/lib/validators';

import BaseInput from '../ui/BaseInput.vue';
import BaseButton from '../ui/BaseButton.vue';
import Alert from '../ui/Alert.vue';

const router = useRouter();
const route = useRoute();
const auth = useAuthStore();
const { t } = useI18n();
const form = reactive({
  username: "",
  password: "",
});

const errors = reactive<{ username?: string; password?: string}>({});
const touched = reactive({ username: false, password: false});
const submitted = ref(false);

onMounted(() => {
  if(auth.isAuthenticated) {
    router.push("/");
  }
});

function runValidation() {
  const e = validateLogin(form.username, form.password);
  errors.username = e.username;
  errors.password = e.password;
}

function onBlur(field: keyof typeof touched) {
  touched[field] = true;
  runValidation();
}

async function onSubmit() {
  submitted.value = true;
  runValidation();
  if (errors.username || errors.password) return;

  try {
    await auth.login(form.username.trim(), form.password);
    const to = (route.query.redirect as string) || "/products";
    router.push(to);
  } catch(e : any) {
    console.error(e);
  }
}
</script>