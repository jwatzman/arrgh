import React from 'react';

import {PostJson} from './ResultJson';

type Props = {
	post: PostJson,
};

export default function PostListItem({post}: Props) {
	return <li>{post.ups} - {post.title}</li>;
}
