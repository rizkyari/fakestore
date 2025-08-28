import { defineStore } from "pinia";
import api from "@/utils/api";
import type { AuthToken } from "@/lib/types/user";

interface AuthState {
    token: string;
    userId: number | null;
    loading: boolean;
    error: string;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        token: localStorage.getItem("token") || "",
        userId: null,
        loading: false,
        error: "",
    }),
    getters: {
        isAuthenticated: (s) => !!s.token,
    },
    actions: {
        async login(username: string, password: string): Promise<string> {
            this.loading = true; this.error = "";
            try {
                const { data } = await api.post<AuthToken>("/auth/login", { username, password });
                const token = data?.token;
                if (!token) throw new Error("No token returned");
                this.token = token;
                localStorage.setItem("token", token);
                return token;
            } catch (e: any) {
                this.error = "Login failed";
                throw e;
            } finally {
                this.loading = false;
            }
        },

        logout(): void {
            this.token = "";
            this.userId = null;
            localStorage.removeItem("token");
        },
    },
});