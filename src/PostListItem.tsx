import React from 'react';
import {css} from '@emotion/css';

import {AppStateContext} from './AppState';
import formatDaysAgo from './formatDaysAgo';
import formatKilo from './formatKilo';
import {PostJson} from './ResultJson';
import {appStateToUrl} from './urlAppState';

type Props = {
	post: PostJson,
	onClick: (e: React.SyntheticEvent) => void,
};

export default function PostListItem({post, onClick}: Props) {
	const appState = React.useContext(AppStateContext);
	const href = appStateToUrl({
		...appState,
		post: {...post, loaded: true},
	});

	return (
		<li className={css({alignItems: 'center', display: 'flex', listStyle: 'none', margin: '10px'})}>
			<div className={css({marginRight: '5px', minWidth: '50px'})}>{formatKilo(post.ups)}</div>
			<div>
				<div className={css({fontWeight: 'bold'})}>
					<a href={href} onClick={onClick}>{post.title}</a>
				</div>
				<div className={css({color: 'gray'})}>
					{formatKilo(post.num_comments)} comments
					{' \u00b7 '}
					Posted by /u/{post.author} {formatDaysAgo(post.created)}
				</div>
			</div>
		</li>
	);
}
