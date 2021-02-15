import React from 'react';
import P1 from '../../components/UI/P1/P1';
import WatchAndRevenue from '../../components/WatchAndRevenue/WatchAndRevenue';
// import RelatedVideoCard from '../../components/RelatedVideoCard/RelatedVideoCard';
import VideoChannelInfo from '../../components/VideoChannelInfo/VideoChannelInfo';
import VideoGenrTags from '../../components/VideoGenrTags/VideoGenrTags';
import VideoCommentSection from '../../components/VideoCommentSection/VideoCommentSection';
import VideoDescription from '../../components/VideoDescription/VideoDescription';
import { connect } from 'react-redux';
import VideoTabs from '../../components/VideoTabs/VideoTabs';
import VideoCredits from '../../components/VideoCredits/VideoCredits';
import { videoEditUrl } from '../../redux/actions/videoCategory';
import { getVideo } from '../../services/video';
import {
    getComments,
    isFollow,
    addFollow,
    removeFollow,
    updateWatchTime,
    saveComment,
    mediaView,
    paymentAdd,
    paymentSubscribe,
    paymentStripe
} from '../../services/util';
import VideoCard from '../../components/VideoCard/VideoCard';
import { paymentProfile, selectSubscription } from '../../redux/actions/profile';
import Dialog from '../../components/UI/Dialog/Dialog';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Switch from '@material-ui/core/Switch/Switch';
import CircularProgress from '../../components/UI/CircularProgress/CircularProgress';
import FileDownload from 'file-saver';
import axios from 'axios';
import Player from '../../components/Player/Player';
import Layout from '../../components/Layout/Layout';
// import VideoPlayer from '../components/UI/VideoPlayer/VideoPlayer';

