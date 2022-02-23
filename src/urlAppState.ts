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

const TopTimeParams = Map({
	h: TopTime.HOUR,
	d: TopTime.DAY,
	w: TopTime.WEEK,
	m: TopTime.MONTH,
	y: TopTime.YEAR,
	a: TopTime.ALL,
});

const RankingTypeParams = Map({
	h: RankingType.HOT,
	n: RankingType.NEW,
	t: RankingType.TOP,
});

const CommentRankingParams = Map({
	b: CommentRanking.BEST,
	t: CommentRanking.TOP,
	n: CommentRanking.NEW,
});

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
	const state = defaultAppState;

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

	return state;
}
