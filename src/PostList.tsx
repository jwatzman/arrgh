import React from 'react';

import {
	AppState,
	Ranking,
	RankingType,
	TopTime,
	ViewConfig,
} from './AppState';

type Props = {
	appState: AppState,
	setPost: (s: string) => void,
};

function getTopTimeUrlComponent(t: TopTime): string {
	switch (t) {
		case TopTime.HOUR:
			return 'hour';
		case TopTime.DAY:
			return 'day';
		case TopTime.WEEK:
			return 'week';
		case TopTime.MONTH:
			return 'month';
		case TopTime.YEAR:
			return 'year';
		case TopTime.ALL:
			return 'all';
	}
}

function getRankingUrlComponent(r: Ranking): string {
	switch (r.type) {
		case RankingType.HOT:
			return '/hot.json';
		case RankingType.NEW:
			return '/new.json';
		case RankingType.TOP:
			return '/top.json?t=' + getTopTimeUrlComponent(r.time);
	}
}

function getRedditJsonUrl(viewConfig: ViewConfig) {
	return 'https://www.reddit.com/r/'
		+ viewConfig.subreddit
		+ getRankingUrlComponent(viewConfig.ranking);
}

export default function PostList({appState, setPost}: Props) {
	if (appState.viewConfig.subreddit === '') {
		return null;
	}

	const url = getRedditJsonUrl(appState.viewConfig);
	return <div>{url}</div>;
}