class SingleVideoPlay extends React.Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
    }
    state = {
        autoPlay: true,
        relatedVideos: this.props.relatedVideos$,
        video: this.props.video$,
        user: this.props.user$,
        comments: [],
        commentInput: {
            value: '',
            touch: false,
            error: false
        },
        following: false,
        tab: 'comments',
        videoAdmin: false,
        subscriberOnly: this.props.subscriberOnly$,
        subscribe: false,
        videoUrl: '',
        modelOpen: false,
        paymentMessage: '',
        progress: {
            show: false,
            value: 0
        }
    };
    _Mounted = false;

    async componentDidMount() {
        this._Mounted = true;
        if (this._Mounted) {
            this.getVideoComments();
            this.checkIsFollowing();
            await mediaView({ mediaId: this.props.video$._id });
            // this.getVideoDetails(videoId);
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.video$._id !== prevProps.video$._id) {
            this.getVideoDetails(this.props.video$._id);
        }
    }

    componentWillUnmount() {
        this._Mounted = false;
        try {
            clearInterval(this.state.videoInterval);
            this.props.videoEditUrl('');
        } catch (error) {}
    }
    captureVideoTime = async () => {
        const { video } = this.state;
        const result = await updateWatchTime({
            id: video._id,
            time: 1
        });
        if (result.status === 200) {
            const updateVideo = {
                ...video,
                secondsWatched: video.secondsWatched + 1
            };
            this.setState({ video: updateVideo });
        }
    };
    videoEnded = () => {
        clearInterval(this.state.videoInterval);
        const { relatedVideos, autoPlay } = this.state;
        if (autoPlay)
            setTimeout(() => this.props.history.push(`/video/${relatedVideos[0]._id}`), 5000);
    };
    videoPause = () => {
        clearInterval(this.state.videoInterval);
    };
    loadVideo = () => {
        clearInterval(this.state.videoInterval);
    };
    playingVideo = () => {
        const interval = setInterval(this.captureVideoTime, 1000);
        this.setState({ videoInterval: interval });
    };
    videoTimeUpdate = () => {
        this.captureVideoTime();
    };
    addListeners = () => {
        try {
        } catch (error) {}
    };
    getVideoComments = async () => {
        const { video, user } = this.state;
        if (video) {
            const getComment = await getComments({
                mediaId: video._id,
                userId: user?._id
            });

            let commentResponse = [];
            if (getComment.status === 200) {
                commentResponse = getComment.data.comments;
            }
            this.setState({ comments: commentResponse });
        }
    };
    getVideoDetails = async (videoId) => {
        const video = await getVideo(videoId, this.props.userId?._id);

        if (video.status === 200 && this._Mounted) {
            let response = video.data;
            if (this.props.userId)
                if (response.media.user._id === this.props.userId._id) {
                    this.props.videoEditUrl(`/video/edit/${response.media._id}`);
                    this.setState({ videoAdmin: true });
                }
            this.setState({
                relatedVideos: response.videos.docs,
                video: response.media,
                user: response.media.user,
                subscriberOnly: response.media.subscriberOnly
            });

            this.getVideoComments();
            this.addListeners();
            this.checkIsFollowing();
            await mediaView({ mediaId: videoId });
        }
    };
    checkIsFollowing = async () => {
        const { userId } = this.props;
        const { user } = this.state;
        if (userId && user) {
            const response = await isFollow({
                following: user._id
            });
            if (response) {
                this.setState({ following: response.following });
            }
        }
    };
    addOrRemoveFollowing = async () => {
        const { following, user } = this.state;
        const { userId } = this.props;
        if (userId) {
            if (following) {
                const response = await removeFollow({
                    following: user._id
                });
                if (response.code === 'ABT0000') this.setState({ following: false });
            } else {
                const response = await addFollow({
                    following: user._id
                });
                if (response.code === 'ABT0000') this.setState({ following: true });
            }
        }
    };

    submitCommentHandler = async (event) => {
        const { userId } = this.props;
        event.preventDefault();
        if (userId) {
            const result = await saveComment({
                mediaId: this.state.video._id,
                parentId: '0',
                comment: this.state.commentInput.value
            });
            if (result.code === 'ABT0000') {
                this.getVideoComments();
                this.setState({ commentInput: { value: '', touch: false, error: false } });
            }
        }
    };
    paymentonSuccessHandler = async (data) => {
        console.log(data);
        const { user, video } = this.state;
        const { subscrPrice, subscrMonth } = this.props;
        let reqData = { ...data };
        reqData.mediaId = video._id;
        reqData.subscribe = user._id;
        reqData.planId = subscrPrice._id;
        reqData.planMonth = subscrMonth;
        const result = await paymentAdd(reqData);
        if (result.code === 'ABT0000') {
            const updateVideo = { ...video, hash: result.hash };
            this.setState({
                video: updateVideo,
                subscribe: true,
                modelOpen: true,
                paymentMessage: 'Payment Transaction Success',
                subscriberOnly: false
            });
            this.props.selectSubscription(null);
            this.props.paymentProfile(true);
        }
    };
    paymentonErrorHandler = (error) => {
        console.log(error);
        this.setState({
            modelOpen: true,
            paymentMessage: 'Something went wrong during the payment process try again later.'
        });
    };
    downloadClickHandler = async () => {
        const { video } = this.state;
        if (!video.hash) return;
        const url = `https://ipfs.io/ipfs/${video.hash}`;
        const response = await axios({
            method: 'GET',
            url: url,
            responseType: 'arraybuffer',
            onDownloadProgress: (progress) => {
                const total = progress.total;
                const videoTotal = 100;
                const videoDone = (progress.loaded * 100) / total;
                const progressToShow = (videoDone * videoTotal) / 100;
                console.log(progressToShow);
                if (Math.floor(progressToShow) === 100)
                    this.setState({ progress: { show: false, value: 0 } });
                else this.setState({ progress: { show: true, value: Math.floor(progressToShow) } });
            }
        });

        const buffer = Buffer.from(response.data, 'base64');
        const b = new File([buffer], video.filename.split('.mp4')[0], { type: 'video/mp4' });
        FileDownload.saveAs(b);
    };
    paymentSubscribehandler = async (data, actions) => {
        const { user, video } = this.state;
        const { subscrPrice, subscrMonth } = this.props;
        let reqData = { ...data };
        reqData.mediaId = video._id;
        reqData.subscribe = user._id;
        reqData.planId = subscrPrice._id;
        reqData.planMonth = subscrMonth;
        const result = await paymentSubscribe(reqData);
        if (result.code === 'ABT0000') {
            const updateVideo = { ...video, hash: result.hash };
            this.setState({
                video: updateVideo,
                subscribe: true,
                modelOpen: true,
                paymentMessage: 'Payment Transaction Success',
                subscriberOnly: false
            });
            this.props.selectSubscription(null);
            this.props.paymentProfile(true);
        }
    };
    stripeSuccesshandler = async (token) => {
        const { user, video } = this.state;
        const { subscrPrice } = this.props;
        let reqData = {};
        reqData.token = token;
        reqData.mediaId = video._id;
        reqData.subscribe = user._id;
        reqData.planId = subscrPrice._id;
        const data = await paymentStripe(reqData);
        console.log(data);
        if (data.code === 'ABT0000') {
            const updateVideo = { ...video, hash: data.hash };
            this.setState({
                video: updateVideo,
                subscribe: true,
                modelOpen: true,
                paymentMessage: 'Payment Transaction Success',
                subscriberOnly: false
            });
            this.props.selectSubscription(null);
            this.props.paymentProfile(true);
        }
    };
    render() {
        const {
            autoPlay,
            relatedVideos,
            user,
            video,
            comments,
            commentInput,
            following,
            tab,
            subscribe,
            paymentMessage,
            modelOpen,
            subscriberOnly,
            progress
        } = this.state;
        const { userId } = this.props;

        return (
            <Layout>
                <div className="container-fluid">
                    {/** Video Play Component  */}
                    {modelOpen && (
                        <Dialog
                            className="custom-dialog "
                            open={modelOpen}
                            handleClose={() => this.setState({ modelOpen: !modelOpen })}
                            scroll="body">
                            <DialogContent dividers={true}>
                                <div className="row col-12 text-light" tabIndex={-1}>
                                    {paymentMessage}
                                </div>
                            </DialogContent>
                        </Dialog>
                    )}
                    {progress.show && <CircularProgress value={progress.value} strokeWidth={4} />}
                    <div className="row ">
                        <div className="col-md-12 col-sm-12 col-xl-9 p-0">
                            {video && (
                                <Player
                                    ref={this.player}
                                    onPlay={this.playingVideo}
                                    onPause={this.videoPause}
                                    onEnd={this.videoEnded}
                                    onWaiting={this.loadVideo}
                                    src={`https://ipfs.io/ipfs/${video.hash}`}
                                    poster={video.thumbnailUrl}
                                />
                            )}
                            {/* {video && <VideoPlayer aspectRatio="16:9" ref={this.player} src={`https://ipfs.io/ipfs/${video.hash}`} 	poster={video.thumbnailUrl}/>} */}

                            {/** Video Mature Section */}
                            {video && video.maturityContent && (
                                <div className="container-fluid my-1 watch-and-revenue">
                                    <P1 className="text-white py-2  d-block text-center mb-0">
                                        This video contains mature content, viewer discretion is
                                        advised.
                                    </P1>
                                </div>
                            )}
                            {/** Video Subscriber Section */}
                            {video && video.subscriberOnly && !subscribe && (
                                <div className="container-fluid my-1 watch-and-revenue">
                                    <P1 className="text-white py-2  d-block text-center mb-0">
                                        Video is only available for Subscriber users.
                                    </P1>
                                </div>
                            )}

                            {/** Video Channel Info  */}
                            {video && (
                                <VideoChannelInfo
                                    title={video.title}
                                    rating={video.rating}
                                    ratingCount={video.ratingCount}
                                    user={user}
                                    userId={userId ? userId._id : null}
                                    follow={following}
                                    followHandler={this.addOrRemoveFollowing}
                                    content_type="video"
                                    id={video._id}
                                    downloadHandler={this.downloadClickHandler}
                                    price={video.price}
                                    subscriberOnly={subscriberOnly}
                                    onSuccess={this.stripeSuccesshandler}
                                    onError={this.paymentonErrorHandler}
                                />
                            )}
                            {/** Video Description */}
                            {video && (
                                <VideoDescription
                                    description={video.description}
                                    uploaded_date={video.created_at}
                                />
                            )}

                            {/** Video Tabs */}
                            {video && (
                                <VideoTabs
                                    current={tab}
                                    type="video"
                                    changeHandler={(current) => this.setState({ tab: current })}
                                />
                            )}
                            {/** Video Credits */}
                            {video && tab === 'credits' && (
                                <VideoCredits username={user.username} credits={video.credits} />
                            )}

                            {/** Mintues Watched and Revenue Section */}
                            {video && tab === 'stats' && (
                                <WatchAndRevenue
                                    mintuesWatched={video.secondsWatched}
                                    views={video.views}
                                    revenue={0}
                                    type="video"
                                />
                            )}
                            {/** Video Genre Tags and uploaded dates */}
                            {video && tab === 'details' && (
                                <VideoGenrTags
                                    gern={video.genre}
                                    tags={video.tags}
                                    uploaded_by={user.username}
                                    uploaded_date={video.created_at}
                                    id={user._id}
                                />
                            )}

                            {/** Comment Section */}
                            {video && tab === 'comments' && (
                                <VideoCommentSection
                                    comments={comments}
                                    value={commentInput.value}
                                    changeHandler={(event) =>
                                        this.setState({
                                            commentInput: {
                                                value: event.target.value,
                                                touch: true,
                                                error: false
                                            }
                                        })
                                    }
                                    submitHandler={this.submitCommentHandler}
                                    type="video"
                                />
                            )}
                        </div>
                        <div className="col-md-12 col-sm-12  col-xl-3 p-0 sidebar">
                            {/** Side bar Auto Play Button */}
                            <div className="d-flex w-100 justify-content-around">
                                <P1 className="text-white h5 font-weight-normal">Up next</P1>
                                <div className="d-flex align-items-start">
                                    <P1 className="text-uppercase mr-1 font-weight-bold mb-0">
                                        AutoPlay
                                    </P1>
                                    <Switch
                                        size="small"
                                        checked={autoPlay}
                                        onClick={() => this.setState({ autoPlay: !autoPlay })}
                                        value="autoPlay"
                                        color="secondary"
                                        className="text-danger"
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                </div>
                            </div>
                            {/** Side bar related Videos */}

                            {relatedVideos.length > 0 &&
                                relatedVideos.map((video, i) => (
                                    <VideoCard
                                        className="video-album"
                                        video={video}
                                        type="video"
                                        key={i}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}

SingleVideoPlay.getInitialProps = async (ctx) => {
    const video = await getVideo(ctx.query.id);
    const response = video.data;
    return {
        id$: response.media._id,
        relatedVideos$: response.videos.docs,
        video$: response.media,
        user$: response.media.user,
        subscriberOnly$: response.media.subscriberOnly
    };
};

const mapStateToProps = (state) => ({
    userId: state.auth.user,
    subscrPrice: state.profile.selectedSubscription,
    subscrMonth: state.profile.planDuration
});

export default connect(mapStateToProps, { videoEditUrl, selectSubscription, paymentProfile })(
    SingleVideoPlay
);
