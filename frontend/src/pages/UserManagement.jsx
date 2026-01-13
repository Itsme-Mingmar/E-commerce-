import React, { useState } from 'react'

const UserManagement = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
        role: ""
    })
    const handleInput = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit =()=>{
        // ....
    }
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
                </form>
            </div>

        </div>
    )
}

export default UserManagement