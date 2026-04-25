import { create } from "zustand";
import api from "../api/axios";

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('auth_token') || null,
    isAuthenticated: !!localStorage.getItem('auth_token'),
    isLoading: false,
    error: null,

    login: async (email,password) => {
        set({isLoading: true, error: null});
        try { 
            const response = await api.post('/login',{email,password});
            const {user,token} = response.data;

            localStorage.setItem('auth_token', token);
            localStorage.setItem('user',JSON.stringify(user));

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
                error: null
            });

            return true; 
        }catch(error) {
            set({ 
                error: error.response?.data?.errors?.email?.[0] || error.response?.data?.message || 'فشل تسجيل الدخول، تأكد من البيانات.', 
                isLoading: false 
            });
            return false;
        }
    },

    logout: async () => {
        try{
            await api.post('/logout')
        }catch(error) {
            console.error('Logout error:', error);
        }finally {
            localStorage.removeItem('user');
            localStorage.removeItem('auth_token');
            
            set({
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                error: null
            });
        }
    }
}))


export default useAuthStore;