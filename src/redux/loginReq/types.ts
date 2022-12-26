export type UserLoginRequestPayload = {
    // login:{
        email: string;
        password: string
    // }
}
export type UserLoginSuccessPayload = {
        id: string,
        createdAt: string,
        updatedAt: string | null,
        deletedAt: string | null,
        fullName: {
            firstName: string,
            lastName: string
        },
        phone: number,
        email: string,
        gender: string | null,
        avatarPath: string | null,
        avatarThumbnailPath: string | null,
        isActive: boolean,
        status: boolean | null,
    accessToken: string,
    loading: boolean
}