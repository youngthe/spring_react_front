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
                                <th scope="col" className="th-date">퍼센트</th>
                                <th scope="col" className="th-date">날짜</th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                this.state.stocks.map(
                                    data =>
                                        <tr key = {data.pk}>
                                            <td> {num++} </td>
                                            <td> {data.stockName} </td>
                                            <td> {data.goalPrice} </td>
                                            <td> {data.currentPrice} </td>
                                            <td> {data.percent}</td>
                                            <td>{Unix_timestamp(data.timestamp)}</td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                <input type="button" value={"get data"} onClick={refresh}></input>
                </div>
            </section>
        );
    }
}

let num = 1;
function Unix_timestamp(t){
    const date = new Date(t); //date객체는 UTC로부터 지난시간을 밀리초로 나타내는 UNIX 타임스탬프를 담는다.(밀리초를 초로 변환하려면 *1000)
    console.log(date) //2023-02-28T05:36:35.000Z 출력됨
    const year = date.getFullYear(); //년도 구하기
    const month = "0" + (date.getMonth()+1);
    const day = "0" + date.getDate();
    const hour = "0" + date.getHours();
    const minute = "0" + date.getMinutes();
    const second = "0" + date.getSeconds();
    return year + "-" + month.substr(-2) + "-" + day.substr(-2) + " " + hour.substr(-2) + ":" + minute.substr(-2) + ":" + second.substr(-2);
}
function refresh(){
    StockService.getDataRefresh("1").then(res =>{
        window.location.reload()
    });

}

export default Stock;
