import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions;
}

export const useCartStore = create<CartState>()(
    immer((set, _): { cartItems: CartItems; amount: number; total: number; actions: CartActions } => ({
        cartItems: cartItems,
        amount: 0,
        total: 0,
        actions: {
            increase: (id: string): void => {
                set((state) => {
                    const cartItem = state.cartItems.find((item): boolean => item.id === id);

                    if (cartItem) {
                        cartItem.amount += 1;
                    }
                });
            },
            decrease: (id: string) => {
                set((state) => {
                    const cartItem = state.cartItems.find((item) => item.id === id);

                    if (cartItem && cartItem.amount > 0) {
                        cartItem.amount -= 1;
                    }
                });
            },
            removeItem: (id: string) => {
                set((state) => {
                    state.cartItems = state.cartItems.filter((item) => item.id !== id);
                });
            },
            clearCart: () => {
                set((state) => {
                    state.cartItems = [];
                });
            },
            calculateTotals: () => {
                set((state) => {
                    let amount = 0;
                    let total = 0;

                    state.cartItems.forEach((item) => {
                        amount += item.amount;
                        total += item.amount * item.price;
                    });

                    state.amount = amount;
                    state.total = total;
                });
            },
        },
    }))
);

export const useCartInfo = (): { cartItems: CartItems; amount: number; total: number } => 
    useCartStore(
        useShallow((state: { cartItems: any; amount: any; total: any; }): 
        { cartItems: CartItems; amount: number; total: number } => ({
            cartItems: state.cartItems,
            amount: state.amount,
            total: state.total,
        }))
    );

export const useCartActions = (): CartActions => useCartStore((state)
: CartActions => state.actions);