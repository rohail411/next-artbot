import React, { useState, useEffect } from 'react';
import { clearState, update } from '../../../redux/actions/videoUpload';
import { connect } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { getVideo, editVideo } from '../../../services/video';
import EditContentForm from '../../../components/EditContentForm/EditContentForm';
import { ipfsUpload } from '../../../utils/ipfs';
import imgCompress from '../../../utils/imageCompression';
import Layout from '../../../components/Layout/Layout';
import { authInitialProps } from '../../../utils/withAuth';
function VideoEdit({ thumbnail, update, title, desc, tags, genre, user, videoThumbnailUrl }) {
    const history = useRouter();
    const [maturity, setMaturity] = useState(false);
    const [message, setMessage] = useState({ message: '', loading: false });
    const [videoUser, setVideoUser] = useState(null);
    const [subscriberOnly, setSubscriberOnly] = useState(false);
    useEffect(() => {
        let mount = true;
        async function getVideoDetails() {
            const responseData = await getVideo(Router.query.id);
            if (responseData.data && mount) {
                if (responseData.data.media.user._id !== user._id) {
                    history.replace('/');
                }
                setMaturity(responseData.data.media.maturityContent);
                const res = responseData.data.media;
                const data = {
                    title: res.title,
                    description: res.description,
                    tags: res.tags.split(','),
                    thumbnail: `https://ipfs.io/ipfs/${res.thumbnailHash}`
                };
                if (res.subscriberOnly) setSubscriberOnly(res.subscriberOnly);
                if (res.genre !== null) data.genre = res.genre.split(',');
                else data.genre = [];
                update(data);
                setVideoUser(res.user);
            }
        }
        getVideoDetails();
        return () => {
            mount = false;
        };
    }, []);
    const submitHandler = async (e) => {
        e.preventDefault();
        if (videoUser._id !== user._id) return;
        window.scrollTo(0, 0);
        setMessage({ message: 'Please wait while processing...', loading: true });
        let thumb = null;
        if (thumbnail.file) {
            const img = await imgCompress(thumbnail.file);
            const { ipfs, error } = await ipfsUpload();
            if (error) return;
            const imgUrl = await ipfs.add(img);
            thumb = imgUrl.path;
        }
        const data = {
            _id: Router.query.id,
            title: title,
            description: desc,
            genre: genre.join(','),
            tags: tags.join(','),
            thumbnailHash: thumb ? thumb : thumbnail.url.split('https://ipfs.io/ipfs/')[1],
            subscriberOnly: subscriberOnly
        };
        const responseData = await editVideo(data);
        if (responseData.data.code === 'ABT0000') {
            history.replace(`/profile/${user._id}`);
        }
    };
    return (
        <Layout>
            <EditContentForm
                submitHandler={submitHandler}
                type="Video"
                bgColor="bg-color-blue"
                message={message}
                maturity={maturity}
                setMaturity={setMaturity}
                subscriberOnly={subscriberOnly}
                setSubscriberOnly={setSubscriberOnly}
            />
        </Layout>
    );
}
VideoEdit.getInitialProps = authInitialProps('protected');
// VideoEdit.getInitialProps = async (ctx) => {
//     return {
//         id: ctx.query.id
//     };
// };
const mapStateToProps = (state) => ({
    thumbnail: state.videoUpload.albumThumbnail,
    videoThumbnailUrl: state.videoUpload.thumbnail,
    title: state.videoUpload.title.value,
    desc: state.videoUpload.description.value,
    tags: state.videoUpload.tags,
    genre: state.videoUpload.genres,
    user: state.auth.user
});
const mapDispatchToProps = (dispatch) => ({
    update: (data) => dispatch(update(data)),
    clear: () => dispatch(clearState())
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoEdit);
