export type User = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type Reviews = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};

export type Review = {
comment: string;
ratingData: number;
};

