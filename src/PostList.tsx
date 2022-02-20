import React from 'react';

import {
	AppState,
	Ranking,
	RankingType,
	TopTime,
	ViewConfig,
} from './AppState';
import useFetchCachedUrl from './useFetchCachedUrl';

type PostListJson = {
	data: {
		children: {
			data: {
				created: number,
				id: string,
				selftext: string,
				stickied: boolean,
				title: string,
				ups: number,
			},
		}[],
	},
};

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
	if (viewConfig.subreddit === '') {
		return null;
	}

	return 'https://www.reddit.com/r/'
		+ viewConfig.subreddit
		+ getRankingUrlComponent(viewConfig.ranking);
}

export default function PostList({appState, setPost}: Props) {
	const url = getRedditJsonUrl(appState.viewConfig);
	const postList = useFetchCachedUrl<PostListJson>(url);

	if (url === null) {
		return null;
	}

	if (postList === null) {
		return <div>Loading...</div>;
	}

	return (
		<ol>
			{postList.data.children.map(
				d => <li key={d.data.id}>{d.data.ups} - {d.data.title}</li>
			)}
		</ol>
	);
}
