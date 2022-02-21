import React from 'react';

import {defaultAppState, AppStateContext} from './AppState';
import Nav from './Nav';
import Post from './Post';
import PostList from './PostList';
import {PostJson} from './ResultJson';

export default function App() {
	// TODO: load, save to URL
	const [viewConfig, setViewConfig] = React.useState(defaultAppState.viewConfig);
	const [post, setPost] = React.useState<PostJson|null>(null);

	// Note that we always render both the Post and the PostList, and leave it up
	// to both of them as to when to render a non-empty result or not. This is so
	// we don't unmount/remount those components during navigation, thus
	// resetting all the useState cached data.
	return (
		<AppStateContext.Provider value={{viewConfig, post}}>
			<div>
				<Nav setViewConfig={setViewConfig} />
				<hr />
				<PostList onClickPost={setPost} />
				<Post
					onClickClose={e => {
						e.preventDefault();
						setPost(null);
					}}
				/>
			</div>
		</AppStateContext.Provider>
	);
}
