import React from 'react';

import formatDaysAgo from './formatDaysAgo';
import formatKilo from './formatKilo';
import {PostJson} from './ResultJson';

import Styles from './PostListItem.module.css';

type Props = {
	post: PostJson,
	onClick: (e: React.SyntheticEvent) => void,
};

export default function PostListItem({post, onClick}: Props) {
	const href = '#'; // XXX
	return (
		<li className={Styles.item}>
			<div className={Styles.ups}>{formatKilo(post.ups)}</div>
			<div>
				<div className={Styles.title}>
					<a href={href} onClick={onClick}>{post.title}</a>
				</div>
				<div className={Styles.subtitle}>
					{formatKilo(post.num_comments)} comments
					{' \u00b7 '}
					Posted by /u/{post.author} {formatDaysAgo(post.created)}
				</div>
			</div>
		</li>
	);
}
