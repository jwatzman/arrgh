import React from 'react';

import {PostJson} from './ResultJson';

type Props = {
	post: PostJson,
	onClick: (e: React.SyntheticEvent) => void,
};

export default function PostListItem({post, onClick}: Props) {
	const href = '#'; // XXX
	return (
		<li>
			{post.ups}
			-
			<a href={href} onClick={onClick}>{post.title}</a>
		</li>
	);
}
