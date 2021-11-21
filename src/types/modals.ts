export interface AuthUserDataType {
    name?: string
    email: string
    password: string
}

export interface UserType {
    name?: String
    email: String
    password: String
    finances: Finance[]
    createdAt: String
} 

export interface UserNoSecretData {
    name?: String
}

export interface Finance {
    user: UserType
    userId: string
    currentMoney: Number
    outgoing: Number
    rent: Number
}