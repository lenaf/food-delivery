import { IUser } from "./user";

export interface IReview {
    id: string;
    restaurantId: string;
    reviewerId: string;
    reviewer: IUser;
    text: string;
    score: number;
}

export interface IRestaurantInput {
    ownerId?: string;
    name?: string;
    description?: string;
    
}