import React from 'react';

import {AppState} from './AppState';

type Props = {
	appState: AppState,
	setPost: (s: string) => void,
};
export default function PostList({appState, setPost}: Props) {
	return <div>Post list</div>;
}
