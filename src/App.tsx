import React from 'react';

import Nav from './Nav';
import PostList from './PostList';
import {CommentRanking, RankingType, ViewConfig} from './AppState';

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
	const [post, setPost] = React.useState<string|null>(null);

	const appState = {viewConfig, post};

  return (
		<div>
			<Nav initViewConfig={initViewConfig} setViewConfig={setViewConfig} />
			<hr />
			<PostList appState={appState} setPost={setPost} />
		</div>
  );
}
