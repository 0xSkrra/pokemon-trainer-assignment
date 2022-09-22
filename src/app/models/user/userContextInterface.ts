import {User } from "./user.model"

export interface UserContextInterface{
    getUser: () => User,
    setUser: (id: number, username: string) => void,
    removeUser: () => void,
    isAuthenticated: () => boolean
}