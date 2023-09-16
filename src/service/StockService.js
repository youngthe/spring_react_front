import axios from 'axios';

const STOCK_API_BASE_URL = "http://localhost:8080/stock";

class StockService {
    getStocks() {
        return axios.get(STOCK_API_BASE_URL);
    }

}

export default new StockService();