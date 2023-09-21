interface User {
    //    private _id: number
    id: number;
    email: string;
    password: string;
    name: string;
    role: "customer" | "admin";
    avatar: string;
}

export default User;
