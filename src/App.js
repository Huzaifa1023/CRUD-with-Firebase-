import React,{ useCallback, useEffect, useState } from 'react';
import './App.css';

import {db} from './config/firebase';
import {doc,collection,getDocs,addDoc,updateDoc,deleteDoc} from 'firebase/firestore'

function App() {
  const [users,setUsers] = useState([]);
  const [name,setName] = useState(""); 
  const [age,setAge] = useState("");
  const [userLoading,setLoading] = useState(false); 
  const userCollectionRef = collection(db,'user');

  const getUsers = useCallback(async()=> {
    setLoading(true)
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc)=> ({id:doc.id,...doc.data()})));
    setLoading(false)
  },[userCollectionRef])

  const addUser = useCallback(async()=> {
    await addDoc(userCollectionRef,{name,age})
    setName("")
    setAge("")
    getUsers();
  },[userCollectionRef,name,age,getUsers])

  const updateAge = useCallback(async(id,age)=> {
    const userDoc = doc(db,"user",id);
    const updatedValues = {age:parseInt(age)+1};
    await updateDoc(userDoc,updatedValues)
    getUsers()
  },[getUsers])

  const deleteUser = useCallback(async(id)=> {
    const userDoc = doc(db,"user",id);
    await deleteDoc(userDoc)
    getUsers()
  },[getUsers])

  useEffect(()=>{
    getUsers()
  },[getUsers])

 
  return (
    <div className="App">
      <input type="text" placeholder='name' value={name} onChange={(e)=> setName(e.target.value)} />
      <input type="number" placeholder='age' value={age} onChange={(e)=> setAge(e.target.value)} />
      <button onClick={addUser}>Add User</button>
      {
        users.map((user)=> {
          return(
            <div key={user.id}>
              <h1>{user.name}</h1>
              <p>{user.age}</p>
              <button onClick={()=> updateAge(user.id,user.age)}>Increment Age</button>
              <button onClick={()=> deleteUser(user.id)}>Delete User</button>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
