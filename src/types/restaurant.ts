export interface IRestaurant {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    profilePhotoId: string;
    photos: {id: string, text: string}[];
    averageScore: number;
    numberOfReviews: number;
}

export interface IRestaurantInput {
    ownerId?: string;
    name?: string;
    description?: string;
    profilePhotoId?: string;
}