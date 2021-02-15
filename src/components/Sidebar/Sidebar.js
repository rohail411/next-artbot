import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
const Sidebar = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = React.useState('1');
    const chnageActiveTab = (active) => {
        setActiveTab(active);
    };
    React.useEffect(() => {
        switch (router.pathname) {
            case '/':
            case '/about-us':
            case '/financials':
                setActiveTab('1');
                break;
            case '/video':
                setActiveTab('2');
                break;
            case '/audio':
                setActiveTab('3');
                break;
            default:
                break;
        }
    }, [router]);
    return (
        <nav id="sidebar" className="sidebar d-none d-sm-block">
            <ul className="nav-menu-items">
                <div className="brand-wrapper px-4">
                    <Link href="/">
                        <a>
                            <img src="/img/artbot-logo.png" className="brand" />
                        </a>
                    </Link>{' '}
                </div>
                <ul className="nav">
                    <li className={`nav-item nav-dropdown ${clsx({ open: activeTab === '1' })}`}>
                        <Link href="/">
                            <a
                                className="nav-link nav-dropdown-toggle"
                                onClick={() => chnageActiveTab('1')}>
                                <i className="fas fa-home fa-icon"></i> Home
                            </a>
                        </Link>
                        <ul className="nav-dropdown-items">
                            <li className="nav-item">
                                <Link href="/about-us">
                                    <a
                                        className={`nav-link ${clsx({
                                            'active-sub-menu': router.pathname === '/about-us'
                                        })}`}>
                                        About
                                    </a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/financials">
                                    <a
                                        className={`nav-link ${clsx({
                                            'active-sub-menu': router.pathname === '/financials'
                                        })}`}>
                                        Financial
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li
                        className={`nav-item nav-dropdown ${clsx({
                            open: activeTab === '2'
                        })}`}>
                        <Link href="/video">
                            <a
                                className="nav-link nav-dropdown-toggle"
                                onClick={() => chnageActiveTab('2')}>
                                <i className="fas fa-play-circle fa-icon"></i> Video
                            </a>
                        </Link>
                        <ul className="nav-dropdown-items">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${clsx({
                                        'active-sub-menu': router.pathname === '/video'
                                    })}`}>
                                    Library
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li
                        onClick={() => chnageActiveTab('3')}
                        className={`nav-item nav-dropdown ${clsx({
                            open: activeTab === '3'
                        })}`}>
                        <Link href="/audio">
                            <a className="nav-link nav-dropdown-toggle">
                                <i className="fas fa-music fa-icon"></i> Audio
                            </a>
                        </Link>
                        <ul className="nav-dropdown-items">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${clsx({
                                        'active-sub-menu': router.pathname === '/audio'
                                    })}`}>
                                    Library
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </ul>
        </nav>
    );
};

export default Sidebar;
