import React from 'react';

import {ViewConfig} from './AppState';

type Props = {
	initViewConfig: ViewConfig,
	setViewConfig: (s: ViewConfig) => void,
};

export default function Nav({initViewConfig, setViewConfig}: Props) {
	return <div>Nav</div>;
}
