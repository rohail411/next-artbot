import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
const PlaylistMediaCard = ({ active, src, duration, title, username, id, index, playlistId }) => {
    const history = useHistory();
    return (
        <div
            onClick={() =>
                history.push({
                    pathname: `/video/${id}`,
                    state: { playlistId }
                })
            }
            className={`playlist-video__body--card ${clsx({ active: active === id })}`}>
            <P1 className="my-auto text-white">
                {' '}
                {active === id ? <PlayArrowIcon fontSize="small" /> : index + 1}
            </P1>
            <div className="playlist-video__body--card--left">
                <Img src={src} className="img-fluid" />
                <P1 className="text-white">{duration}</P1>
            </div>
            <div className="playlist-video__body--card--right">
                <P1 className="mb-0 text-white playlist-video__body--card--right--title">
                    {title?.substring(0, 50)}
                    {title?.length > 50 ? '...' : ''}{' '}
                </P1>
                <P1 className="mb-0 playlist-video__body--card--right--user">{username}</P1>
            </div>
        </div>
    );
};

export default PlaylistMediaCard;
