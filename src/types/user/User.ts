export interface IFormInput {
    email: string;
    password: string;
    name: string;
    role: "customer" | "admin";
    avatar: string;
}

interface User extends IFormInput {
    _id: number;
}

export default User;
