import { defineStore } from "pinia";
import type { CartItem } from "@/lib/types/cart";

const LS_KEY = "cart:v1";

interface CartState {
    items: CartItem[];
}

function load(): CartItem[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch (err: any) {
        return [];
    }
}

function save(items: CartItem[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(items));
}

export const useCartStore = defineStore("cart", {
    state: (): CartState => ({
        items: load(),
    }),

    getters: {
        count: (s) => s.items.reduce((acc, it) => acc + it.qty, 0),
        total: (s) => s.items.reduce((acc, it) => acc + it.price * it.qty, 0),
        isEmpty: (s) => s.items.length === 0,
    },

    actions: {
        add(item: Omit<CartItem, "qty">, qty = 1) {
            const existing = this.items.find(i => i.id === item.id);
            if (existing) existing.qty += qty;
            else this.items.push({ ...item, qty });
            save(this.items);
        },
        remove(id: number) {
            this.items = this.items.filter(i => i.id !== id);
            save(this.items);
        },
        setQty(id: number, qty: number) {
            if (qty <= 0) return this.remove(id);
            const it = this.items.find(i => i.id === id);
            if (it) {
                it.qty = qty;
                save(this.items);
            }
        },
        clear() {
            this.items = [];
            save(this.items);
        },
    },
})