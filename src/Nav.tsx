import React from 'react';

import {CommentRanking, RankingType, TopTime, ViewConfig} from './AppState';
import SelectEnum from './SelectEnum';

type Props = {
	initViewConfig: ViewConfig,
	setViewConfig: (s: ViewConfig) => void,
};

export default function Nav({initViewConfig, setViewConfig}: Props) {
	const [subreddit, setSubreddit] = React.useState(initViewConfig.subreddit);

	const initRanking = initViewConfig.ranking;
	const [rankingType, setRankingType] = React.useState(initRanking.type);
	const [topTime, setTopTime] = React.useState(
		initRanking.type === RankingType.TOP ? initRanking.time : TopTime.DAY
	);

	const [commentRanking, setCommentRanking] =
		React.useState(initViewConfig.commentRanking);

	const changeSubreddit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubreddit(e.currentTarget.value);
	};

	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const ranking = rankingType === RankingType.TOP
			?  {type: RankingType.TOP, time: topTime}
			: {type: rankingType};

		setViewConfig({
			subreddit: subreddit,
			ranking: ranking,
			commentRanking: commentRanking,
		});
	};

	const selectTopTime = rankingType === RankingType.TOP
		? <SelectEnum
			onChange={setTopTime}
			values={Object.values(TopTime)}
			value={topTime}
		/>
		: null;

	return (
		<form onSubmit={submit}>
			<label>
				/r/
				<input type="text" value={subreddit} onChange={changeSubreddit} />
			</label>
			<label>
				Posts:
				<SelectEnum
					onChange={setRankingType}
					values={Object.values(RankingType)}
					value={rankingType}
				/>
			</label>
			{selectTopTime}
			<label>
				Comments:
				<SelectEnum
					onChange={setCommentRanking}
					values={Object.values(CommentRanking)}
					value={commentRanking}
				/>
			</label>
			<input type="submit" value="Go -->" />
		</form>
	);
}