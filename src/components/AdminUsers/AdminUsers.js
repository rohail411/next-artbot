import React from 'react';
import MaterialTable from 'material-table';
import { timeago } from '../../utils/relativeTime';
import { getAllUsers } from '../../services/util';
function AdminUsers() {
    const [users, setUsers] = React.useState({
        columns: [
            {
                title: 'Name',
                field: 'profile_name',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Username',
                field: 'username',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Email',
                field: 'email',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Signed Up',
                field: 'created_at',
                cellStyle: {
                    fontSize: '16px'
                }
            }
        ],
        data: []
    });
    React.useEffect(() => {
        let mount = true;
        const getUsers = async () => {
            const response = await getAllUsers();
            if (response.code === 'ABT0000' && mount) {
                const modifyData = [...response.users].map((item) => ({
                    ...item,
                    created_at: timeago(Date.parse(item.created_at))
                }));
                setUsers({ columns: users.columns, data: modifyData });
            }
        };
        getUsers();
        return () => {
            mount = false;
        };
    }, []);

    return (
        <div className="container-fluid">
            <MaterialTable title="Users" columns={users.columns} data={users.data} />
        </div>
    );
}

export default AdminUsers;
