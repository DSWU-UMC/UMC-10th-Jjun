import { 
    useDispatch as useRawDispatch, 
    useSelector as useRawSelector, 
    type TypedUseSelectorHook 
} from "react-redux";
import type { RootState, AppDispatch } from "../store/store";

// 타입 지원이 적용된 커스텀 useDispatch 훅
export const useDispatch = () => useRawDispatch<AppDispatch>();

// 타입 지원이 적용된 커스텀 useSelector 훅
// 이 설정 덕분에 컴포넌트 내에서 state의 타입을 자동으로 인식하게 됩니다.
export const useSelector: TypedUseSelectorHook<RootState> = useRawSelector;