import React,{useState,useEffect} from 'react'
import axios from 'axios'
import cookie from 'react-cookies'
import Login from './Login';

export default function UserP() {
    const [webT, setWebT] = useState('');
    const [userDat, setUserDat] = useState({});
    const [edit, setEdit] = useState(false);
    


    useEffect(() => {
        const token = cookie.load("Auth");
        setWebT(token)
        axios.get(`http://localhost:4000/userData`, webT && {
            headers: {
                "Auth":webT
            }
        }).then((res) => {
            console.log("userdataaa", res.data);
            setUserDat(res.data)
        }).catch((err) => {
            console.log("user get",err);
        })

    }, [webT])
    


    
    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(false);
        const curr= userDat._id
       userDat && axios.put(`http://localhost:4000/edit/${curr}`, userDat)
            .then((res) => {
                console.log(res);
                alert("updated")
            
            }).catch((err) => {
            console.log("post err", err);
        })
        console.log("this is update",userDat);
    }

    return (
        <div>
            {userDat.status == "disabled" ? <Login /> :
                <div><h3>Welcome {userDat.name}</h3>

<h5>Name: <span>{userDat.name}</span></h5>
<h5>Email: <span>{userDat.email}</span></h5>
<h5>ID: <span>{userDat._id}</span></h5>
<h5>Role: <span>{userDat.role==0?"User":null}</span></h5>

{edit?<form onSubmit={(e)=>handleEdit(e)}>
    <label>Name:</label> <input type='text' value={userDat.name} placeholder={userDat.name} onChange={(e) => setUserDat({ ...userDat, name: e.target.value })} /> <br />
   <label>Email:</label> <input type='email' value={userDat.email} placeholder={userDat.email} onChange={ (e)=>setUserDat({...userDat, email:e.target.value})}/> <br />
    <button className="btn btn-secondary m-2" type="submit" >Done</button>
</form>:null} 

<button onClick={()=>setEdit(true)}>Edit</button></div>}
            
            
        </div>
    )
}
