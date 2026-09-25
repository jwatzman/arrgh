import { Map, Set } from 'immutable';
import React from 'react';

type CtxT = {
	fetchStarted: Set<string>;
	setFetchStarted: (f: (s: Set<string>) => Set<string>) => void;
	results: Map<string, any>;
	setResults: (f: (m: Map<string, any>) => Map<string, any>) => void;
};

const UrlCacheContext = React.createContext<CtxT | null>(null);

type Props = {
	children: React.JSX.Element;
};

export function URLCache({ children }: Props) {
	const [fetchStarted, setFetchStarted] = React.useState<Set<string>>(() =>
		Set(),
	);
	const [results, setResults] = React.useState<Map<string, any>>(() => Map());

	return (
		<UrlCacheContext
			value={{ fetchStarted, setFetchStarted, results, setResults }}
		>
			{children}
		</UrlCacheContext>
	);
}

export function useFetchCachedUrl<T>(url: string | null): T | null {
	const { fetchStarted, setFetchStarted, results, setResults } =
		React.use(UrlCacheContext)!;

	React.useEffect(() => {
		if (url === null) {
			return;
		}

		if (fetchStarted.has(url)) {
			return;
		}

		setFetchStarted((s) => s.add(url));
		console.log('fetching ' + url);
		// eslint-disable-next-line @eslint-react/web-api-no-leaked-fetch
		fetch(url)
			.then((r) => r.json())
			.then((j) => setResults((m) => m.set(url, j)))
			.catch((e) => console.log(e)); // XXX
	}, [fetchStarted, setFetchStarted, results, setResults, url]);

	if (url === null) {
		return null;
	} else {
		return results.get(url, null) as T | null;
	}
}

export function useClearUrlCache() {
	const { setFetchStarted, setResults } = React.use(UrlCacheContext)!;

	return () => {
		setFetchStarted(() => Set());
		setResults(() => Map());
	};
}
