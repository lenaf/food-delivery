export interface IRestaurant {
    id: string;
    ownerId: string;
    name: string;
    description: string;
    profilePhotoUrl: string;
    photos: {url: string, text: string}[];
    averageScore: number;
    numberOfReviews: number;
}

export interface IRestaurantInput {
    ownerId?: string;
    name?: string;
    description?: string;
    profilePhotoUrl?: string;
}