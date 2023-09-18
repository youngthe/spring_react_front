import axios from 'axios';

const STOCK_API_BASE_URL = "http://localhost:8080";

class StockService {
    getStocks() {
        return axios.get(STOCK_API_BASE_URL + "/stock");
    }

    getDataRefresh(data){
        return axios.post("http://localhost:8080"+"/refresh", {"userId" : data });
    }
}

export default new StockService();