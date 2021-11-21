export interface AuthUserDataType {
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

export interface Finance {
    user: UserType
    userId: string
    currentMoney: Number
    outgoing: Number
    rent: Number
}