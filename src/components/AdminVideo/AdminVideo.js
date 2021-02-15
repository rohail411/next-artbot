import React from 'react';
import { getAdminVideos, approveAdminVideos, deleteVideo } from '../../services/video';
import AdminApprovalTable from '../AdminApprovalTable/AdminApprovalTable';

function AdminVideo(props) {
    const tableRef = React.useRef();
    const [videos, setVideos] = React.useState([]);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, []);
    const getData = async (mount) => {
        const videoData = await getAdminVideos();
        if (videoData.code === 'ABT0000' && mount) setVideos(videoData.videos);
    };
    const videoStatusUpdateHandler = async (videoId, status) => {
        let result = await approveAdminVideos({
            _id: videoId,
            approve: !status
        });
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData();
    };

    const deleteVideoHandler = async (videoId) => {
        const result = await deleteVideo(videoId);
        // if (result.data.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.data.code === 'ABT0000') getData();
    };

    return (
        <div className="container-fluid ">
            <AdminApprovalTable
                title="Videos"
                ref={tableRef}
                // fetchData={(query) =>
                // 	new Promise(async (resolve, reject) => {
                // 		const videoData = await getAdminVideos(query.page + 1, query.pageSize);
                // 		if (videoData.code === 'ABT0000') {
                // 			resolve({
                // 				data: videoData.videos.docs,
                // 				page: videoData.videos.page - 1,
                // 				totalCount: videoData.videos.total
                // 			});
                // 		}
                // 	})}
                fetchData={videos}
                type="video"
                changeHandler={videoStatusUpdateHandler}
                deletehandler={deleteVideoHandler}
                {...props}
            />
        </div>
    );
}

export default AdminVideo;
