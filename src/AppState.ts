import React from 'react';

import {PostJson} from './ResultJson';

export enum TopTime {
	HOUR = 'Hour',
	DAY = 'Day',
	WEEK = 'Week',
	MONTH = 'Month',
	YEAR = 'Year',
	ALL = 'All',
}

export enum RankingType {
	HOT = 'Hot',
	NEW = 'New',
	TOP = 'Top',
}

export type HotRanking = {
	readonly type: RankingType.HOT,
}

export type NewRanking = {
	readonly type: RankingType.NEW,
}

export type TopRanking = {
	readonly type: RankingType.TOP,
	readonly time: TopTime,
}

export type Ranking = HotRanking | NewRanking | TopRanking;

export enum CommentRanking {
	BEST = 'Best',
	TOP = 'Top',
	NEW = 'New',
}

export type ViewConfig = {
	readonly subreddit: string,
	readonly ranking: Ranking,
	readonly commentRanking: CommentRanking,
}

type UnloadedPost = {
	readonly id: string,
	readonly loaded: false,
};

type LoadedPost = PostJson & {
	readonly loaded: true,
};

export type MaybeLoadedPost = UnloadedPost | LoadedPost;

export type AppState = {
	readonly viewConfig: ViewConfig,
	readonly post: MaybeLoadedPost | null,
}

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
