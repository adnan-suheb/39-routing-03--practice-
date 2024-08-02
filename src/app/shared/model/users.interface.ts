export interface Iuser {
    userName: string;
    userId: string;
    personImg: string;
    userDetails: string;
    userRole: "admin" | "buyer";
    userGender: 'Male' | 'Female';
    userAge: number;
    userAddress: string;
    userEmail: string;
}

export type userRole = "admin" | "buyer";