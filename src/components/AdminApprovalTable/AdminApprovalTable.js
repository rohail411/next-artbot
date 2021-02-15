import React from 'react';
import MaterialTable from 'material-table';
import { timeago } from '../../utils/relativeTime';

const columns = [
    {
        title: 'Id',
        field: '_id',
        filtering: true,
        sorting: true
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
        filtering: false
    },
    {
        title: 'Title',
        field: 'title',
        render: (row) => <p>{row.title.substring(0, 20)}</p>,
        filtering: false,
        sorting: false
    },
    {
        title: 'Username',
        field: 'username',
        cellStyle: {
            fontSize: '16px'
        }
    },
    {
        title: 'Type',
        field: 'type',
        cellStyle: {
            fontSize: '16px'
        },
        filtering: false,
        sorting: false
    },
    {
        title: 'Status',
        field: 'approved',
        render: (row) => (
            <span className={`badge ${row.approved ? 'badge-success' : 'badge-danger'}`}>{`${
                row.approved ? 'Approved' : 'Pending'
            }`}</span>
        ),
        sorting: true,
        filtering: true
    },

    {
        title: 'Upload Date',
        field: 'created_at',
        render: (row) => <span>{timeago(Date.parse(row.created_at))}</span>,
        filtering: false,
        sorting: true
    }
];

export default React.forwardRef((props, ref) => (
    <MaterialTable
        tableRef={ref}
        title={props.title}
        columns={columns}
        // data={videos.data}
        data={props.fetchData}
        actions={[
            // {
            // 	icon: 'refresh',
            // 	tooltip: 'Refresh Data',
            // 	isFreeAction: true,
            // 	onClick: () => props.tableRef.current && props.tableRef.current.onQueryChange()
            // },
            {
                icon: 'save',
                tooltip: 'Approve Video',
                onClick: (event, rowData) => props.changeHandler(rowData._id, rowData.approved)
            },
            {
                icon: 'delete',
                tooltip: 'Delete Video',
                onClick: (event, rowData) => props.deletehandler(rowData._id)
            }
        ]}
        options={{
            actionsColumnIndex: -1,
            // selection: true,
            sorting: true,
            filtering: true,
            headerStyle: {
                backgroundColor: '#01579b',
                color: '#FFF'
            }
        }}
        onRowClick={(e, row) => {
            switch (props.type) {
                case 'audio':
                    props.history.push(`/audio/album/${row._id}`);
                    break;
                case 'image':
                    props.history.push(`/image/album/${row._id}`);
                    break;
                case 'video':
                    props.history.push(`/video/${row._id}`);
                    break;
                default:
                    props.history.push(`/video/${row._id}`);
                    break;
            }
        }}
    />
));
