import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Product } from "@/lib/types/product";

interface ProductState {
    items: Product[];
    categories: string[];
    loading: boolean;
    error: string;
    current: Product | null;
}

export const useProductStore = defineStore("products", {
    state: (): ProductState => ({
        items: [],
        categories: [],
        loading: false,
        error: '',
        current: null,
    }),

    getters: {
        isEmpty: (s) => !s.loading && !s.error && s.items.length === 0,
    },

    actions: {
        async fetchProducts() {
            this.loading = true;
            this.error = "";

            try {
                const { data } = await api.get<Product[]>("/products");
                this.items = data;
            } catch (err: any) {
                this.error = "Failed to load products";
                console.error(err);
                this.items = [];
            } finally {
                this.loading = false;
            }
        },

        async fetchCategories() {
            try {
                const { data } = await api.get<string[]>("/products/categories");
                this.categories = data;
            } catch (err: any) {
                this.categories = [];
            }
        },

        async fetchProductById(id: string | number) {
            this.loading = true;
            this.error = "";
            this.current = null;

            try {
                const { data } = await api.get<Product>(`/products/${id}`);
                this.current = data;
            } catch (err: any) {
                this.error = 'Failed to load product';
                console.error(err);
            } finally {
                this.loading = false;
            }
        }
    }
})