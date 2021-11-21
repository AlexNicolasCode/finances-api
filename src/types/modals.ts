export interface AuthUserDataType {
    name?: string
    email: string
    password: string
}

export interface UserType {
    name?: string
    email: string
    password: string
    finances?: Finance[]
    createdAt: string
} 

export interface UserNoSecretData {
    name?: string
}

export interface Finance {
    user: UserType
    userId: string
    currentMoney: Number
    outgoing: Number
    rent: Number
}