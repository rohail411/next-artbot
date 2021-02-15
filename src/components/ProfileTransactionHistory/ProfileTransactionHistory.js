import React from 'react';
import MaterialTable from 'material-table';
import { paymentHistory } from '../../services/util';
import { timeago } from '../../utils/relativeTime';

const ProfileTransactionHistory = () => {
    const [trasactionHistory, setTrasactionHistory] = React.useState({
        columns: [
            {
                title: 'ID',
                field: 'paymentId'
            },
            {
                title: 'Payment Method',
                field: 'paymentMethod',
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
                title: 'Amount',
                field: 'amount',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Paid',
                field: 'paid',
                cellStyle: {
                    fontSize: '16px'
                }
            },
            {
                title: 'Transaction Time',
                field: 'createdAt',
                render: (row) => <p>{timeago(Date.parse(row.createdAt))}</p>,
                cellStyle: {
                    fontSize: '16px'
                }
            }
        ],
        data: []
    });
    React.useEffect(() => {
        let mount = true;
        if (mount) getHistory();
        return () => {
            mount = false;
        };
    }, []);
    const getHistory = async () => {
        const response = await paymentHistory();
        if (response.data.code === 'ABT0000') {
            setTrasactionHistory({
                columns: trasactionHistory.columns,
                data: response.data.history
            });
        }
    };
    return (
        <div className="container-fluid">
            {/* <P1 className="text-white mt-4">No Record To Display</P1> */}
            <MaterialTable
                title="Payment History"
                columns={trasactionHistory.columns}
                data={trasactionHistory.data}
                options={{
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
                            return {
                                backgroundColor: '#18142f',
                                cursor: 'pointer',
                                color: 'white'
                            };
                        } else {
                            return {
                                backgroundColor: '#201a3e',
                                cursor: 'pointer',
                                color: 'white'
                            };
                        }
                    },
                    actionsCellStyle: {
                        display: 'none'
                    },
                    actionsColumnIndex: {
                        display: 'none'
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
        </div>
    );
};
export default React.memo(ProfileTransactionHistory);
