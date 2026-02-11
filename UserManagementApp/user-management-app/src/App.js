import React, {useEffect, useState} from "react";
import {getUsers} from "./api/userApi";
import UserTable from "./components/UserTable";
import CreateUserModal from "./components/CreateUserModal";
import ImportCSV from "./components/ImportCSV";

function App(){

const [users,setUsers]=useState([]);
const [show,setShow]=useState(false);

const loadUsers=()=>{
getUsers().then(res=>{
setUsers(res.data);
});
};

useEffect(()=>{
loadUsers();
},[]);

return(

<div className="container">

<h2>User Management</h2>

<button
className="btn btn-primary"
onClick={()=>setShow(true)}
>
Create User
</button>

<ImportCSV reload={loadUsers}/>

<UserTable users={users}/>

<CreateUserModal
show={show}
close={()=>{
setShow(false);
loadUsers();
}}
/>

</div>

);

}

export default App;
