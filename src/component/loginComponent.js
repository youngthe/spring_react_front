import {useState} from "react";
import axios from "axios";

function App() {

    const [userID, setUserID] = useState('');
    const [Password, setPassword] = useState('');
    const [loginState, setloginSate] = useState(0);
    const [Data, setData] = useState({
        jwt_token: '',
        resultCode: '',
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
                    login();
                }else{
                    logout();
                    console.log("false");
                }
            }).catch(function(error){
            console.log(error);
        })
    }

if(loginState == 0){
    return (
        <form onSubmit={onSubmit}>
            <div>
                <input onChange={(e) => {setUserID(e.target.value)}} placeholder="userID" /><br/>
                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="password" /><br/>
                <input type="submit" value='로그인'></input>
                { loginState }
            </div>
        </form>
    );
}else{
    return (
        <div>
            <h1>로그인 성공</h1>
            <input type="button" onClick={logout} value="로그아웃"></input>
        </div>
    );
}

}

export default App;
