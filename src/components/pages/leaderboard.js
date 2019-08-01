import {Component} from "react";
import { connect } from 'react-redux';
import Gravatar from "react-gravatar";
import React from "react";
import {Col, Row, Table} from "antd";
import {sumStake} from "../../actions/stakeaction";
import {H1, H4} from "../Components";

class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            viewableLeaderBoardList: []
        }
    }

    componentDidMount() {
        this.props.dispatch(sumStake());
        this.setState({columns: this.tableColumns()})
    }

    tableColumns() {
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
                dataIndex: 'address',
                key: 'address',
                render: text => <a href={"https://explorer.binance.org/address/"+text}>{text}</a>,
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
        return columns;
    }

    render() {

        const {stake} = this.props;

        console.log('STAKE ' + stake.sumStake);

        return(

            <div style={{backgroundColor: "#101921", marginLeft: 30}} >

                <Col xs={24} sm={22} md={20} lg={18}>
                    <H1>RUNEVAULT LEADERBOARD</H1>
                </Col>

                <Col xs={24} sm={22} md={20} lg={18} >
                    <H4>TOP STAKERS EARNING WITH RUNEVAULT</H4>
                </Col>

                <Col xs={24} sm={22} md={20} lg={24}
                     style={{backgroundColor: '#D8D8D8', borderRadius: 5, paddingTop: 25, paddingBottom: 5}}>
                    <Table pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
                           dataSource={stake.leaderBoardList} pafin columns={this.state.columns}
                           size={'middle'}
                           title={() => 'LEADERBOARD'}/>
                </Col>

            </div>
        )

    }


}

function mapStateToProps(state) {
    return {
        stake: state.stake
    };
}

export default connect(mapStateToProps)(Leaderboard)
