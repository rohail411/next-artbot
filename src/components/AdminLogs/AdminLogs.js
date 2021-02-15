import React from 'react';
import MaterialTable from 'material-table';
import { getAllLogs } from '../../services/util';

function AdminLogs() {
    const [logs, setLogs] = React.useState({
        columns: [
            {
                title: 'Event ID',
                field: 'log_type',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Event Message',
                field: 'message',
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
                title: 'IP Address',
                field: 'ip_address',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Timestamp',
                field: 'timestamp',
                cellStyle: {
                    fontSize: '16px'
                }
            }
        ],
        data: []
    });
    React.useEffect(() => {
        let mount = true;
        const getLogs = async () => {
            let response = await getAllLogs();
            if (response.code === 'ABT0000' && mount) {
                const modifyData = [...response.logs].map((item) => ({
                    ...item,
                    timestamp: new Date(item.timestamp).toLocaleString()
                }));
                setLogs({ columns: logs.columns, data: modifyData });
            }
        };
        getLogs();
        return () => {
            mount = false;
        };
    }, []);
    return (
        <div className="container-fluid">
            <MaterialTable title="Logs" data={logs.data} columns={logs.columns} />
        </div>
    );
}

export default AdminLogs;
