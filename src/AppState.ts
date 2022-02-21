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
	type: RankingType.HOT,
}

export type NewRanking = {
	type: RankingType.NEW,
}

export type TopRanking = {
	type: RankingType.TOP,
	time: TopTime,
}

export type Ranking = HotRanking | NewRanking | TopRanking;

export enum CommentRanking {
	BEST = 'Best',
	TOP = 'Top',
	NEW = 'New',
}

export type ViewConfig = {
	subreddit: string,
	ranking: Ranking,
	commentRanking: CommentRanking,
}

export type AppState = {
	viewConfig: ViewConfig,
	post: PostJson | null,
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

export const AppStateContext = React.createContext(defaultAppState);
