import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import modalReducer from '../features/modal/modalSlice'; // modalSlice의 리듀서를 추가로 가져옵니다.

// 1. 저장소 생성
function createStore() {
    const store = configureStore({
        // 2. 리듀서 설정에 cart와 함께 modal을 추가 등록합니다.
        reducer: {
            cart: cartReducer,
            modal: modalReducer,
        },
    });

    return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 실행해서 스토어를 빼줌
// 싱글톤패턴
const store = createStore();

export default store;

// 이제 RootState에는 { cart: CartState, modal: ModalState }가 정확하게 정의됩니다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;