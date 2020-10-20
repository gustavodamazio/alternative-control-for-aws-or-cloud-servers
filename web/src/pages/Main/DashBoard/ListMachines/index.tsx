import { ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community'
import { AgGridColumn, AgGridReact } from 'ag-grid-react'
import React, { useEffect, useState } from 'react'

import { GridDateComparator } from '../../../../helpers/grid/DateComparator'
import { GridFormatDate } from '../../../../helpers/grid/FormatDate'
import Machine from '../../../../models/Machine'
import Title from '../Title'

interface ListMachinesProps {
  machines: Machine[]
}
const ListMachines: React.FC<ListMachinesProps> = props => {
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null)
  function onGridReady(params: GridReadyEvent) {
    setGridApi(params.api)
    setGridColumnApi(params.columnApi)
  }

  const [rowData, setRowData] = useState<Machine[]>([])
  useEffect(() => {
    setRowData(props.machines)
  }, [props.machines])
  return (
    <>
      <Title>Lista de servidores</Title>
      <div
        className="ag-theme-material"
        style={{ display: 'flex', flexDirection: 'column', flex: '1 1 auto', width: 'auto', height: 'auto' }}
      >
        <AgGridReact onGridReady={onGridReady} rowData={rowData} pagination={true} paginationPageSize={100}>
          <AgGridColumn field="instance_id" headerName="Id" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="instance_name" headerName="Nome" sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn
            field="instance_type"
            headerName="Tipo"
            maxWidth={130}
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="instance_state"
            headerName="Estado"
            valueGetter={params => (params.data?.instance_state === 'On' ? 'Ligada' : 'Desligada')}
            maxWidth={115}
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="private_ip_address"
            headerName="Ip privado"
            maxWidth={150}
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="memory_mb"
            headerName="Memória (MB)"
            maxWidth={150}
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn field="v_cpu" headerName="V CPU" maxWidth={110} sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn field="gpu" headerName="GPU" maxWidth={110} sortable={true} filter={true}></AgGridColumn>
          <AgGridColumn
            field="launch_time"
            headerName="Data lançamento"
            valueGetter={params => GridFormatDate<Machine>(params, 'launch_time')}
            comparator={GridDateComparator}
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="sync_last"
            headerName="Última sincronização"
            valueGetter={params => GridFormatDate<Machine>(params, 'sync_last')}
            comparator={GridDateComparator}
            sortable={true}
            filter={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  )
}

export default ListMachines
