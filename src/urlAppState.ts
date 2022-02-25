import {Map} from 'immutable';

import {
	AppState,
	defaultAppState,
	defaultTopTime,
	CommentRanking,
	Ranking,
	RankingType,
	TopTime,
} from './AppState';

const SUBREDDIT = 'r';
const RANKING_TYPE = 'rt';
const TOP_TIME = 't';
const COMMENT_RANKING = 'cr';
const POST_ID = 'p';

const TopTimeParams = Map({
	h: TopTime.HOUR,
	d: TopTime.DAY,
	w: TopTime.WEEK,
	m: TopTime.MONTH,
	y: TopTime.YEAR,
	a: TopTime.ALL,
});
const TopTimeParamsInv = TopTimeParams.flip();

const RankingTypeParams = Map({
	h: RankingType.HOT,
	n: RankingType.NEW,
	t: RankingType.TOP,
});
const RankingTypeParamsInv = RankingTypeParams.flip();

const CommentRankingParams = Map({
	b: CommentRanking.BEST,
	t: CommentRanking.TOP,
	n: CommentRanking.NEW,
});
const CommentRankingParamsInv = CommentRankingParams.flip();

function rankingFromParams(params: URLSearchParams): Ranking|null {
	const rankingType = RankingTypeParams.get(params.get(RANKING_TYPE) || '');
	if (!rankingType) {
		return null;
	} else if (rankingType === RankingType.TOP) {
		const topTime =
			TopTimeParams.get(params.get(TOP_TIME) || '') || defaultTopTime;
		return {type: rankingType, time: topTime};
	} else {
		return {type: rankingType};
	}
}

export function appStateFromUrl(): AppState {
	const params = new URLSearchParams(window.location.search);
	const state = {
		...defaultAppState,
		viewConfig: {...defaultAppState.viewConfig},
	};

	const subreddit = params.get(SUBREDDIT);
	if (subreddit) {
		state.viewConfig.subreddit = subreddit;
	}

	const ranking = rankingFromParams(params);
	if (ranking) {
		state.viewConfig.ranking = ranking;
	}

	const commentRanking =
		CommentRankingParams.get(params.get(COMMENT_RANKING) || '');
	if (commentRanking) {
		state.viewConfig.commentRanking = commentRanking;
	}

	const postId = params.get(POST_ID);
	if (postId !== null) {
		state.post = {loaded: false, id: postId};
	}

	return state;
}

/**
 * This is called for two different reasons -- the root App uses it to
 * serialise the current state to update the browser history, but also a
 * couple of components use it to set their href on links. This means that the
 * knowledge of "how does this link change the AppState" lives in two places,
 * which is unfortunate. Doing routing better (or actually using a proper
 * router) is I think the best way to fix this, but it is not worth it for
 * such a small app IMO.
 */
export function appStateToUrl(state: AppState): string {
	const params = new URLSearchParams();

	if (state.viewConfig.subreddit !== '') {
		params.set(SUBREDDIT, state.viewConfig.subreddit);
	}

	params.set(
		RANKING_TYPE,
		RankingTypeParamsInv.get(state.viewConfig.ranking.type)!
	);

	if (state.viewConfig.ranking.type === RankingType.TOP) {
		params.set(
			TOP_TIME,
			TopTimeParamsInv.get(state.viewConfig.ranking.time)!
		);
	}

	params.set(
		COMMENT_RANKING,
		CommentRankingParamsInv.get(state.viewConfig.commentRanking)!
	);

	if (state.post !== null) {
		params.set(POST_ID, state.post.id);
	}

	const url = new URL(window.location.href);
	url.search = params.toString();
	return url.toString();
}
