export default function formatKilo(u: number) {
	if (u < 1000) {
		return u.toString();
	} else {
		return (u / 1000).toFixed(1) + 'k';
	}
}
