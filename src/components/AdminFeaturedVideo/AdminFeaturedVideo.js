import React from 'react';
import { getAdminFeaturedVideos, updateFeaturedVideo } from '../../services/video';
import MaterialTable from 'material-table';
import { timeago } from '../../utils/relativeTime';
import { changeFeaturedIndex } from '../../services/util';
const columns = [
    {
        title: 'Id',
        field: '_id',
        editable: 'never'
    },
    {
        field: 'thumbnailUrl',
        title: 'Avatar',
        render: (rowData) => {
            let url = 'https://ipfs.io/ipfs/';
            if (rowData.type === 'ad_image') url = url + rowData.hash;
            else if (rowData.type === 'ad_audio') url = url + rowData.hash;
            else if (rowData.type === 'ad_video') url = url + rowData.hash;
            else url = url + rowData.thumbnailHash;
            return <img src={url} style={{ width: 100, borderRadius: '10%' }} alt="img" />;
        },
        filtering: false,
        editable: 'never'
    },
    {
        title: 'Title',
        field: 'title',
        render: (row) => <p>{row?.title?.substring(0, 20)}</p>,
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        title: 'Username',
        field: 'username',
        cellStyle: {
            fontSize: '16px'
        },
        editable: 'never'
    },
    {
        title: 'Type',
        field: 'type',
        cellStyle: {
            fontSize: '16px'
        },
        filtering: false,
        sorting: false,
        editable: 'never'
    },
    {
        title: 'Status',
        field: 'approved',
        render: (row) => (
            <span className={`badge ${row.approved ? 'badge-success' : 'badge-danger'}`}>{`${
                row.approved ? 'Approved' : 'Pending'
            }`}</span>
        ),
        sorting: false,
        filtering: false,
        editable: 'never'
    },
    {
        title: 'Featured',
        field: 'featured',
        render: (row) => (
            <span className={`badge ${row.featured ? 'badge-success' : 'badge-danger'}`}>{`${
                row.featured ? 'Featured' : ''
            }`}</span>
        ),
        sorting: true,
        filtering: true,
        editable: 'never'
    },
    {
        title: 'Featured Index',
        field: 'featuredIndex',
        render: (row) => <span>{row.featuredIndex ? row.featuredIndex : 'Set Index'}</span>
    },
    {
        title: 'Upload Date',
        field: 'created_at',
        render: (row) => <span>{timeago(Date.parse(row.created_at))}</span>,
        filtering: false,
        sorting: true,
        editable: 'never'
    }
];

function AdminFeaturedVideo(props) {
    const tableRef = React.useRef();
    const [featuredVideo, setFeaturedVideo] = React.useState([]);
    React.useEffect(() => {
        let mount = true;
        if (mount) getData(mount);
        return () => {
            mount = false;
        };
    }, []);
    const getData = async (mount) => {
        const videoData = await getAdminFeaturedVideos();
        if (videoData.code === 'ABT0000' && mount) {
            setFeaturedVideo(videoData.featured_video);
        }
    };
    const changeHandler = async (id, featured) => {
        const result = await updateFeaturedVideo(id, !featured);
        // if (result.code === 'ABT0000') tableRef.current.onQueryChange();
        if (result.code === 'ABT0000') getData();
    };

    return (
        <div className="container-fluid ">
            <MaterialTable
                // tableRef={tableRef}
                title={'Featured Videos'}
                columns={columns}
                // data={(query) =>
                // 	new Promise(async (resolve, reject) => {
                // 		const videoData = await getAdminFeaturedVideos(query.page + 1, query.pageSize);
                // 		if (videoData.code === 'ABT0000') {
                // 			resolve({
                // 				data: videoData.featured_video.docs,
                // 				page: videoData.featured_video.page - 1,
                // 				totalCount: videoData.featured_video.total
                // 			});
                // 		}
                // 	})}
                data={featuredVideo}
                actions={[
                    // {
                    // 	icon: 'refresh',
                    // 	tooltip: 'Refresh Data',
                    // 	isFreeAction: true,
                    // 	onClick: () => tableRef.current && tableRef.current.onQueryChange()
                    // },
                    {
                        icon: 'save',
                        tooltip: 'Feature Video',
                        onClick: (event, rowData) => changeHandler(rowData._id, rowData.featured)
                    }
                ]}
                options={{
                    actionsColumnIndex: -1,
                    sorting: true,
                    filtering: true,
                    headerStyle: {
                        backgroundColor: '#01579b',
                        color: '#FFF'
                    }
                }}
                // onRowClick={(e, row) => {
                // 	props.history.push(`/video/${row._id}`);
                // }}
                cellEditable={{
                    onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
                        return new Promise(async (resolve, reject) => {
                            const index = await changeFeaturedIndex({
                                _id: rowData._id,
                                index: newValue
                            });
                            if (index.code === 'ABT0000') resolve(getData());
                        });
                    }
                }}
            />
        </div>
    );
}

export default AdminFeaturedVideo;
