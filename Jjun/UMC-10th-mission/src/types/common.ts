export type CommonResponse<T> = {
    email: ReactNode;
    name: ReactNode;
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};