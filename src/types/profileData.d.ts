export interface ProfileEditableData {
    name: string
    phone: string
}

export interface ProfileData extends ProfileEditableData{
 email:string
}

export interface CreateProfileData {
    name: string
    phone: string
    email:string
    password:string
    message?:string | null
}