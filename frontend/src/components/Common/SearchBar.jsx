import React, {  useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function SearchBar() {
    const [isOpen, setisOpen] = useState(false);
    const [searchValue, setsearchValue] = useState('');
    const ToggleSearch=()=>{
        setisOpen(!isOpen)
    }
    const handleSearchBar=(e)=>{
        e.preventDefault();
        console.log(searchValue);
        setsearchValue('');
    }
  return (
    <div className='relative flex items-center justify-end' >
        {
            isOpen? (
            <form onSubmit={handleSearchBar} className='absolute flex items-center bg-gray-900' >
                <div className='flex space-x-1'>
                    <input 
                    type="text" 
                    placeholder='Search'
                    value={searchValue}
                    onChange={(e)=>setsearchValue(e.target.value)}
                    className='p-2 border border-white  rounded'
                    />
                    <button type='submit' className='cursor-pointer'>
                        <IoIosSearch className='w-7 h-7' />
                    </button>
                    <button className='cursor-pointer'>
                        <IoMdClose onClick={ToggleSearch}/>
                    </button>
                </div>
            </form>
            ) : (
                <button onClick={ToggleSearch}>
                    <IoIosSearch className='w-5.5 h-5.5' />
                </button>
            )
        }
    </div>
  )
}

export default SearchBar;