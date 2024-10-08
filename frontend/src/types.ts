type KaleshFormType = {
    title? : string,
    description? : string,
};

type KaleshFormErrorType = {
    title? : string,
    description? : string,
    expires_at?: string,
    image?: string,
};

type KaleshType = {
    id:number,
    user_id:number,
    title: string,
    description: string,
    image: string,
    created_at: string,
    expire_at: string,
}