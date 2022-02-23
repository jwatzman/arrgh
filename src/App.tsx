import React from 'react';

import {AppStateContext} from './AppState';
import Nav from './Nav';
import Post from './Post';
import PostList from './PostList';
import {PostJson} from './ResultJson';
import {appStateFromUrl} from './urlAppState';
import {URLCache} from './useFetchCachedUrl';

import Styles from './App.module.css';

export default function App() {
	const defaultAppState = appStateFromUrl();

	// TODO: save to URL
	const [viewConfig, setViewConfig] = React.useState(defaultAppState.viewConfig);
	const [post, setPost] = React.useState<PostJson|null>(null);

	return (
		<URLCache>
			<AppStateContext.Provider value={{viewConfig, post}}>
				<div className={Styles.main}>
					<Nav
						onClosePost={e => {
							e.preventDefault();
							setPost(null);
						}}
						setViewConfig={setViewConfig}
					/>
					<hr />
					<PostList onClickPost={setPost} />
					<Post />
				</div>
			</AppStateContext.Provider>
		</URLCache>
	);
}
