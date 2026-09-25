import { css } from '@emotion/css';
import React from 'react';

import type { MaybeLoadedPost } from '#arrgh/AppState';
import { AppStateContext } from '#arrgh/AppState';
import Foot from '#arrgh/Foot';
import Nav from '#arrgh/Nav';
import Post from '#arrgh/Post';
import PostList from '#arrgh/PostList';
import type { PostJson } from '#arrgh/ResultJson';
import { appStateFromUrl, appStateToUrl } from '#arrgh/urlAppState';
import { URLCache, useClearUrlCache } from '#arrgh/useFetchCachedUrl';

function AppImpl() {
	const defaultAppState = appStateFromUrl();

	const [navKey, setNavKey] = React.useState(0);
	const [viewConfig, setViewConfig] = React.useState(
		defaultAppState.viewConfig,
	);
	const [post, setPost] = React.useState<MaybeLoadedPost | null>(
		defaultAppState.post,
	);

	const clearUrlCache = useClearUrlCache();

	const appState = { viewConfig, post };

	const url = appStateToUrl(appState);
	React.useEffect(() => {
		if (url !== window.location.href) {
			window.history.pushState(null, '', url);
		}
	}, [url]);

	React.useEffect(() => {
		window.onpopstate = () => {
			const { viewConfig: newViewConfig, post: newPost } = appStateFromUrl();
			setViewConfig(newViewConfig);
			setPost(newPost);
			setNavKey((n) => n + 1); // Hack to force-reset Nav's hook state.
		};
	}, []);

	React.useEffect(() => {
		if (viewConfig.subreddit === '') {
			document.title = 'Arrgh';
		} else {
			document.title = 'Arrgh - /r/' + viewConfig.subreddit;
		}
	}, [viewConfig.subreddit]);

	const setLoadedPost = (p: PostJson) => setPost({ ...p, loaded: true });
	return (
		<AppStateContext value={appState}>
			<div
				className={css({
					fontFamily: "-apple-system, Calibri, 'Open Sans', serif",
					overflowWrap: 'break-word',
					'& pre': { whiteSpace: 'pre-wrap' },
				})}
			>
				<Nav
					key={navKey}
					onClosePost={(e) => {
						e.preventDefault();
						setPost(null);
					}}
					onRefresh={(e) => {
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
				<PostList onClickPost={setLoadedPost} />
				<Post onLoadPost={setLoadedPost} />
				<Foot />
			</div>
		</AppStateContext>
	);
}

export default function App() {
	return (
		<URLCache>
			<AppImpl />
		</URLCache>
	);
}
