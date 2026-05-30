import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
// 프로젝트 구조에 따라 ../../types/cart 또는 적절한 경로로 수정하세요
import type { CartItems } from "../../types/cart";
import cartItems from "../../constants/cartItems";

export interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;
}

const initialState: CartState = {
    cartItems: cartItems,
    amount: 0,
    total: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // 아이템 수량 증가
        increase: (state, action: PayloadAction<{ id: string }>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

            if (item) {
                item.amount += 1;
            }
        },

        // 아이템 수량 감소
        decrease: (state, action: PayloadAction<{ id: string }>) => {
            const itemId = action.payload.id;
            const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

            if (item) {
                item.amount -= 1;
            }
        },

        // 단일 아이템 제거
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const itemId = action.payload.id;
            state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);
        },

        // 장바구니 전체 비우기
        clearCart: (state) => {
            state.cartItems = [];
        },

        // 총 수량 및 총액 계산
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });

            state.amount = amount;
            state.total = total;
        },
    },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;