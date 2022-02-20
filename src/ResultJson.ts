export type PostJson = {
	created: number,
	id: string,
	selftext: string,
	stickied: boolean,
	title: string,
	ups: number,
};

export type PostListJson = {
	data: {
		children: {
			data: PostJson,
		}[],
	},
};
