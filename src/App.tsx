import React from 'react';

import {AppStateContext, MaybeLoadedPost} from './AppState';
import Foot from './Foot';
import Nav from './Nav';
import Post from './Post';
import PostList from './PostList';
import {PostJson} from './ResultJson';
import {appStateFromUrl, appStateToUrl} from './urlAppState';
import {useClearUrlCache, URLCache} from './useFetchCachedUrl';

import Styles from './App.module.css';

function AppImpl() {
	const defaultAppState = appStateFromUrl();

	const [navKey, setNavKey] = React.useState(0);
	const [viewConfig, setViewConfig] =
		React.useState(defaultAppState.viewConfig);
	const [post, setPost] =
		React.useState<MaybeLoadedPost|null>(defaultAppState.post);

	const clearUrlCache = useClearUrlCache();

	const appState = {viewConfig, post};

	const url = appStateToUrl(appState);
	React.useEffect(() => {
		if (url !== window.location.href) {
			window.history.pushState(null, '', url);
		}
	}, [url]);

	React.useEffect(() => {
		window.onpopstate = () => {
			const {viewConfig, post} = appStateFromUrl();
			setViewConfig(viewConfig);
			setPost(post);
			setNavKey(n => n+1); // Hack to force-reset Nav's hook state.
		};
	}, []);

	React.useEffect(() => {
		if (viewConfig.subreddit === '') {
			document.title = 'Arrgh';
		} else {
			document.title = 'Arrgh - /r/' + viewConfig.subreddit;
		}
	}, [viewConfig.subreddit]);

	const setLoadedPost = (p: PostJson) => setPost({...p, loaded: true});
	return (
		<AppStateContext.Provider value={appState}>
			<div className={Styles.main}>
				<Nav
					key={navKey}
					onClosePost={e => {
						e.preventDefault();
						setPost(null);
					}}
					onRefresh={e => {
						e.preventDefault();
						if (post !== null) {
							setPost({
								loaded: false,
								id: post.id,
							});
						}
						clearUrlCache();
					}}
					setViewConfig={setViewConfig}
				/>
				<hr />
				<PostList
					onClickPost={setLoadedPost}
				/>
				<Post
					onLoadPost={setLoadedPost}
				/>
				<Foot />
			</div>
		</AppStateContext.Provider>
	);
}

export default function App() {
	return (
		<URLCache>
			<AppImpl />
		</URLCache>
	);
}
