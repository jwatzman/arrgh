import React from 'react';

import Comment from './Comment';
import {CommentJson} from './ResultJson';

type Props = {
	comments: CommentJson[],
};

export default function CommentList({comments}: Props) {
	return (
		<ol>
			{comments.map(c => <Comment key={c.id} comment={c} />)}
		</ol>
	);
}
