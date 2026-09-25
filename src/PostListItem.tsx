import { css } from '@emotion/css';
import React from 'react';

import { AppStateContext } from '#arrgh/AppState';
import type { PostJson } from '#arrgh/ResultJson';
import formatDaysAgo from '#arrgh/formatDaysAgo';
import formatKilo from '#arrgh/formatKilo';
import { appStateToUrl } from '#arrgh/urlAppState';

type Props = {
	post: PostJson;
	onClick: (e: React.SyntheticEvent) => void;
};

export default function PostListItem({ post, onClick }: Props) {
	const appState = React.use(AppStateContext);
	const href = appStateToUrl({
		...appState,
		post: { ...post, loaded: true },
	});

	return (
		<li
			className={css({
				alignItems: 'center',
				display: 'flex',
				listStyle: 'none',
				margin: '10px',
			})}
		>
			<div className={css({ marginRight: '5px', minWidth: '50px' })}>
				{formatKilo(post.ups)}
			</div>
			<div>
				<div className={css({ fontWeight: 'bold' })}>
					<a href={href} onClick={onClick}>
						{post.title}
					</a>
				</div>
				<div className={css({ color: 'gray' })}>
					{formatKilo(post.num_comments)} comments
					{' \u00b7 '}
					Posted by /u/{post.author} {formatDaysAgo(post.created)}
				</div>
			</div>
		</li>
	);
}
