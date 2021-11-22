export interface IUserRequest { 
    companyName: string,
    firstAndLastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string,
}

export interface IUserResponse {
    id: number | string;
    companyName: string,
    firstAndLastName: string,
    phoneNumber: string,
    email: string,
    password: string,
    confirmPassword: string,
}