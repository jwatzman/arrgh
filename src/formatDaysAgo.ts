const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
const DAY_IN_YEAR = 365; // Close enough.

const SEC_IN_HOUR = SEC_IN_MIN * MIN_IN_HOUR;
const SEC_IN_DAY = SEC_IN_HOUR * HOUR_IN_DAY;
const SEC_IN_YEAR = SEC_IN_DAY * DAY_IN_YEAR;

const agoTable = [
	{ t: SEC_IN_YEAR, s: 'year' },
	{ t: SEC_IN_DAY, s: 'day' },
	{ t: SEC_IN_HOUR, s: 'hour' },
	{ t: SEC_IN_MIN, s: 'minute' },
	{ t: 1, s: 'second' },
];

function formatDaysAgoImpl(secs: number): string {
	if (secs <= 0) {
		return 'just now';
	}

	for (const { t, s } of agoTable) {
		if (secs >= t) {
			const n = Math.floor(secs / t);
			const ss = n === 1 ? s : s + 's';
			return n + ' ' + ss + ' ago';
		}
	}

	return 'formatDaysAgo failed to format ' + secs;
}

export default function formatDaysAgo(ts: number): string {
	const now = Math.round(Date.now() / 1000);
	return formatDaysAgoImpl(now - ts);
}
