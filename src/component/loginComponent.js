import {useState} from "react";
import axios from "axios";

function App() {

    const [userID, setUserID] = useState('');
    const [Password, setPassword] = useState('');

    const onSubmit= (event) => {
        event.preventDefault(); // submit 시 웹페이지가 리로딩 되는걸 막아줌
        console.log(userID, Password);

        const user = {
            id : userID,
            pw : Password,
        };

        axios
            .post('/login', user)
            .then(function(res){
                console.log(res);
            }).catch(function(error){
            console.log(error);
        })
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <input onChange={(e) => {setUserID(e.target.value)}} placeholder="userID" /><br/>
                <input onChange={(e) => {setPassword(e.target.value)}} placeholder="password" /><br/>
                <input type="submit" value='로그인'></input>
            </div>
        </form>

    );
}

export default App;
