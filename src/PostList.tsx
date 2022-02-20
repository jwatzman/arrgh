import {Map, Set} from 'immutable';
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
	const url = getRedditJsonUrl(appState.viewConfig);

	const [fetchStarted, setFetchStarted] = React.useState(Set());
	const [postListsJson, setPostListsJson] = React.useState(Map());

	React.useEffect(() => {
		if (appState.viewConfig.subreddit === '') {
			return;
		}

		if (fetchStarted.has(url)) {
			return;
		}

		setFetchStarted(s => s.add(url));
		fetch(url)
			.then(r => r.json())
			.then(j => setPostListsJson(m => m.set(url, j)))
			.catch(e => console.log(e)); // XXX
	}, [appState.viewConfig.subreddit, fetchStarted, url]);

	if (appState.viewConfig.subreddit === '') {
		return null;
	}

	if (!postListsJson.has(url)) {
		return <div>Loading...</div>;
	}

	return (
		<ol>
			{postListsJson.get(url).data.children.map(
				d => <li key={d.data.id}>{d.data.ups} - {d.data.title}</li>
			)}
		</ol>
	);
}
