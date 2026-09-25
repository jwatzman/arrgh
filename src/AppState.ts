import React from 'react';

import type { PostJson } from '#arrgh/ResultJson';

export const TopTime = {
	HOUR: 'Hour',
	DAY: 'Day',
	WEEK: 'Week',
	MONTH: 'Month',
	YEAR: 'Year',
	ALL: 'All',
} as const;
export type TopTime = (typeof TopTime)[keyof typeof TopTime];

export const RankingType = {
	HOT: 'Hot',
	NEW: 'New',
	TOP: 'Top',
} as const;
export type RankingType = (typeof RankingType)[keyof typeof RankingType];

export type HotRanking = {
	readonly type: typeof RankingType.HOT;
};

export type NewRanking = {
	readonly type: typeof RankingType.NEW;
};

export type TopRanking = {
	readonly type: typeof RankingType.TOP;
	readonly time: TopTime;
};

export type Ranking = HotRanking | NewRanking | TopRanking;

export const CommentRanking = {
	BEST: 'Best',
	TOP: 'Top',
	NEW: 'New',
} as const;
export type CommentRanking =
	(typeof CommentRanking)[keyof typeof CommentRanking];

export type ViewConfig = {
	readonly subreddit: string;
	readonly ranking: Ranking;
	readonly commentRanking: CommentRanking;
};

type UnloadedPost = {
	readonly id: string;
	readonly loaded: false;
};

type LoadedPost = PostJson & {
	readonly loaded: true;
};

export type MaybeLoadedPost = UnloadedPost | LoadedPost;

export type AppState = {
	readonly viewConfig: ViewConfig;
	readonly post: MaybeLoadedPost | null;
};

export const defaultAppState: AppState = {
	viewConfig: {
		subreddit: '',
		ranking: {
			type: RankingType.HOT,
		},
		commentRanking: CommentRanking.BEST,
	},
	post: null,
};

export const defaultTopTime = TopTime.DAY;

export const AppStateContext = React.createContext(defaultAppState);
