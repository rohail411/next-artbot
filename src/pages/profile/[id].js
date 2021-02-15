import React, { useState, useEffect } from 'react';
// import ProfileSubNavigation from '../../../components/ProfileSubNavigation/ProfileSubNavigation';
import ProfileHeadSection from '../../components/ProfileHeadSection/ProfileHeadSection';
import { connect, useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { featuredVideo, profileClean } from '../../redux/actions/profile';
import ProfileNavigation from '../../components/ProfileNavigation/ProfileNavigation';
import ProfileVideoSection from '../../components/ProfileVideoSection/ProfileVideoSection';
import ProfileAudioSection from '../../components/ProfileAudioSection/ProfileAudioSection';
import ProfileAboutSection from '../../components/ProfileAboutSection/ProfileAboutSection';
import Layout from '../../components/Layout/Layout';
import { subheaderChange } from '../../redux/actions/videoCategory';
const ProfileMonetization = dynamic(() =>
    import('../../components/ProfileMonetization/ProfileMonetization')
);
const ProfileTransactionHistory = dynamic(() =>
    import('../../components/ProfileTransactionHistory/ProfileTransactionHistory')
);
const ProfileCashoutInfo = dynamic(() =>
    import('../../components/ProfileCashoutInfoSection/ProfileCashoutInfoSection')
);
const ProfileSubscriptions = dynamic(() =>
    import('../../components/ProfileSubscriptions/ProfileSubscriptions')
);

function Profile({ user, id }) {
    const [activeTab, setActiveTab] = useState('video');
    const dispatch = useDispatch();
    useEffect(() => {
        let mount = true;
        dispatch(subheaderChange());
        return () => {
            mount = false;
            dispatch(subheaderChange());
            dispatch(profileClean());
        };
    }, []);

    return (
        <Layout>
            <div className="container-fluid">
                {/* <ProfileHeadSection /> */}
                {(activeTab === 'video' || activeTab === 'audio') && <ProfileHeadSection id={id} />}
                {/** Profile Nevigation */}
                <ProfileNavigation
                    changehandler={setActiveTab}
                    active={activeTab}
                    activeUser={user?._id === id}
                />
                {/** Profile Video */}
                {activeTab === 'video' && <ProfileVideoSection id={id} />}
                {/* Profile Audio Section */}
                {activeTab === 'audio' && <ProfileAudioSection id={id} />}
                {/* Profile About Section */}
                {activeTab === 'about' && <ProfileAboutSection id={id} />}
                {/* Profile Monetization Section */}
                {user?._id === id && activeTab === 'monetization' && <ProfileMonetization />}
                {/* Profile Transaction History */}
                {user?._id === id && activeTab === 'history' && <ProfileTransactionHistory />}
                {/* Profile CashoutInfo */}
                {user?._id === id && activeTab === 'wallet' && <ProfileCashoutInfo />}
                {user?._id === id && activeTab === 'subscriptions' && <ProfileSubscriptions />}
            </div>
        </Layout>
    );
}
Profile.getInitialProps = async (ctx) => {
    return {
        id: ctx.query.id
    };
};
const mapStateToProps = (state) => ({
    user: state.auth.user,
    profile: state.profile.profileUser
});

export default connect(mapStateToProps, { featuredVideo })(Profile);
