import React from 'react';

import Comment from './Comment';
import {CommentJsonChild} from './ResultJson';

import Styles from './CommentList.module.css';

type Props = {
	comments: CommentJsonChild[],
};

function CommentMore() {
	return <li className={Styles.more}>(More...)</li>;
}

export default function CommentList({comments}: Props) {
	if (comments.length === 0) {
		return null;
	}

	return (
		<ol className={Styles.list}>
			{comments.map(
				c => c.kind === "more"
					? <CommentMore key="more" />
					: <Comment key={c.data.id} comment={c.data} />
			)}
		</ol>
	);
}
