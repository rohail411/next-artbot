import React from 'react';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import clsx from 'clsx';
import Button from '../UI/Button/Button';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import VideoPlayer from '../UI/VideoPlayer/VideoPlayer';
export default function WelcomeAlert(props) {
    const [show, setShow] = React.useState(true);
    const token = useSelector((state) => state.auth.authToken);
    const history = useHistory();
    React.useEffect(() => {
        if (token) setShow(false);
    }, []);
    const handleSign = (value) => {
        setShow(false);
        history.push('/signup');
    };
    return (
        <div
            style={{
                zIndex: 100,
                position: 'absolute',
                margin: 'auto',
                top: '12%',
                left: '20%',
                width: '70%'
            }}
            className={`mobile-alert d-none   ${clsx({
                'd-none': show === false,
                'd-md-block': show === true
            })} display-block `}
            tabIndex="10">
            <P1
                onClick={() => setShow(false)}
                className="text-white pointer mr-4 mt-2 close float-right">
                &times;
            </P1>
            <div className="container ">
                <div className="d-flex flex-column justify-content-center">
                    <div className="my-2" style={{ width: '250px', margin: 'auto' }}>
                        <Img
                            className="mx-auto"
                            style={{ width: '100%' }}
                            src={require('../../../img/artbot-logo.png')}
                        />
                    </div>
                    <P1 className="h4 my-1 mx-5 text-white text-center">
                        A Better Home for Creators and Their Fans
                    </P1>
                    <div className="row my-2">
                        <div className="col-1" />
                        <div className="col-10">
                            <VideoPlayer
                                src={
                                    'https://ipfs.io/ipfs/QmbjgQW8BD3wXEjvnW9ji7KBqEQmPJrvVCR1nG93KvjwL1'
                                }
                                poster={require('../../../img/HD-1920-1080-min.jpg')}
                            />
                        </div>
                        <div className="col-1" />
                    </div>
                    <P1 className=" mt-2 mb-0 text-light font-weight-bold font-14 text-center">
                        Early adopters will receive 100% of their earned revenue
                    </P1>
                    <P1 className=" mb-2 text-light font-weight-bold font-14 text-center">
                        until at least October 2021. ArtBot will take 0%
                    </P1>
                    <div className="d-flex justify-content-center my-2">
                        <Button onClick={handleSign} className="btn btn-primary rounded-10 ">
                            Secure your 100%
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
