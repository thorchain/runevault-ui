import Gravatar from "react-gravatar";
import React from "react";
import {LEADERBOARD_LIST, LEDGER_COLUMNS} from "./index";

export const saveLedgerColumns = () => dispatch => {
    const columns = [
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

        {
            title: 'Last Updated',
            dataIndex: 'lastUpdated',
            key: 'lastUpdated',
        },

    ];
    dispatch(setLedgerColumn(columns));
}


export const setLedgerColumn = (ledgerColumns) => {
    return {
        type: LEDGER_COLUMNS,
        ledgerColumns
    }
}


export const setLeaderBoardList = (leaderBoardList) => {
    return {
        type: LEADERBOARD_LIST,
        leaderBoardList
    }
};
