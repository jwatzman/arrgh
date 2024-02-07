import { Map, Set } from 'immutable';
import React from 'react';

type CtxT = {
	fetchStarted: Set<string>;
	setFetchStarted: (f: (s: Set<string>) => Set<string>) => void;
	results: Map<string, any>;
	setResults: (f: (m: Map<string, any>) => Map<string, any>) => void;
};

const Ctx = React.createContext<CtxT | null>(null);

type Props = {
	children: JSX.Element;
};

export function URLCache({ children }: Props) {
	const [fetchStarted, setFetchStarted] = React.useState<Set<string>>(Set());
	const [results, setResults] = React.useState<Map<string, any>>(Map());

	return (
		<Ctx.Provider
			value={{ fetchStarted, setFetchStarted, results, setResults }}
		>
			{children}
		</Ctx.Provider>
	);
}

export function useFetchCachedUrl<T>(url: string | null): T | null {
	const { fetchStarted, setFetchStarted, results, setResults } =
		React.useContext(Ctx)!;

	React.useEffect(() => {
		if (url === null) {
			return;
		}

		if (fetchStarted.has(url)) {
			return;
		}

		setFetchStarted((s) => s.add(url));
		console.log('fetching ' + url);
		fetch(url)
			.then((r) => r.json())
			.then((j) => setResults((m) => m.set(url, j)))
			.catch((e) => console.log(e)); // XXX
	}, [fetchStarted, setFetchStarted, results, setResults, url]);

	if (url === null) {
		return null;
	} else {
		return results.get(url, null);
	}
}

export function useClearUrlCache() {
	const { setFetchStarted, setResults } = React.useContext(Ctx)!;

	return () => {
		setFetchStarted(() => Set());
		setResults(() => Map());
	};
}
