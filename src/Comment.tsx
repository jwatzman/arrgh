import React from 'react';

import CommentList from './CommentList';
import {CommentJson} from './ResultJson';

type Props = {
	comment: CommentJson,
};

export default function Comment({comment}: Props) {
	const replies = comment.replies === ""
		? null
		: <CommentList comments={comment.replies.data.children} />;

	return (
		<li>
			<div>{comment.body}</div>
			{replies}
		</li>
	);
}
