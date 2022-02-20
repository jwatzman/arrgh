import React from 'react';

import {CommentRanking, RankingType, ViewConfig} from './AppState';
import Nav from './Nav';
import Post from './Post';
import PostList from './PostList';
import {PostJson} from './ResultJson';

export default function App() {
	const initViewConfig: ViewConfig = { // TODO: load from URL
		subreddit: '',
		ranking: {
			type: RankingType.HOT,
		},
		commentRanking: CommentRanking.BEST,
	};

	// TODO: save to URL
	const [viewConfig, setViewConfig] = React.useState(initViewConfig);
	const [post, setPost] = React.useState<PostJson|null>(null);

	const appState = {viewConfig, post};

	// Note that we always render both the Post and the PostList, and leave it up
	// to both of them as to when to render a non-empty result or not. This is so
	// we don't unmount/remount those components during navigation, thus
	// resetting all the useState cached data.
	return (
		<div>
			<Nav initViewConfig={initViewConfig} setViewConfig={setViewConfig} />
			<hr />
			<PostList appState={appState} onClickPost={setPost} />
			<Post
				onClickClose={e => {
					e.preventDefault();
					setPost(null);
				}}
				post={post}
			/>
		</div>
	);
}
