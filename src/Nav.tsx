import React from 'react';

import {ViewConfig} from './ViewConfig';

type Props = {
	initViewConfig: ViewConfig,
	setViewConfig: (s: ViewConfig) => void,
};

export default function Nav({initViewConfig, setViewConfig}: Props) {
	return <div>Nav</div>;
}
