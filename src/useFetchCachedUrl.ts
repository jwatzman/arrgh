import {Map, Set} from 'immutable';
import React from 'react';

export default function useFetchCachedUrl<T>(url: string|null): T|null {
	const [fetchStarted, setFetchStarted] = React.useState(Set());
	const [results, setResults] =
		React.useState<Map<string, T>>(Map());

	React.useEffect(() => {
		if (url === null) {
			return;
		}

		if (fetchStarted.has(url)) {
			return;
		}

		setFetchStarted(s => s.add(url));
		fetch(url)
			.then(r => r.json())
			.then(j => setResults(m => m.set(url, j)))
			.catch(e => console.log(e)); // XXX
	}, [fetchStarted, url]);

	if (url === null) {
		return null;
	} else {
		return results.get(url, null);
	}
}
