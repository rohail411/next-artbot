import React, { useState, useEffect } from 'react';
import { clearState, update } from '../../../redux/actions/videoUpload';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { getAudio, editAudio } from '../../../services/audio';
import EditContentForm from '../../../components/EditContentForm/EditContentForm';
import imgCompress from '../../../utils/imageCompression';
import { ipfsUpload } from '../../../utils/ipfs';
import Layout from '../../../components/Layout/Layout';
import Router from 'next/router';
import { authInitialProps } from '../../../utils/withAuth';
function AudioEdit({ thumbnail, update, title, desc, tags, genre, user }) {
    const history = useRouter();
    const [maturity, setMaturity] = useState(false);
    const [files, setFiles] = useState([]);
    const [message, setMessage] = useState({ message: '', loading: false });
    const [videoUser, setVideoUser] = useState(null);
    const [subscriberOnly, setSubscriberOnly] = useState(false);

    useEffect(() => {
        let mount = true;
        async function getVideoDetails() {
            const response = await getAudio(Router.query.id);
            if (response && mount) {
                const res = response.album;
                if (res.user._id !== user._id) {
                    Router.replace('/');
                }
                const data = {
                    title: res.title,
                    description: res.description,
                    tags: res.tags.split(','),
                    genre: [],
                    thumbnail: `https://ipfs.io/ipfs/${res.thumbnailHash}`
                };
                if (res.genre) data.genre = res.genre.split(',');
                if (res.subscriberOnly) setSubscriberOnly(res.subscriberOnly);
                setFiles(res.files);
                setVideoUser(res.user);
                update(data);
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
        if (videoUser._id !== user._id) return;
        let thumb = null;
        if (thumbnail.file) {
            const compImg = await imgCompress(thumbnail.file);
            const { ipfs, error } = await ipfsUpload();
            if (error) return;
            const thumbanilImage = await ipfs.add(compImg);
            thumb = thumbanilImage.path;
        }
        const data = {
            _id: Router.query.id,
            title: title,
            description: desc,
            genre: genre.join(','),
            tags: tags.join(','),
            thumbnailHash: thumb ? thumb : thumbnail.url.split('https://ipfs.io/ipfs/')[1],
            files: files,
            subscriberOnly: subscriberOnly
        };
        const responseData = await editAudio(data);
        if (responseData.data.code === 'ABT0000') {
            history.replace(`/profile/${videoUser._id}`);
        }
    };
    return (
        <Layout>
            <EditContentForm
                submitHandler={submitHandler}
                type="Audio"
                bgColor="bg-color-purple"
                message={message}
                maturity={maturity}
                setMaturity={setMaturity}
                subscriberOnly={subscriberOnly}
                setSubscriberOnly={setSubscriberOnly}
            />
        </Layout>
    );
}

AudioEdit.getInitialProps = authInitialProps('protected');

// AudioEdit.getInitialProps = async (ctx) => {
//     return {
//         id: ctx.query.id
//     };
// };

const mapStateToProps = (state) => ({
    thumbnail: state.videoUpload.albumThumbnail,
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

export default connect(mapStateToProps, mapDispatchToProps)(AudioEdit);
