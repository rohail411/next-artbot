import React, { useState } from 'react';
import Dialog from '../UI/Dialog/Dialog';

import DialogActions from '@material-ui/core/DialogActions/DialogActions';
import DialogContent from '@material-ui/core/DialogContent/DialogContent';
import Checkbox from '@material-ui/core/Checkbox/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle/DialogTitle';
import FormGroup from '@material-ui/core//FormGroup/FormGroup';
import CustomButton from '../../components/UI/Button/Button';
import { addMediaToPlaylist, getMyPlaylists } from '../../services/util';
import SimpleSnackbar from '../UI/Snackbar/Snackbar';
const ProfilePlaylistPopup = ({ open, handleClose, mediaId }) => {
    const [playlist, setPlaylist] = useState([]);
    const [snackbar, setSnackbar] = useState(false);
    React.useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        const response = await getMyPlaylists();
        if (response.code === 'ABT0000') setPlaylist(response.playlists);
    };
    const playlistChangeHandler = async (id) => {
        const response = await addMediaToPlaylist(id, { mediaId: mediaId });
        if (response.code === 'ABT0000') setSnackbar(true);
    };
    return (
        <React.Fragment>
            <SimpleSnackbar
                open={snackbar}
                handleClose={() => setSnackbar(false)}
                handleUndo={() => {}}
            />
            <Dialog
                className="video-report-card"
                open={open}
                handleClose={() => handleClose(false)}
                scroll="paper">
                <DialogTitle id="form-dialog-title">Save To</DialogTitle>
                <React.Fragment>
                    <DialogContent>
                        <FormGroup>
                            {playlist.map((item, i) => (
                                <FormControlLabel
                                    key={i}
                                    control={
                                        <Checkbox
                                            onChange={(event) =>
                                                playlistChangeHandler(event.target.value)
                                            }
                                            value={item._id}
                                        />
                                    }
                                    label={item.title}
                                />
                            ))}
                        </FormGroup>
                    </DialogContent>
                    <DialogActions>
                        <CustomButton className="btn text-white" onClick={() => handleClose(false)}>
                            Cancel
                        </CustomButton>
                    </DialogActions>
                </React.Fragment>
            </Dialog>{' '}
        </React.Fragment>
    );
};
export default ProfilePlaylistPopup;
