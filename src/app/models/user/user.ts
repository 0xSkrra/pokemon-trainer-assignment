export interface User {
    id: number,
    username: string,
    isAuthenticated: boolean
}

export const defaultUser: User ={
    id: -1,
    username: "",
    isAuthenticated: false
}
