import { useContext } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { Usercontext } from '../App';
import { lookInsession } from './session';


const privateRoute = () => {
    const { id } = useParams();
    const { userAuth } = useContext(Usercontext)
    const activeUser = userAuth ? userAuth.id : null;
    const session = JSON.parse(lookInsession('user')) || null;
    const sessionId = session? session.id : null;
    return (
         id ===  sessionId ? (
            <Outlet />
        ) : (
            <Navigate to='/' />
        )
    )
};

export default privateRoute;
