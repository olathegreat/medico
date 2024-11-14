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