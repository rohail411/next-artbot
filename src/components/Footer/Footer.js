import React from 'react';
import {useRouter} from 'next/router';
import Img from '../UI/Img/Img';
import P1 from '../UI/P1/P1';
import Icons from '../UI/ReactIcons/ReactIcons';
import Dialog from '../UI/Dialog/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import parses from 'html-react-parser';
import { terms, contact, privacy } from '../../utils/FooterText';

const Footer = () => {
    const router = useRouter();
    const [modelOpen, setModel] = React.useState(false);
    const [showTab, setTab] = React.useState('');

    return (
        <div className="container-fluid footer ">
            <Dialog
                className="custom-dialog "
                open={modelOpen}
                handleClose={() => setModel(!modelOpen)}
                scroll="body">
                <DialogTitle className="text-light">
                    {showTab === 'terms' && terms.title}
                    {showTab === 'privacy' && privacy.title}
                    {showTab === 'contact' && contact.title}
                </DialogTitle>
                <DialogContent dividers={true}>
                    <div className="row col-12 text-light" tabIndex={-1}>
                        <p>{showTab === 'terms' && parses(terms.desc)}</p>
                        {showTab === 'privacy' && parses(privacy.desc)}
                        {showTab === 'contact' && contact.desc}
                    </div>
                </DialogContent>
            </Dialog>
            <div className="container-fluid my-4 row">
                <div className="col-12  col-md-3 order-3">
                    <div className="pointer" onClick={()=>router.push('/')} style={{ width: '15rem', margin: 'auto' }}>
                            <Img
                                width="auto"
                                height="auto"
                                src={'/img/artbot-logo.png'}
                                className="img-fluid pointer"
                                alt="logo"
                            />
                    </div>
                </div>
                <div className="col-12 col-md-6 order-1">
                    <div className="d-flex h-100 justify-content-center align-items-center">
                        <P1
                            onClick={() => {
                                setModel(!modelOpen);
                                setTab('terms');
                            }}
                            className="text-white pointer mb-0 text-uppercase">
                            Terms & Condition
                        </P1>
                        <div
                            style={{
                                width: '1px',
                                height: '10px',
                                background: '#fff',
                                margin: '0 5px'
                            }}
                        />
                        <P1
                            onClick={() => {
                                setModel(!modelOpen);
                                setTab('privacy');
                            }}
                            className="text-white pointer mb-0  text-uppercase">
                            Privacy Policy
                        </P1>
                        <div
                            style={{
                                width: '1px',
                                height: '10px',
                                background: '#fff',
                                margin: '0 5px'
                            }}
                        />

                        <P1
                            onClick={() => {
                                setModel(!modelOpen);
                                setTab('contact');
                            }}
                            className="text-white pointer mb-0 text-uppercase">
                            Contact Us
                        </P1>
                    </div>
                </div>
                <div className="col-12 my-4 my-sm-0 col-md-3 order-2">
                    <div className="d-flex footer-social h-100 justify-content-center align-items-center">
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.facebook.com/ArtbotTv/">
                            <Icons.FaFacebook fontSize={25} />
                        </a>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://twitter.com/ArtBotTV">
                            <Icons.FaTwitterSquare fontSize={25} />
                        </a>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://www.linkedin.com/company/artbot/">
                            <Icons.FaLinkedin fontSize={25} />
                        </a>
                        <a
                            rel="noopener noreferrer"
                            target="_blank"
                            href="https://discord.gg/Y8gnJGN">
                            <Icons.FaDiscord fontSize={25} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
