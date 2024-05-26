import { Link, Outlet, useNavigate } from "react-router-dom"
import Logo from '../../imgs/logo.png'
import { removeFromsession } from "../config/session";
import { useContext } from "react";
import { Usercontext } from "../App";
import ProfileIcon from '../../imgs/user.png'
import LogoutIcon from '../../imgs/logout.png'
const Navbar = () => {
    const navigate = useNavigate();
    const { userAuth, setUserAuth } = useContext(Usercontext)

     const handlelogout = (e) => {
        e.preventDefault();
        removeFromsession("user")
        navigate("/")
        setUserAuth({ accessToken: null })
    }
    return (
        <>
            <nav className="navbar border-solid border-b border-black">
                <Link to={'/user/' + userAuth.id} className="text-2xl center">
                    <img src={Logo} alt="logo" className="w-[10px]" />
                    <h1>Note<span className="text-my-green">-It </span></h1>
                </Link>
                <div className="center gap-1">
                    <button onClick={handlelogout} className="py-2 px-4 rounded text-my-green center hover:underline">
                        <img src={LogoutIcon} alt="profileicon" className="w-[15px]" />
                        <p className="font-poppins">Logout</p>
                    </button>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar