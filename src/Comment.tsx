import React from 'react';

import {CommentJson} from './ResultJson';

type Props = {
	comment: CommentJson,
};

export default function Comment({comment}: Props) {
	return <li>{comment.body}</li>;
}
