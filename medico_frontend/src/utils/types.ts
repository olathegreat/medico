export type UserType = {
    _id?: string | undefined;
    fullname?: string;
    email: string;
    address?: string;
    gender?: "male" | "female" | "other";
    phone?: string;
    birthday?: string;
    picture?: string ;
    password: string;

}

export type DoctorType={
    
        _id?: string | undefined;
        name: string;
        email: string;
        address1?: string;
        address2?: string;
        speciality: string;
        experience?: string;
        degree: string;
        fee:number;
        about:string;
        picture?: string;
        password: string;
        
     
}

export type AdminType={
    _id?: string | undefined;
    name: string;
    email: string;
    address1?: string;
    address2?: string;
    
    about:string;
    picture?: string;
    password: string;
}