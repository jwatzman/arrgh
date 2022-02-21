import React from 'react';

import Comment from './Comment';
import {CommentJsonChild} from './ResultJson';

type Props = {
	comments: CommentJsonChild[],
};

function CommentMore() {
	return <li>(More...)</li>;
}

export default function CommentList({comments}: Props) {
	if (comments.length === 0) {
		return null;
	}

	return (
		<ol>
			{comments.map(
				c => c.kind === "more"
					? <CommentMore key="more" />
					: <Comment key={c.data.id} comment={c.data} />
			)}
		</ol>
	);
}
