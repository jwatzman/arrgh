import React from 'react';

import formatDaysAgo from './formatDaysAgo';
import formatUps from './formatUps';
import {PostJson} from './ResultJson';

import Styles from './PostListItem.module.css';

type Props = {
	post: PostJson,
	onClick: (e: React.SyntheticEvent) => void,
};

export default function PostListItem({post, onClick}: Props) {
	const now = Math.round(Date.now() / 1000);

	const href = '#'; // XXX
	return (
		<li className={Styles.item}>
			<div className={Styles.ups}>{formatUps(post.ups)}</div>
			<div>
				<div className={Styles.title}>
					<a href={href} onClick={onClick}>{post.title}</a>
				</div>
				<div className={Styles.subtitle}>
					{post.num_comments} comments
					{' \u00b7 '}
					Posted by /u/{post.author} {formatDaysAgo(now - post.created)}
				</div>
			</div>
		</li>
	);
}
