import React from 'react';

import {AppState, AppStateContext, CommentRanking} from './AppState';
import CommentList from './CommentList';
import {CommentListJson} from './ResultJson';
import useFetchCachedUrl from './useFetchCachedUrl';

function getCommentRankingUrlComponent(r: CommentRanking): string {
	switch (r) {
		case CommentRanking.BEST:
			return 'confidence';
		case CommentRanking.NEW:
			return 'new';
		case CommentRanking.TOP:
			return 'top';
	}
}

function getRedditJsonUrl(appState: AppState) {
	if (appState.viewConfig.subreddit === '' || appState.post === null) {
		// This shouldn't be able to happen?
		return null;
	}

	return 'https://www.reddit.com/r/'
		+ appState.viewConfig.subreddit
		+ '/'
		+ appState.post.id
		+ '.json?sort='
		+ getCommentRankingUrlComponent(appState.viewConfig.commentRanking);
}

export default function Comments() {
	const appState = React.useContext(AppStateContext);
	const url = getRedditJsonUrl(appState);
	const commentList = useFetchCachedUrl<CommentListJson>(url);

	if (url === null) {
		// This shouldn't be able to happen?
		return null;
	}

	if (commentList === null) {
		return <div>Loading comments...</div>;
	}

	return <CommentList
		comments={commentList[1].data.children.map(c => c.data)}
	/>;
}
