import { IUser } from "./user";

export interface IReview {
    id: string;
    restaurantId: string;
    reviewerId: string;
    reviewer: IUser;
    text: string;
    score: number;
    date: string;
    reply?: string;
}

export interface IReviewInput {
    restaurantId: string;
    reviewerId: string;
    reviewer?: IUser;
    text?: string;
    score?: number;
    date?: string;
}