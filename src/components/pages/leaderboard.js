import {Component} from "react";
import { connect } from 'react-redux';
import React from "react";
import {Col, Row, Table} from "antd";
import {Button, H1, H4, Icon, Text} from "../Components";

class Leaderboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            viewableLeaderBoardList: []
        }
    }

    render() {

        const homeStyles = {
            marginLeft: 0,
            marginTop: 40,
            backgroundColor: "#101921"
        }

        const {stake, ledger} = this.props;

        console.log('STAKE ' + stake.sumStake);

        return(

            <div style={{backgroundColor: "#101921"}}>
                <Row style={{}}>
                    <Col xs={24} sm={24} md={1} lg={2}>
                    </Col>
                    <Col span={12} style={homeStyles}>

                        <H1>RUNEVAULT LEADERBOARD</H1>
                        <br></br>
                        <h4 style={{color: "#848E9C"}}><span>TOP STAKERS EARNING WITH RUNEVAULT </span>
                        </h4>
                    </Col>

                </Row>


                <Row style={{marginTop: 30}}>
                    <Col xs={24} sm={24} md={1} lg={2}>
                    </Col>
                    <Col xs={24} sm={22} md={20} lg={20}
                         style={{backgroundColor: '#D8D8D8', borderRadius: 5, paddingTop: 25, paddingBottom: 5}}>
                        <Table pagination={{ defaultPageSize: 100, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}}
                               dataSource={ledger.leaderBoardList} pafin columns={ledger.ledgerColumns}
                               size={'middle'}
                               title={() => 'LEADERBOARD'}/>
                    </Col>

                    <Col xs={24} sm={1} md={2} lg={3}>
                    </Col>

                </Row>


            </div>
        )

    }


}

function mapStateToProps(state) {
    return {
        stake: state.stake,
        ledger: state.ledger
    };
}

export default connect(mapStateToProps)(Leaderboard)
