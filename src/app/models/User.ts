export class User {
    id: string
    photoId: string
    
    username: string
    email: string
    password: string

    firstName: string
    lastName: string
    city: string
    country: string
    phoneNumber: string
    hasPhoto: boolean
    profileComplete: boolean

    // 0 - email; 1 - phone
    contactMethod: number
}