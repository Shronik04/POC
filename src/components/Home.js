import React, { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";
import { Redirect } from "react-router";

export default function Home() {
  const [check, setCheck] = useState("");
  const [role, setRole] = useState("");
  
  var invalid;

  useEffect(() => {
    const token = cookie.load("Auth");

    setCheck(token,  console.log(check));
  
   check && axios
      .get(
        `http://localhost:4000/data/show`,
         {
          headers: {
            "Auth": check,
          },
        }
      )
      .then((res) => {
        console.log("dataaaaaaa", res.data);
        setRole(res.data);
        console.log("hello", role);
      })
      .catch((err) => {
        console.log("errorrrrrr", err);
        invalid=err;
      });
  }, [check]);


  return (
    <div>
      {role == "1" ? (
        <Redirect to="/admin" />
      ) : role == "0" ? (
        <Redirect to="user" />
      ) :  role &&(
        <Redirect to="/login" />
      )}
    </div>
  );
}
