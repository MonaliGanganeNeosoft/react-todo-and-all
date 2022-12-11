import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom'
export default function Navbaar() {
    const [state, setState] = useState({})
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwtDecode(token)
            setState(decode)
        }
        else{
            navigate("/")
        }
    }, [])
    const logout = () => {
        localStorage.removeItem('_token');
    }
    return (
        <>
            <nav className="navbar justify-content-between" style={{ backgroundColor: "black" }}>
                <div>
                    <Link className="navbar-brand" to="/dashboard">            
                        <img src={`../images/${state.profile}`} alt='Profile' className='profile_img' />
                        <span className='text-white font-weight-bold ml-2'> Hello {state.firstname} {' '} {state.lastname} </span>
                    </Link>


                </div>
                <form className="form-inline">

                    <button className="btn btn-outline-danger my-2 my-sm-0" onClick={() => logout()}>Logout</button>
                </form>
            </nav>
        </>
    )
}
