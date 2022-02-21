import React from 'react';

import Comment from './Comment';
import {CommentJson, CommentJsonChild} from './ResultJson';

type Props = {
	comments: CommentJsonChild[],
};

export default function CommentList({comments}: Props) {
	const commentData = comments.map(
		c => c.kind === "more" ? null : c.data
	).filter(
		(x): x is CommentJson => x !== null
	);

	if (commentData.length === 0) {
		return null;
	}

	return (
		<ol>
			{commentData.map(c => <Comment key={c.id} comment={c} />)}
		</ol>
	);
}
