import { Link, Navigate } from "react-router-dom"
import GoogleIcon from '../../imgs/google-logo.png'
import { app } from '../config/firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from "axios"
import { storeInsession } from "../config/session";
import { useContext, useState } from "react";
import { Usercontext } from "../App";
import Loading from '../components/Loading'
import toast from "react-hot-toast";


const Login = () => {
    const auth = getAuth(app);
    const [loading, isloading] = useState(false)
    let { userAuth, setUserAuth } = useContext(Usercontext);

    const handleauth = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then(async (result) => {
                isloading(true)
                await sendAccessTokenToBackend(result.user.accessToken);
                isloading(false)
            }).catch((error) => {
                toast.error("Failed to sign in", error);
                isloading(false);
            })
    }
    const sendAccessTokenToBackend = async (accessToken) => {
        try {
            isloading(true)
            const response = await axios.post(import.meta.env.VITE_SERVER_ROUTE, { accessToken })
            storeInsession("user", JSON.stringify(response.data));
            await setUserAuth(response.data);
            isloading(false)
        }catch (error) {
            toast.error("Failed to sign in", error);
            isloading(false);
        }

    };

    return (
        !userAuth.name ?
            <section className="loginContainer">

                <h3 className="text-2xl font-bold">Welcome to Note<span className="text-my-green">-It</span> </h3>
                <p className="mb-4">Login to get started</p>
                <Link onClick={handleauth} className="center py-4 px-2 w-[280px] rounded-md bg-gray-100">
                    {loading ? <Loading /> :
                        <>
                            <img src={GoogleIcon} alt="googleIcon" className="w-[25px]" />
                            <div className=" text-md ">Continue With Google</div>
                        </>
                    }
                </Link>
            </section>
            :
            <Navigate to={"/user/" + userAuth.id} />
    )
}

export default Login