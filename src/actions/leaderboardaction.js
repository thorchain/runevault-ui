import Gravatar from "react-gravatar";
import React from "react";
import {LEADERBOARD_LIST, LEADERBOARD_COLUMNS} from "./index";

export const saveLeaderboardColumns = () => dispatch => {
    const columns = [
        {
            title: 'Rank',
            dataIndex: 'rank',
            render: (text, record) => (
                <p style={{paddingLeft:20}}>{record.key+1}</p>
            )
        },
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: text => (
                <Gravatar size={30} email={text} />
            )
        },

        {
            title: 'Address',
            key: 'address',
            width: '50%',
            onCell: () => {
                return {
                    style: {
                        overflowWrap: 'break-word',
                        maxWidth: 100,
                    }
                }
            },
            render: (text, record) => (
                <a href={"https://explorer.binance.org/address/" + text.address} style={{color: "#434343"}}>{text.address}</a>
            )
        },
        {
            title: 'Staked',
            dataIndex: 'staked',
            key: 'staked',
        },

    ];
    dispatch(setLeaderBoardColumn(columns));
}


export const setLeaderBoardColumn = (leaderboardColumns) => {
    return {
        type: LEADERBOARD_COLUMNS,
        leaderboardColumns
    }
}


export const setLeaderBoardList = (leaderBoardList) => {
    return {
        type: LEADERBOARD_LIST,
        leaderBoardList
    }
};
