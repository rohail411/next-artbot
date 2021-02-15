import Link from 'next/link';
import React from 'react';
import { useRouter, withRouter } from 'next/router';
import Icons from '../UI/ReactIcons/ReactIcons';
import EditIcon from '@material-ui/icons/Edit';
import SearchFilter from '../SearchFilter/SearchFilter';
import SortByFilter from '../SortByFilter/SortByFilter';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { videoCategory } from '../../redux/actions/videoCategory';

const Subhaeder = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const category = useSelector((state) => state.videoCategory.videoCategory);
    const user = useSelector((state) => state.auth.user);
    const currentLocation = router.pathname;
    let showBar = false;
    if (currentLocation === '/video') showBar = true;
    if (currentLocation === '/videoAd') showBar = true;
    if (currentLocation === '/audio') showBar = true;
    if (currentLocation === '/image') showBar = true;
    const categoryChange = (cat) => {
        dispatch(videoCategory(cat));
    };
    return (
        <div className="d-flex justify-content-between text-white w-100 h-100">
            <div className="d-flex justify-content-between w-85">
                <div className="d-flex">
                    {showBar && (
                        <React.Fragment>
                            <div
                                className={`mx-2 pointer  px-2 py-1 rounded  ${
                                    category === 'trending' ? 'sub-menu-bg' : ''
                                }`}
                                onClick={() => categoryChange('trending')}>
                                <Icons.FaFire color="#fff" />
                                &nbsp; Trending
                            </div>
                            <div
                                className={`mx-2 pointer  px-2 py-1 rounded  ${
                                    category === 'top_rated' ? 'sub-menu-bg' : ''
                                }`}
                                onClick={() => categoryChange('top_rated')}>
                                <Icons.FaStar color="#fff" />
                                &nbsp;Top Rated
                            </div>
                            <div
                                className={`mx-2 pointer  px-2 py-1 rounded  ${
                                    category === 'newest' ? 'sub-menu-bg' : ''
                                }`}
                                onClick={() => categoryChange('newest')}>
                                <Icons.FaClock color="#fff" />
                                &nbsp; Newest
                            </div>
                        </React.Fragment>
                    )}
                    {(currentLocation === '/videoAd/upload' ||
                        currentLocation === '/videoAd/details' ||
                        currentLocation === '/videoAd/monetization') && (
                        <React.Fragment>
                            <Link href="/videoAd/upload">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-blue font-weight-bold':
                                            currentLocation === '/videoAd/upload'
                                    })}`}>
                                    {' '}
                                    Ad Upload
                                </a>
                            </Link>
                            <Link href="/videoAd/details">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-blue font-weight-bold':
                                            currentLocation === '/videoAd/details'
                                    })}`}>
                                    {' '}
                                    Ad Details
                                </a>
                            </Link>
                            <Link href="/videoAd/monetization">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-blue font-weight-bold':
                                            currentLocation === '/videoAd/monetization'
                                    })}`}>
                                    {' '}
                                    Monetization
                                </a>
                            </Link>
                        </React.Fragment>
                    )}
                    {currentLocation.startsWith('/audioAd') && (
                        <React.Fragment>
                            <Link href="/audioAd/details">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-purple font-weight-bold':
                                            currentLocation === '/audioAd/details'
                                    })}`}>
                                    Ad Details
                                </a>
                            </Link>
                            <Link href="/audioAd/monetization">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-purple font-weight-bold':
                                            currentLocation === '/audioAd/monetization'
                                    })}`}>
                                    Monetization
                                </a>
                            </Link>
                        </React.Fragment>
                    )}
                    {(currentLocation === '/video/upload' ||
                        currentLocation === '/video/credits' ||
                        currentLocation === '/video/monetization') && (
                        <React.Fragment>
                            <Link href="/video/upload">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-blue font-weight-bold':
                                            currentLocation === '/video/upload'
                                    })}`}>
                                    Video Upload
                                </a>
                            </Link>
                            <Link href="/video/monetization">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-blue font-weight-bold':
                                            currentLocation === '/video/monetization'
                                    })}`}>
                                    Monetization
                                </a>
                            </Link>
                        </React.Fragment>
                    )}
                    {(currentLocation === '/audio/upload' ||
                        currentLocation === '/audio/tracks' ||
                        currentLocation === '/audio/monetization') && (
                        <React.Fragment>
                            <Link href="/audio/upload">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-purple font-weight-bold':
                                            currentLocation === '/audio/upload'
                                    })}`}>
                                    {' '}
                                    Audio Info
                                </a>
                            </Link>

                            <Link href="/audio/tracks">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-purple font-weight-bold':
                                            currentLocation === '/audio/tracks'
                                    })}`}>
                                    {' '}
                                    Tracks
                                </a>
                            </Link>
                            <Link href="/audio/monetization">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-purple font-weight-bold':
                                            currentLocation === '/audio/monetization'
                                    })}`}>
                                    {' '}
                                    Monetization
                                </a>
                            </Link>
                        </React.Fragment>
                    )}
                    {(currentLocation === '/image/upload' ||
                        currentLocation === '/image/uploadImg' ||
                        currentLocation === '/image/credits') && (
                        <React.Fragment>
                            <Link href="/image/upload">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-green font-weight-bold':
                                            currentLocation === '/image/upload'
                                    })}`}>
                                    {' '}
                                    Art Info
                                </a>
                            </Link>
                            <Link href="/image/uploadImg">
                                <a
                                    className={`text-white p-2 mx-2 ${clsx({
                                        'color-green font-weight-bold':
                                            currentLocation === '/image/uploadImg'
                                    })}`}>
                                    {' '}
                                    Images
                                </a>
                            </Link>

                            {/* <Link
									to="/image/credits"
									className={`text-white p-2 mx-2 ${clsx({
										'color-green font-weight-bold': currentLocation === '/image/credits'
									})}`}
								>
									Credits
								</Link> */}
                        </React.Fragment>
                    )}
                </div>
                <div className="">
                    {/* {(currentLocation.startsWith('/video/') ||
							currentLocation.startsWith('/audio/album/') ||
							currentLocation.startsWith('/image/album/')) &&
							(this.props.url && (
								<div
									className="sub-menu-bg rounded subheader-icon py-1 "
									onClick={() => history.push(this.props.url)}
								>
									<EditIcon color="inherit" className="pointer" fontSize="small" />
								</div>
							))} */}

                    {(currentLocation === '/video' ||
                        currentLocation === '/videoAd' ||
                        currentLocation === '/audio' ||
                        currentLocation === '/audioAd' ||
                        currentLocation === '/image' ||
                        currentLocation === '/search') && (
                        <div className="d-flex align-items-center ">
                            {/* <button type="button" className="btn kt-subheader__btn-primary">
									Actions &nbsp;
									<SortNum1Icon className="kt-svg-icon kt-svg-icon--sm" />
								</button>
								 */}
                            {/* <SearchFilter /> */}
                            <div style={{ width: '1px', height: '10px', background: '#a28fe0' }} />
                            {/* <SortByFilter /> */}

                            {/* <div className="sub-menu-bg rounded p-2 mx-2">
									<FaRegClock color={'#B3ACCF'} className="pointer" size={19} />
								</div>

								<div className="sub-menu-bg rounded px-2 py-2 mx-2">
									<FaTrophy color={'#B3ACCF'} className="pointer" size={19} />
								</div> */}

                            {true && currentLocation !== '/search' && (
                                <React.Fragment>
                                    <div
                                        style={{
                                            width: '1px',
                                            height: '10px',
                                            background: '#a28fe0'
                                        }}
                                    />
                                    {user && (
                                        <div
                                            className="pointer sub-menu-bg rounded subheader-icon py-1 mx-2"
                                            onClick={() => {
                                                if (currentLocation === '/video')
                                                    router.push('/video/upload');
                                                if (currentLocation === '/videoAd')
                                                    router.push('/videoAd/upload');
                                                if (currentLocation === '/audio')
                                                    router.push('/audio/upload');
                                                if (currentLocation === '/image')
                                                    router.push('/image/upload');
                                            }}>
                                            <Icons.FiUpload color={'#B3ACCF'} size={19} />
                                        </div>
                                    )}
                                </React.Fragment>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default withRouter(Subhaeder);
