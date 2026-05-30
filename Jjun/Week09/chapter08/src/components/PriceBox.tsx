import { useCartInfo } from "../hooks/useCartStore"; // 파일명에 맞게 경로를 수정하세요
import { useModalStore } from "../hooks/useModalStore";

const PriceBox = () => {
    // Zustand 스토어에서 total 값을 가져옵니다.
    const { total } = useCartInfo();
    // 모달 스토어에서 openModal 함수를 가져옵니다.
    const openModal = useModalStore((state) => state.openModal);

    const handleInitializeCart = () => {
        openModal(); // 바로 비우지 않고 모달을 엽니다!
    };

    return (
        <div className='p-12 flex justify-between'>
            <button
                onClick={handleInitializeCart}
                className='border p-4 rounded-md cursor-pointer'>
                장바구니 초기화
            </button>
            <div>총 가격: {total} 원</div>
        </div>
    );
};

export default PriceBox;