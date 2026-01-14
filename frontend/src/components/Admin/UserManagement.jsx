import React, { useState } from 'react'

const UserManagement = () => {
    const [demoData, setDemoData] = useState([
        {
            _id: 1,
            name: "Basanta",
            email: "basanta@gmil.com",
            role: "Admin"
        },
        {
            _id: 2,
            name: "Basanta",
            email: "basanta@gmil.com",
            role: "Admin"
        },
        {
            _id: 3,
            name: "Basanta",
            email: "basanta@gmil.com",
            role: "Admin"
        },
    ])
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: "Customer"
    })
    const handleInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newData = {
            _id: Date.now(),
            name: userData.name,
            email: userData.email,
            role: userData.role
        }
        setDemoData([...demoData, newData])
        setUserData({ name: "", email: "", password: "", role: "Customer" });
        // ....
    }
    const updateRoleData =(id, value)=>{
        { setDemoData(demoData.map((data)=> 
            data._id == id ? {...data, role : value}: data
        ))}
    }
    const deleteUser = (id) => {
    setDemoData(demoData.filter(u => u._id !== id));
  };
    return (
        <div className='container min-h-screen w-full p-6 md:p-12'>
            <h1 className='font-bold'>User Management</h1>
            <div className='p-2 md:p-6'>
                <p className='font-semibold py-3'>Add new user</p>
                <form onSubmit={handleSubmit}>
                    <label className='text-gray-700' >Name</label>
                    <input
                        type="text"
                        name='name'
                        required
                        value={userData.name}
                        onChange={handleInput}
                        className='w-full border rounded border-gray-400 p-1 mb-4'
                    />
                    <label className='text-gray-700' >Email</label>
                    <input
                        type="email"
                        name='email'
                        required
                        value={userData.email}
                        onChange={handleInput}
                        className='w-full border rounded border-gray-400 p-1 mb-4'
                    />
                    <label className='text-gray-700' >Password</label>
                    <input
                        type="password"
                        name='password'
                        required
                        value={userData.password}
                        onChange={handleInput}
                        className='w-full border rounded border-gray-400 p-1 mb-4'
                    />
                    <label className='text-gray-700 block' >Role</label>
                    <select value={userData.role} onChange={handleInput} className='border border-gray-400 rounded p-1 w-full'>
                        <option value="admin" >Admin</option>
                        <option value="customer">Customer</option>
                    </select>
                    <button type='submit' className='px-3 py-2 bg-green-600 hover:bg-green-700 rounded my-4 text-white/90 cursor-pointer'>Add User</button>
                </form>
            </div>
            {/* users */}
            <div>
                <div className='flex justify-between bg-gray-300 rounded py-1 px-6'>
                    <p>NAME</p>
                    <p>EMAIL</p>
                    <p>ROLE</p>
                    <p>ACTION</p>
                </div>
                {demoData.length > 0 ?
                    demoData.map((data) => (
                            <div key={data._id} className='text-sm text-gray-700 flex justify-between shadow-2xs py-2 px-6'>
                                <p >{data.name}</p>
                                <p>{data.email}</p>
                                <select value={data.role} onChange={(e) => updateRoleData(data._id, e.target.value)} className='border border-gray-400 rounded p-1'>
                                    <option value="admin" >Admin</option>
                                    <option value="customer" >Customer</option>
                                </select>
                                <button onClick={()=>deleteUser(data._id)} className='px-2 py-1 rounded bg-red-600 cursor-pointer text-white/90 '>Delete</button>
                            </div>
                        )
                    ): (
                        <p>There is no user</p>
                    )
                }
            </div>

        </div>
    )
}

export default UserManagement