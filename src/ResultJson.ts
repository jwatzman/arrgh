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

export type CommentJson = {
	author: string,
	body: string,
	created: number,
	id: string,
	replies: {
		data: {
			children: {
				data: CommentJson,
			}[],
		}
	},
	ups: number,
};

export type CommentListJson = {
	1: {
		data: {
			children: {
				data: CommentJson,
			}[],
		},
	},
};
