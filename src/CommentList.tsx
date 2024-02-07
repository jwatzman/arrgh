import { css } from '@emotion/css';
import React from 'react';

import Comment from './Comment';
import type { CommentJsonChild } from './ResultJson';

type Props = {
	comments: CommentJsonChild[];
};

export default function CommentList({ comments }: Props) {
	if (comments.length === 0) {
		return null;
	}

	return (
		<ol
			className={css({ margin: 0, padding: 0, '& &': { marginLeft: '20px' } })}
		>
			{comments.map((c) => (
				<li
					key={c.kind === 'more' ? 'more' : c.data.id}
					className={css({
						borderLeft: '1px solid grey',
						listStyle: 'none',
						margin: '10px 0',
						paddingLeft: '5px',
						'& p': { margin: '10px 0 0 0' },
					})}
				>
					{c.kind === 'more' ? '(More...)' : <Comment comment={c.data} />}
				</li>
			))}
		</ol>
	);
}
