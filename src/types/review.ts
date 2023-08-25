import { Host } from './host';

export type Review = {
        id: string;
        date: string;
        user: Host;
        comment: string;
        rating: number;
};

export type RequestComment = {
    comment: string;
    ratingData: number;
}
