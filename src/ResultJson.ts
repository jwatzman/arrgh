export type PostJson = {
	author: string,
	created: number,
	id: string,
	num_comments: number,
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

type CommentJsonChildComment = {
	kind: "t1",
	data: CommentJson,
};

type CommentJsonChildMore = {
	kind: "more",
};

export type CommentJsonChild = CommentJsonChildComment | CommentJsonChildMore;

export type CommentJson = {
	author: string,
	body: string,
	created: number,
	id: string,
	replies: {
		data: {
			children: CommentJsonChild[],
		}
	} | "",
	ups: number,
};

export type CommentListJson = {
	1: {
		data: {
			children: CommentJsonChild[],
		},
	},
};
