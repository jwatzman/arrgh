import React from 'react';

import {AppStateContext} from './AppState';
import Comments from './Comments';

type Props = {
	onClickClose: (e: React.SyntheticEvent) => void,
};

export default function Post({onClickClose}: Props) {
	const post = React.useContext(AppStateContext).post;
	if (post === null) {
		return null;
	}

	const href = '#'; // XXX
	return (
		<div>
			<h1>{post.title}</h1>
			<div>{post.selftext}</div>
			<h2>Comments</h2>
			<Comments />
			<div><a href={href} onClick={onClickClose}>Close</a></div>
		</div>
	);
}
