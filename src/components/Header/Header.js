import Link from 'next/link';
import Brand from '../Brand/Brand';
import HeaderSearchbar from '../HeaderSearchbar/HeaderSearchbar';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
const Header = ({ changeHandler }) => {
    return (
        <nav id="navbar" className="navbar py-0 navbar-light fixed-top">
            <div className="container-fluid h-100 p-0">
                <div className="row w-100">
                    <div className="col-3 col-xl-2 brand-wrapper">
                        <div className="d-flex flex-column h-100 justify-content-center align-items-center">
                            <a
                                onClick={changeHandler}
                                className="brand-toggler pointer"
                                id="show-menu">
                                <i className="fas fa-bars"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-9 col-xl-10 my-auto">
                        <div className="row">
                            <div className="col-8 brand-wrapper my-auto">
                                <Brand />
                                <div className="d-none d-sm-block">
                                    <HeaderSearchbar />
                                </div>
                                {/* <input className="form-control d-none d-sm-block" /> */}
                            </div>
                            <div className="col-4 my-auto">
                                <div className="d-flex justify-content-end ml-2 ml-sm-0">
                                    <ProfileMenu />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
