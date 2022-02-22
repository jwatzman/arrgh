import React from 'react';
import ReactMarkdown from 'react-markdown';

import CommentList from './CommentList';
import {CommentJson} from './ResultJson';
import formatDaysAgo from './formatDaysAgo';
import formatKilo from './formatKilo';

import Styles from './Comment.module.css';

type Props = {
	comment: CommentJson,
};

export default function Comment({comment}: Props) {
	const replies = comment.replies === ""
		? null
		: <CommentList comments={comment.replies.data.children} />;

	return (
		<li className={Styles.item}>
			<div><ReactMarkdown>{comment.body}</ReactMarkdown></div>
			<div className={Styles.subtitle}>
				{formatKilo(comment.ups)}
				{' \u00b7 '}
				Posted by /u/{comment.author} {formatDaysAgo(comment.created)}
			</div>
			{replies}
		</li>
	);
}
