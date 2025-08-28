import { createI18n } from "vue-i18n";
import en from './en.json';
import id from './id.json';

type Locale = 'en' | 'id'

function detectDefaultLocale():Locale {
    const saved = localStorage.getItem('item') as Locale | null
    if( saved === 'en' || saved === 'id') return saved

    return navigator.language.toLowerCase().startsWith('id') ? 'id' : 'en'
}

export const i18n = createI18n({
    legacy: false,
    locale: detectDefaultLocale(),
    fallbackLocale: 'en',
    messages: { en,id }
})

export function setLocale(locale: Locale) {
    i18n.global.locale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
}

document.documentElement.lang = (i18n.global.locale.value as string)