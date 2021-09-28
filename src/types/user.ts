export interface IUser {
    id: string;
    email: string;
    name: string;
    profilePhotoUrl: string;
    type: 'Admin' | 'Owner' | 'Regular';
    isRestaurantOwner: boolean;
    isAdmin: boolean;
    isOwner: boolean;
}
