import React,{useState} from 'react'
import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useQuery } from 'react-admin';
import { Button } from 'reactstrap';
import { useShowController, SimpleShowLayout } from 'react-admin';
import { 
  Datagrid,
  ListBase,
  ListToolbar,
  BulkActionsToolbar,
  Pagination,
  useListContext,
} from 'react-admin';

export const AgGrid = props => {
  const { data, loading, error } = useQuery({
    type: 'getList',
    resource: 'Aircraft',
    payload: {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'modelType', order: 'ASC' },
        filter: {},
    }
})
const actionButton = params => {
  console.log(params)
}
const columns=[
  {
    headerName:"Registration", field:'registration',sortable:true,editable:true,filter:true
  },
  {
    headerName:"Model", 
    field:'model',
    sortable:true,editable:true,filter:true,
  },
  {
    headerName:"Model Type", field:'modelType'
  },
  {
    headerName:"Effectivity", field:'effectivity'
  },
  {
    headerName:"Body No", field:'bodyNo'
  },
  {
    headerName:"Line No", field:'lineNo'
  },
  {
    headerName:"Serial No", field:'serialNo'
  },
  {
    headerName:"Engine", field:'engine'
  },
  {
    headerName:"Action", field:'engine', 
    cellRendererFramework:(params) => 
    <div><button onClick={() => actionButton(params)}>Click Me</button></div>
  },
]
const defaultColDef ={
  sortable:true,editable:true,filter:true,floatingFilter:true,
  cellStyle:(params)=> (params.value === "B787" ? ({background:"yellow"}) : ({background:"white"}) )
}
const [gridApi, setGridApi] = useState()
const onGridReady = props => {
  console.log(props)
  setGridApi(props.api)
}
const onExportClick = () => {
  gridApi.exportDataAsExcel();
}
if(data) {
  console.log(data)
  console.log(props)
  return (
    <>
    <Button onClick={() => onExportClick()}>Export</Button>
    <div className="ag-theme-alpine" style={ { height: 400, width: 1300 } }>
      <AgGridReact 
      columnDefs={columns} 
      rowData={data} 
      defaultColDef={defaultColDef}
      onGridReady={onGridReady}
      pagination={true}
      paginationPageSize={10}
      paginationAutoPageSize={true}
       />
    </div>
    </>
  )
}
return null

}

const MyList = props => (
  <ListBase>
      <h1>{props.title}</h1>
  </ListBase>
);