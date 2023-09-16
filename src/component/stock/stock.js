import React, { Component} from "react";
import StockService from '../../service/StockService';
import "./stock.css"


class Stock extends Component{
    constructor(props) {
        super(props);

        this.state = {
            stocks: []
        }

    }

    componentDidMount() {
        StockService.getStocks().then((res) => {
            console.log(res.data.data.content);
            this.setState({stocks: res.data.data.content});
        });
    }

    // createBoard() {
    //     this.props.history.push('/create-board/');
    // }

    render() {
        return (
            <section className="notice">
                <div className="page-title">
                    <div className="container">
                        <h3>리스트</h3>
                    </div>
                </div>
                <div id="board-search">
                    <div className="container">
                        <div className="search-window">
                            <form action="">
                                <div className="search-wrap">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div id="board-list">
                    <div className="container">
                        <table className="board-table" border={1}>
                            <thead>
                            <tr>
                                <th scope="col" className="th-num">종목 번호</th>
                                <th scope="col" className="th-date">종목</th>
                                <th scope="col" className="th-date">목표가</th>
                                <th scope="col" className="th-date">현재가</th>
                                <th scope="col" className="th-date">목표가까지 남은 금액</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                this.state.stocks.map(
                                    data =>
                                        <tr key = {data.pk}>
                                            <td> {data.pk} </td>
                                            <td> {data.stockName} </td>
                                            <td> {data.goalPrice} </td>
                                            <td> {data.currentPrice} </td>
                                            <td> 0 </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        );
    }
}

export default Stock;
