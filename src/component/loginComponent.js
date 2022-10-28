import {useEffect, useState} from "react";
import axios from "axios";
import ListBoardComponent from "./ListBoardComponent";

function App() {

    const [userID, setUserID] = useState('');
    const [Password, setPassword] = useState('');
    const [loginState, setloginSate] = useState(0);
    const [shop, setShop] = useState([{
        id : '',
        name : '',
        price : '',
    }]);
    const [myshopSwitch,setMyshopSwitch] = useState(0);
    const [myshop, setMyShop] = useState([{
        id : '',
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
                    if(res.data.message == "exist"){
                        alert("아이디가 이미 존재합니다.");
                    }else{
                        alert("회원가입 에러");
                    }
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
                    getShoppingBag();
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
                if(response.data.list.length == 0){
                    alert("장바구니가 비어있습니다.");
                }
                setMyshopSwitch(1);
            }else{
                alert("fail");
            }
        })
    }

    const deleteShoppingBag = (id) => {
        console.log(id);
        jwt_token : localStorage.getItem("jwt_token")

        axios.post('/delete-my-shopping/'+id, {
            jwt_token : localStorage.getItem("jwt_token")
        }).then(function(response){
            if(response.data.resultCode == "true"){
                console.log(response);
                getShoppingBag();
                alert("장바구니 삭제 성공");
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
                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="password" type={"password"}/><br/>
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
                    if(myshopSwitch == 1){
                        return (
                            <div>

                                <table border="1">
                                    <th colSpan='2'>장바구니 항목</th>
                                    <tr key={myshop.id}>
                                        <td>{myshop.id}</td>
                                        <td>{myshop.name}</td>
                                        <td>{myshop.price}</td>
                                        <td> <input type="button" onClick={() => deleteShoppingBag(myshop.id)} value="x"></input></td>
                                    </tr>
                                </table>
                            </div>
                        )
                    }

                })

            }

        </div>
    );
}

}

export default App;
