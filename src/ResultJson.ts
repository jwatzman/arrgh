export type PostJson = {
	readonly author: string,
	readonly created: number,
	readonly id: string,
	readonly num_comments: number,
	readonly selftext: string,
	readonly stickied: boolean,
	readonly title: string,
	readonly ups: number,
};

export type PostListJson = {
	readonly data: {
		readonly children: {
			readonly data: PostJson,
		}[],
	},
};

type CommentJsonChildComment = {
	readonly kind: "t1",
	readonly data: CommentJson,
};

type CommentJsonChildMore = {
	readonly kind: "more",
};

export type CommentJsonChild = CommentJsonChildComment | CommentJsonChildMore;

export type CommentJson = {
	readonly author: string,
	readonly body: string,
	readonly created: number,
	readonly id: string,
	readonly replies: {
		readonly data: {
			readonly children: CommentJsonChild[],
		}
	} | "",
	readonly ups: number,
};

export type CommentListJson = {
	readonly 0: {
		readonly data: {
			readonly children: {
				readonly 0: {
					readonly data: PostJson,
				},
			},
		},
	},
	readonly 1: {
		readonly data: {
			readonly children: CommentJsonChild[],
		},
	},
};
