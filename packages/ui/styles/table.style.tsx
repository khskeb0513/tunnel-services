import React from 'react';
import MaterialTable from 'material-table';

const Table = (columns, data) => {
  return <MaterialTable columns={columns} data={data} />;
};

export default Table;
