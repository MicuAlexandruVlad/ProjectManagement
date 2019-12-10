import { WorkExperience } from './WorkExperience'
import { Education } from './Education'
import { Skill } from './Skill'

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
    hasSummary: boolean
    hasWorkExperience: boolean
    hasEducation: boolean
    hasSkills: boolean

    currentPosition: string
    summary: string
    workExperience: Array<WorkExperience>
    education: Array<Education>
    skills: Array<Skill>

    // 0 - email; 1 - phone
    contactMethod: number
}