import React from 'react';
import ReactMarkdown from 'react-markdown';

import {AppStateContext} from './AppState';
import Comments from './Comments';

export default function Post() {
	const post = React.useContext(AppStateContext).post;
	if (post === null) {
		return null;
	}

	return (
		<div>
			<h1>{post.title}</h1>
			<div><ReactMarkdown>{post.selftext}</ReactMarkdown></div>
			<hr />
			<h2>Comments</h2>
			<Comments />
		</div>
	);
}
