import {User } from "./user"

export interface UserContextInterface{
    getUser: () => User,
    setUser: (id: number, username: string) => void,
    removeUser: () => void,
    isAuthenticated: () => boolean
}