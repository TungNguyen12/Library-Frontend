export interface IFormInput {
    email: string;
    password: string;
    name: string;
    role: "customer" | "admin";
    avatar: string;
}

interface User extends IFormInput {
    id: number;
}

export default User;
