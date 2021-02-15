import React, { useState } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import SidebarMobile from '../SidebarMobile/SidebarMobile';
import Head from 'next/head';
import SubHeader from '../SubHeader/SubHeader';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
NProgress.configure({ easing: 'ease', speed: 100 });
Router.events.on('routeChangeStart', () => {
    console.log('start');
    NProgress.start();
});
Router.on;
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Layout = ({ children, title }) => {
    const [openSidedrawer, setopenSidedrawer] = useState(false);
    const subheaderShow = useSelector((state) => state.videoCategory.subHeaderVisible);
    return (
        <React.Fragment>
            <Head>
                {' '}
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="title" content="Artbot" />
                <meta name="description" content="Artbot is a social media platform." />
                <title>{title}</title>
            </Head>
            <div className="app">
                <header className="app-header">
                    <Header changeHandler={() => setopenSidedrawer(!openSidedrawer)} />
                </header>
                <SidebarMobile
                    open={openSidedrawer}
                    changeHandler={() => setopenSidedrawer(false)}
                />

                <div className="app-body">
                    <div className="app-sidebar">
                        <Sidebar />
                    </div>
                    <main className="app-main">
                        {subheaderShow && (
                            <div className="app-main-subheader mb-2">
                                {/* <p className="text-white">Rohail</p> */}
                                <SubHeader />
                            </div>
                        )}
                        <div className="app-main-content">{children}</div>
                    </main>
                </div>
                <footer className="app-footer">
                    <Footer />
                </footer>
            </div>
            {/*<div className="row no-gutters">
                <div className="col-12 col-sm-3  col-xl-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-sm-9 col-xl-10">
                    <SubHeader />
                    <div className="layout-content">{children}</div>
                </div>
            </div> */}
        </React.Fragment>
    );
};

Layout.defaultProps = {
    title: 'ArtBot'
};

export default Layout;
