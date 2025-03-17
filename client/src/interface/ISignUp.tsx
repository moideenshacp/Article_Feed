export interface Isignup{
    preferences?: string[]
    firstName?:string
    lastName?:string
    email?:string
    phone?:string
    dob?:string
    password?:string
    confirmPassword?:string
}

export interface Isignin{
    email:string
    password:string
}