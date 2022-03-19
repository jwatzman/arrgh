import React from 'react';
import ReactMarkdown from 'react-markdown';

import {AppState, AppStateContext, CommentRanking} from './AppState';
import CommentList from './CommentList';
import {CommentListJson, PostJson} from './ResultJson';
import {useFetchCachedUrl} from './useFetchCachedUrl';

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
		return null;
	}

	return 'https://www.reddit.com/r/'
		+ appState.viewConfig.subreddit
		+ '/comments/'
		+ appState.post.id
		+ '.json?sort='
		+ getCommentRankingUrlComponent(appState.viewConfig.commentRanking);
}

type Props = {
	onLoadPost: (p: PostJson) => void,
};

export default function Post({onLoadPost}: Props) {
	const appState = React.useContext(AppStateContext);
	const url = getRedditJsonUrl(appState);
	const commentList = useFetchCachedUrl<CommentListJson>(url);
	const post = appState.post;

	React.useEffect(() => {
		if (post !== null && !post.loaded && commentList !== null) {
			onLoadPost(commentList[0].data.children[0].data);
		}
	});

	if (post === null) {
		return null;
	}

	const comments = commentList === null
		? <div>Loading comments...</div>
		: <CommentList comments={commentList[1].data.children} />;

	const postBody = post.loaded
		? <>
				<h1>{post.title}</h1>
				<div><ReactMarkdown>{post.selftext}</ReactMarkdown></div>
			</>
		: <div>Loading post...</div>;

	return (
		<div>
			{postBody}
			<hr />
			<h2>Comments</h2>
			{comments}
		</div>
	);
}
