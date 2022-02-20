import React from 'react';

import {PostJson} from './ResultJson';

type Props = {
	post: PostJson|null,
	onClickClose: (e: React.SyntheticEvent) => void,
};

export default function Post({post, onClickClose}: Props) {
	if (post === null) {
		return null;
	}

	const href = '#'; // XXX
	return (
		<div>
			<div>{post.title}</div>
			<div>{post.selftext}</div>
			<div><a href={href} onClick={onClickClose}>Close</a></div>
		</div>
	);
}
