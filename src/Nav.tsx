import { css } from '@emotion/css';
import React from 'react';

import type { ViewConfig } from './AppState';
import {
	AppStateContext,
	CommentRanking,
	RankingType,
	TopTime,
	defaultTopTime,
} from './AppState';
import SelectEnum from './SelectEnum';
import { appStateToUrl } from './urlAppState';

const navStyle = css({
	'& > *': {
		marginBottom: '5px',
		marginLeft: '10px',
		marginTop: '5px',
	},
	'& > *:first-child': {
		marginLeft: 0,
	},
	'& label select': {
		marginLeft: '5px',
	},
});

type Props = {
	onClosePost: (e: React.SyntheticEvent) => void;
	onRefresh: (e: React.SyntheticEvent) => void;
	setViewConfig: (s: ViewConfig) => void;
};

export default function Nav({ onClosePost, onRefresh, setViewConfig }: Props) {
	const appState = React.useContext(AppStateContext);
	const initViewConfig = appState.viewConfig;
	const [subreddit, setSubreddit] = React.useState(initViewConfig.subreddit);

	const initRanking = initViewConfig.ranking;
	const [rankingType, setRankingType] = React.useState(initRanking.type);
	const [topTime, setTopTime] = React.useState(
		initRanking.type === RankingType.TOP ? initRanking.time : defaultTopTime,
	);

	const [commentRanking, setCommentRanking] = React.useState(
		initViewConfig.commentRanking,
	);

	const changeSubreddit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubreddit(e.currentTarget.value);
	};

	const submit = (e: React.SyntheticEvent) => {
		e.preventDefault();

		const ranking =
			rankingType === RankingType.TOP
				? { type: RankingType.TOP, time: topTime }
				: { type: rankingType };

		setViewConfig({
			subreddit: subreddit,
			ranking: ranking,
			commentRanking: commentRanking,
		});
	};

	const selectTopTime =
		rankingType === RankingType.TOP ? (
			<SelectEnum
				onChange={setTopTime}
				values={Object.values(TopTime)}
				value={topTime}
			/>
		) : null;

	const closeHref = appStateToUrl({
		...appState,
		post: null,
	});

	const closeLink =
		appState.post === null ? null : (
			<div>
				<a href={closeHref} onClick={onClosePost}>
					Close
				</a>
			</div>
		);

	return (
		<div>
			<form className={navStyle} onSubmit={submit}>
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
			<form className={navStyle} onSubmit={onRefresh}>
				<input type="submit" value="Refresh" />
			</form>
			{closeLink}
		</div>
	);
}
