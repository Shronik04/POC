import axios from 'axios'
import React, { useEffect, useState } from 'react'
import cookie from 'react-cookies'
export default function Admin() {
    const [token, setToken] = useState("");
    const [data, setData] = useState()
    const [flag,setFlag]=useState(false)
    const [ind, setInd] = useState('')
    const [use, setUse] = useState(false);
    const [add, setAdd] = useState(0)
    const [newUser, setNewUser] = useState({
      
        name: "",
        email: "",
        password: "",
        role:""
    })
    //fetch all data
    useEffect(() => {
        const check = cookie.load("Auth")
        setToken(check)
        axios
            .get(`http://localhost:4000/all`, token && {
                headers: {
                    "Auth": token
                },
            }).then((res) => {
                console.log("dataaaa", res.data);
                setData(res.data)
            }).catch((err) => {
                console.log(err);
            })
    }, [token, use])
//edit the users
    const handleEdit = (e, index) => {
        e.preventDefault();
        setFlag(false)
        const curr = data[index]._id
        data && axios.put(`http://localhost:4000/edit/${data[index]._id}`, data[index])
            .then((res) => {
                console.log(res);
                alert("updated")

            }).catch((err) => {
                console.log("post err", err);
               
            })
        console.log("this is update", data[index]);
    }

    //delete the users
    const handleDelete = (e, index) => {
        e.preventDefault();
        axios.delete(`http://localhost:4000/${data[index]._id}`)
            .then((res) => {
                // setData(res.data)
                setUse(!use);
                console.log("settled");
                alert("deleted  ")
            }).catch((err) => {
                console.log(err);
            })

    }
    //add user
    function submitForm(e) {
        e.preventDefault();
          newUser &&  axios
        .post("http://localhost:4000/signup", newUser)
        .then(res => {
           
            setAdd(0);
            setUse(!use);
            alert("New user added");
        })
        .catch((err)=>{
          console.log(err);
          
        })
     
    } 
      




    const handleForm = (index) => {
        setFlag(true);
        setInd(index)
    }

    //edit function
    const editName = (e, index) => {
        var dat = [...data];
        setData(dat, (dat[index].name = e.target.value))
    }
    const editEmail = (e,index) => {
        var dat = [...data];
        setData(dat,(dat[index].email=e.target.value))
    }
    const editRole = (e, index) => {
        var dat = [...data];
        setData(dat,(dat[index].role=e.target.value))
    }
    return (    
        <div >
            <h2>hello Admin</h2>
            <table class="table" >
  <thead>
    <tr>
     
      <th scope="col">Name</th>
      <th scope="col">Email</th>
                        <th scope="col">ID</th>
                        <th scope="col">Role</th>
    </tr>
  </thead>
  

            {data &&
                data.map((i, index) => (

                  
                        


                        <tbody>
    <tr  key={index} >
      
      <td>{i.name}</td>
      <td>{i.email}</td>
      <td>{i._id}</td>
      <td>{i.role}</td>
      <td><button className="btn btn-primary" onClick={()=>handleForm(index)}> Edit</button></td>
      <td> <button className="btn btn-primary " onClick={(e) => { handleDelete(e,index) }}> delete</button> </td>
              
    </tr>
       
    {flag  && ind=== index  ? <tr>
                            <td><input type="text" value={i.name} onChange={(e) => editName(e, index)} /></td>
                            <td><input type="text" value={i.email} onChange={(e) => editEmail(e, index)} /></td>
                            <td></td>
                            <td><select value={i.role} onChange={(e) => editRole(e, index)}>
                                
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                            </select></td>
                    <button className="btn btn-primary m-2" type='submit' onClick={(e)=>{handleEdit(e,index)}}>Done</button>
                        </tr> : null}
                       

                    </tbody>))
              
                   

               
                }  {add == 1 ? <tr>
                    <td><input type="text" placeholder="Name" onChange={ (e)=>{setNewUser({...newUser, name: e.target.value})}}/></td>
                        <td><input type="email" placeholder="Email" onChange={ (e)=>{setNewUser({...newUser, email: e.target.value})}}/></td>
                        <td>password:<input type="text" placeholder="Password" onChange={ (e)=>{setNewUser({...newUser, password: e.target.value})}} /></td>

                        <td><select onChange={ (e)=>{setNewUser({...newUser, role: e.target.value})}} >
                                
                                <option value="0">User</option>
                                <option value="1">Admin</option>
                            </select></td>
<button onClick={(e)=>{submitForm(e)}}>ADD</button>
                    </tr>:null}
               
                </table>
            



            <button onClick={()=>{setAdd(1)}}>Add User</button>
        </div>
    )
}