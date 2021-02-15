import clsx from 'clsx';
import React from 'react';
import P1 from '../UI/P1/P1';
export default React.memo(({ changehandler, active }) => (
    <div className="profile-navigation d-flex align-content-center flex-wrap mb-4">
        <P1
            onClick={() => changehandler('fvideo')}
            className={clsx({ 'rounded sub-menu-bg color-blue': active === 'fvideo' })}>
            Featured Video
        </P1>
        <P1
            onClick={() => changehandler('video')}
            className={clsx({ 'rounded sub-menu-bg color-blue': active === 'video' })}>
            Video
        </P1>
        <P1
            onClick={() => changehandler('audio')}
            className={clsx({ 'rounded sub-menu-bg color-purple': active === 'audio' })}>
            Audio
        </P1>
        <P1
            onClick={() => changehandler('image')}
            className={clsx({ 'rounded sub-menu-bg color-blue': active === 'image' })}>
            Image
        </P1>
        <P1
            onClick={() => changehandler('ads')}
            className={clsx({ 'rounded sub-menu-bg color-blue': active === 'ads' })}>
            Ads
        </P1>
        <P1
            onClick={() => changehandler('users')}
            className={clsx({ 'rounded sub-menu-bg color-blue': active === 'users' })}>
            Users
        </P1>
        <P1
            onClick={() => changehandler('logs')}
            className={clsx({ 'rounded sub-menu-bg color-blue': active === 'logs' })}>
            Logs
        </P1>
    </div>
));
