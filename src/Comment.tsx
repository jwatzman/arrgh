import { css } from '@emotion/css';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import CommentList from '#arrgh/CommentList';
import type { CommentJson } from '#arrgh/ResultJson';
import formatDaysAgo from '#arrgh/formatDaysAgo';
import formatKilo from '#arrgh/formatKilo';

type Props = {
	comment: CommentJson;
};

export default function Comment({ comment }: Props) {
	const [collapsed, setCollapsed] = React.useState(false);

	const replies =
		comment.replies === '' ? null : collapsed ? (
			<div>[Collapsed]</div>
		) : (
			<CommentList comments={comment.replies.data.children} />
		);

	return (
		<>
			<div onClick={(_) => setCollapsed(!collapsed)}>
				<div>
					<ReactMarkdown>{comment.body}</ReactMarkdown>
				</div>
				<div className={css({ color: 'gray', marginTop: '5px' })}>
					{formatKilo(comment.ups)}
					{' \u00b7 '}
					Posted by /u/{comment.author} {formatDaysAgo(comment.created)}
				</div>
			</div>
			{replies}
		</>
	);
}
