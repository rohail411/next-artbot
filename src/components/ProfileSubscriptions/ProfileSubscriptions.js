import MaterialTable from 'material-table';
import React from 'react';
import { getMySubscriptions, removeSubscribe } from '../../services/util';
import { timeago } from '../../utils/relativeTime';
const columns = [
    {
        title: 'Id',
        field: '_id'
    },
    {
        title: 'Subscribe',
        field: 'subscribe.username'
    },
    {
        title: 'Plan',
        field: 'planId'
    },
    {
        title: 'Expired At',
        field: 'expiredAt',
        render: (row) => {
            return <p>{row.expiredAt?.split('T')[0]}</p>;
        }
    },
    {
        title: 'Created At',
        field: 'createdAt',
        render: (row) => {
            return <p>{timeago(new Date(row.createdAt))}</p>;
        }
    }
];
const ProfileSubscriptions = () => {
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        let mount = false;
        if (!mount) getData();
        return () => {
            mount = true;
        };
    }, []);
    const getData = async () => {
        const response = await getMySubscriptions();
        if (response.code === 'ABT0000') setData(response.subscriptions);
    };
    const removeHandler = async (rowData) => {
        const response = await removeSubscribe({ id: rowData._id });
        if (response.code === 'ABT0000') getData();
    };
    return (
        <MaterialTable
            title="Subscriptions"
            columns={columns}
            data={data}
            actions={[
                {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => removeHandler(rowData)
                }
            ]}
            options={{
                actionsColumnIndex: -1,
                filtering: true,
                headerStyle: {
                    backgroundColor: '#0c091c',
                    color: 'white'
                },
                searchFieldStyle: {
                    color: 'red',
                    background: 'green !important',
                    paddingTop: '1%'
                },
                searchFieldAlignment: 'right',

                rowStyle: (x) => {
                    if (x.tableData.id % 2) {
                        return { backgroundColor: '#18142f', cursor: 'pointer', color: 'white' };
                    } else {
                        return { backgroundColor: '#201a3e', cursor: 'pointer', color: 'white' };
                    }
                },
                actionsCellStyle: {
                    color: 'white'
                },

                cellStyle: {
                    color: 'white'
                },
                filterCellStyle: {
                    color: 'red'
                },
                paginationType: {
                    color: 'red'
                }
            }}
        />
    );
};
export default React.memo(ProfileSubscriptions);
