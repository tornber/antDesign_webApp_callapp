import React, { useEffect } from 'react';
import './App.css';
import useUsersStore from './store';
import UserTable from './components/Table';
import axiosInstance from './utils/axiosInstance';
import PieChart from './components/PieChart';

function App() {

  const {userData,changeUserData,isChanged}  = useUsersStore()

  useEffect(() => {
    axiosInstance.get('/users').then(res => {
      changeUserData(res.data)
    })
    axiosInstance.get('/chartData').then(res => {
      console.log(res)
    })
  },[isChanged])

  return (
    <div className="App">
      {userData ? (<UserTable data={userData}/>) : (<h1>Loading...</h1>)}
      {/* <PieChart /> */}
    </div>
  );
}

export default App;
