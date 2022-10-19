import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [userID, setUserID] = useState('');
    const [Password, setPassword] = useState('');
    const [loginState, setloginSate] = useState(0);
    const [shop, setShop] = useState([{
        id : '',
        name : '',
        price : '',
    }]);
    const [myshop, setMyShop] = useState([{
        name : '',
        price : ''
    }]);


    const [Data, setData] = useState({
        jwt_token: '',
        resultCode: '',
        message: '',
    });
    const login = () =>{
        if(loginState == 0){
            setloginSate(loginState+1);
        }
    }
    const logout = () =>{
        if(loginState == 1){
            setloginSate(loginState-1);
        }
    }

    const search = () => {
        console.log(localStorage.getItem("jwt_token"))
        axios.post('/search', {
            jwt_token : localStorage.getItem("jwt_token")
        })
            .then(function(res){
                if(res.data.resultCode == "jwt-error"){
                    alert("토큰이 만료되었습니다.");
                    logout();
                }else{
                    alert("success search");
                }
            }).catch(function(error){
            console.log(error);
        })

    }

    const register = () => {

        const user = {
            id : userID,
            pw : Password,
        };

        axios.post('/register', user)
            .then(function(res){
                if(res.data.resultCode == "true"){
                    alert("회원가입 성공");
                }else{
                    logout();
                    alert("회원가입 실패");
                }
            }).catch(function(error){
            console.log(error);
        })
    }


    const onSubmit= (event) => {
        event.preventDefault(); // submit 시 웹페이지가 리로딩 되는걸 막아줌
        console.log(userID, Password);

        const user = {
            id : userID,
            pw : Password,
        };

        axios.post('/login', user)
            .then(function(res){
                if(res.data.resultCode == "true"){
                    console.log("success");
                    alert("로그인 성공");
                    localStorage.setItem("jwt_token", res.data.jwt_token);
                    login();
                }else{
                    logout();
                    alert("로그인 실패");
                    console.log("false");
                }
            }).catch(function(error){
            console.log(error);
        })
    }

    const shopping = (event) => {
        event.preventDefault(); // submit 시 웹페이지가 리로딩 되는걸 막아줌
        axios.get('/shopping').then(function(res){
            if(res.data.resultCode == "true"){
                console.log(res);
                alert("success");
                setShop(res.data.list);

            }else{
                alert("fail");
            }
        })

    }

    const getItem = (id) => {
        jwt_token : localStorage.getItem("jwt_token")

        console.log(id);
        axios.post('/my-shop/'+id, {
            jwt_token : localStorage.getItem("jwt_token")
        }).then(function(response){
            if(response.data.resultCode == "true"){
                console.log(response);

                if(response.data.message == "exist"){
                    alert("이미 장바구니에 담긴 상품입니다.");
                }else{
                    alert("해당 상품이 장바구니에 등록되었습니다.");
                }
            }else{
                alert("fail");
            }
        })


    }

    const getShoppingBag = () => {

        jwt_token : localStorage.getItem("jwt_token")


        axios.post('/show-my-shopping', {
            jwt_token : localStorage.getItem("jwt_token")
        }).then(function(response){
            if(response.data.resultCode == "true"){
                console.log(response);
                setMyShop(response.data.list);
                alert("성공");
            }else{
                alert("fail");
            }
        })
    }



if(loginState == 0){
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input onChange={(e) => {setUserID(e.target.value)}} placeholder="userID" /><br/>
                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="password" /><br/>
                <input type="submit" value='로그인'></input>
                <input type="button" onClick={register} value="회원가입"></input>
                { loginState }
            </div>
        </form>
    );
}else{
    return (
        <div>
            <h1>로그인 성공</h1>
            <input type="button" onClick={search} value="검색"></input>
            <input type="button" onClick={shopping} value="쇼핑"></input>
            <input type="button" onClick={logout} value="로그아웃"></input>
            <input type="button" onClick={getShoppingBag} value="장바구니 확인"></input>

            {
                shop.map((shop, idx) => {
                return (
                    <tr key={shop.id}>
                        <td>{shop.name}</td>
                        <td>{shop.price}</td>
                        <input type="button" onClick={() => getItem(shop.id) } value="장바구니 담기"></input>
                    </tr>
                )
            })
            }
            {
                myshop.map((myshop,idx) => {
                    return (
                        <div>

                            <table border="1">
                                <th colSpan='2'>장바구니 항목</th>
                                <tr key={myshop.name}>
                                    <td>{myshop.name}</td>
                                    <td>{myshop.price}</td>
                                </tr>
                            </table>

                        </div>
                    )
                })
            }
        </div>
    );
}

}

export default App;
