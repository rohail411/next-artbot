import Img from '../UI/Img/Img';
import Link from 'next/link';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import P1 from '../UI/P1/P1';
import { logout } from '../../redux/reducers/auth.duck';

const ProfileMenu = () => {
    const user = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    if (!user.authToken) {
        return (
            <Link href="/login">
                <a className="text-light">Login</a>
            </Link>
        );
    }

    return (
        <div className="d-flex align-items-center">
            <P1 className=" mb-0 d-none d-sm-block" style={{ color: '#8CDE0D' }}>
                {user.user.username}
            </P1>
            <div className="dropdown">
                <a
                    className="btn dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false">
                    {!user.user?.profile_photo ? (
                        <span className="p-2 px-3 mr-2 rounded text-uppercase text-white font-weight-bold profile-icon-bg">
                            {user.user && user.user.username.split('')[0]}
                        </span>
                    ) : (
                        <Img
                            className="avatar"
                            src={`https://ipfs.io/ipfs/${user.user.profile_photo}`}
                        />
                    )}
                </a>
                <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="dropdownMenuButton">
                    <Link href={`/profile/${user.user._id}`}>
                        <a className="dropdown-item">Profile</a>
                    </Link>
                    {user.user.isAdmin && (
                        <Link href="/admin">
                            <a className="dropdown-item">Admin Dashboard</a>
                        </Link>
                    )}
                    <div
                        onClick={() => {
                            dispatch(logout());
                            Router.push('/');
                        }}>
                        <a className="dropdown-item">Logout</a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileMenu;
