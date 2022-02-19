import React from 'react';

import Nav from './Nav';
import PostList from './PostList';
import {RankingType, CommentRanking, ViewConfig} from './ViewConfig';

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

  return (
		<div>
			<Nav initViewConfig={initViewConfig} setViewConfig={setViewConfig} />
			<hr />
			<PostList viewConfig={viewConfig} />
		</div>
  );
}
