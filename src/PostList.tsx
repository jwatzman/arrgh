import React from 'react';

import {
	AppStateContext,
	Ranking,
	RankingType,
	TopTime,
	ViewConfig,
} from './AppState';
import PostListItem from './PostListItem';
import {PostJson, PostListJson} from './ResultJson';
import {useFetchCachedUrl} from './useFetchCachedUrl';

import Styles from './PostList.module.css';

type Props = {
	onClickPost: (s: PostJson) => void,
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

export default function PostList({onClickPost}: Props) {
	const appState = React.useContext(AppStateContext);
	const url = getRedditJsonUrl(appState.viewConfig);
	const postList = useFetchCachedUrl<PostListJson>(url);

	if (url === null) {
		return null;
	}

	if (appState.post !== null) {
		return null;
	}

	if (postList === null) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h1>/r/{appState.viewConfig.subreddit}</h1>
			<ol className={Styles.list}>
				{postList.data.children.map(
					d => <PostListItem
						key={d.data.id}
						post={d.data}
						onClick={e => {
							e.preventDefault();
							onClickPost(d.data);
						}}
					/>
				)}
			</ol>
		</>
	);
}
