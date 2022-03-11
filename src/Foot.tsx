import React from 'react';

import {AppStateContext} from './AppState';

export default function Foot() {
	const appState = React.useContext(AppStateContext);
	const hr = appState.viewConfig.subreddit === '' && appState.post === null
		? null : <hr />;
	const url = 'https://github.com/jwatzman/arrgh';

	return (
		<>
			{hr}
			<div>
				Arrgh by Josh Watzman.
				{' '}
				<a href={url} target="_blank" rel="noreferrer">Source on GitHub.</a>
			</div>
		</>
	);
}
