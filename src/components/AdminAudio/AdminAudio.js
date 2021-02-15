import React from 'react';
import { approveAdminAudios, getAdminAudios, deleteAlbum } from '../../services/audio';
import AdminApprovalTable from '../AdminApprovalTable/AdminApprovalTable';

function AdminAudio(props) {
    const tableRef = React.useRef();
    const [albums, setAlbums] = React.useState([]);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, []);
    const getData = async (mount) => {
        const videoData = await getAdminAudios();
        if (videoData.code === 'ABT0000' && mount) setAlbums(videoData.albums);
    };

    const videoStatusUpdateHandler = async (videoId, status) => {
        const result = await approveAdminAudios({
            _id: videoId,
            approve: !status
        });
        //if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData();
    };
    const deleteAudioHandler = async (id) => {
        const result = await deleteAlbum(id);
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData();
    };
    return (
        <div className="container-fluid">
            <AdminApprovalTable
                title="Audios"
                ref={tableRef}
                // fetchData={(query) =>
                // 	new Promise(async (resolve, reject) => {
                // 		const videoData = await getAdminAudios(query.page + 1, query.pageSize);
                // 		if (videoData.code === 'ABT0000') {
                // 			resolve({
                // 				data: videoData.albums.docs,
                // 				page: videoData.albums.page - 1,
                // 				totalCount: videoData.albums.total
                // 			});
                // 		}
                // 	})}
                fetchData={albums}
                type="audio"
                changeHandler={videoStatusUpdateHandler}
                deletehandler={deleteAudioHandler}
                {...props}
            />
        </div>
    );
}

export default AdminAudio;
