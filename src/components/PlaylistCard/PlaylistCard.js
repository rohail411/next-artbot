import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Span from '../UI/Span/Span';
import { useHistory } from 'react-router-dom';
const PlaylistCard = ({ src, count, id, playlistId }) => {
    const history = useHistory();
    const onClickHandle = () => {
        if (id) history.push({ pathname: `/video/${id}`, state: { playlistId: playlistId } });
    };
    return (
        <div className="playlist-card pointer" onClick={onClickHandle}>
            <Img src={src} className="playlist-card__img img-fluid" />
            <div className="playlist-card__right">
                <P1 className="mb-1 text-white h4">{count}</P1>
                <Icons.MdPlaylistAdd size={30} />
            </div>
            <div className="playlist-card__play">
                <P1 className="mb-0 ">
                    <PlayArrowIcon fontSize="large" />
                    &nbsp;<Span className="font-weight-bold">Play All</Span>
                </P1>
            </div>
        </div>
    );
};
PlaylistCard.defaultProps = {
    src:
        'https://edufolios.org/jsmithportfolio/wp-content/themes/edufolios/images/defaults/default-cover.gif'
};

export default PlaylistCard;
