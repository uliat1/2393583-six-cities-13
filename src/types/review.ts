import { Host } from './host';

export type Comment = {
    comment: string;
    date: string;
    id: number;
    rating: number;
    user: Host;
  };

export type Comments = Comment[];
