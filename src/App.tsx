import React from 'react';

import {AppStateContext} from './AppState';
import Nav from './Nav';
import Post from './Post';
import PostList from './PostList';
import {PostJson} from './ResultJson';
import {appStateFromUrl, appStateToUrl} from './urlAppState';
import {URLCache} from './useFetchCachedUrl';

import Styles from './App.module.css';

export default function App() {
	const defaultAppState = appStateFromUrl();

	const [navKey, setNavKey] = React.useState(0);
	const [viewConfig, setViewConfig] =
		React.useState(defaultAppState.viewConfig);
	const [post, setPost] = React.useState<PostJson|null>(null);

	const appState = {viewConfig, post};

	const url = appStateToUrl(appState);
	React.useEffect(() => {
		if (url !== window.location.href) {
			window.history.pushState(null, document.title, url);
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

	return (
		<URLCache>
			<AppStateContext.Provider value={appState}>
				<div className={Styles.main}>
					<Nav
						key={navKey}
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
