import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import type { Likes, ResponseLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import type { ResponseMyInfoDto } from "../../types/auth";


function usePostLike() {
    return useMutation({
        mutationFn: postLike,
        // onMutate -> API 요청 이전에 호출되는 친구
        // UI에 바로 변경을 보여주기 위해 Cache 업데이트
        onMutate: async (lp) => {
            // 1. 이 게시글에 관련된 쿼리를 취소(캐시된 데이터를 새로 불러오는 요청)
            await queryClient.cancelQueries({
                queryKey: [QUERY_KEY.lps, lp.lpId],
            });

            // 2. 현재 게시글의 데이터를 캐시에서 가져와야 함.
            const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
                QUERY_KEY.lps,
                lp.lpId,
            ]);

            const newLpPost = { ...previousLpPost };

            const me = queryClient.getQueryData<ResponseMyInfoDto>([
                QUERY_KEY.myInfo,
            ]);
            const userId = Number(me?.data.id);

            const likedIndex =
                previousLpPost?.data.likes.findIndex(
                    (like) => like.userId === userId,
                ) ?? -1;

            if (likedIndex >= 0) {
                previousLpPost?.data.likes.splice(likedIndex, 1);
            } else {
                const newLike = { userId, lpId: lp.lpId } as Likes;
                previousLpPost?.data.likes.push(newLike);
            }

            queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

            return { previousLpPost, newLpPost };
        },

        onError: (err, newLp, context) => {
            console.log(err.newLp);
            queryClient.setQueryData(
                [QUERY_KEY.lps, newLp.lpId],
                context?.previousLpPost?.data.id,
            );
        },

        onSettled: async (data, error, variables, context) => {
            await queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps, variables.lpId],
            });
        },

    });
}

export default usePostLike;