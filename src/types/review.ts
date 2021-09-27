import { IUser } from "./user";

export interface IReview {
    id: string;
    restaurantId: string;
    reviewerId: string;
    reviewer: IUser;
    text: string;
    score: number;
}

export interface IReviewInput {
    restaurantId: string;
    reviewerId: string;
    reviewer?: IUser;
    text?: string;
    score?: number;
}