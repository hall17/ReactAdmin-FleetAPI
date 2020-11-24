import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { useQuery } from 'react-admin';
import { Table, TableHead, TableBody, TableRow, TableContainer, TableCell,Button, Collapse,Typography
} from '@material-ui/core'

export const FleetStatus = props => {
    const { data, loading, error } = useQuery({
        type: 'getList',
        resource: 'FleetStatus',
        payload: {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'modelType', order: 'ASC' },
            filter: {},
        }
    })
    const [open, setOpen] = useState();
    
    const getTotalCount = data => {
        let totalCount =0;
        data.forEach(model => totalCount += model.quantity)
        return totalCount
    }
    if(data)
    {
       const handleOpen = model => {
           if (open !== model) setOpen(model)
           else setOpen(0)
       }

       return (
               <Row>
                   <Col xs="10" align="center" >
                       <Card>
                           <CardHeader>
                               <i className="fa fa-align-justify"></i><strong>THY Fleet Status</strong>
                           </CardHeader>
                           <CardBody>
                               <Row>
                                   <TableContainer>
                                       <Table bordered="true" striped="true" responsive="true">
                                           <TableHead>
                                               <TableRow>
                                                   <TableCell><strong>Aircraft Model</strong></TableCell>
                                                   <TableCell><strong>Quantity</strong></TableCell>
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                               {
                                                   data.filter((v, i, a) => a.findIndex(t => (t.model === v.model)) === i).map(model => {
                                                       return (
                                                           <TableRow key={model.model} hover>
                                                               <TableCell>
                                                                   <Card style={{ border: "none", boxShadow: "none" }} hover="true">
                                                                       {/* <CardHeader id={model.model} > */}
                                                                         {/* <Button
                                                                        //        // block="true"
                                                                        //        // onClick={() => setActiveTab(model.model)}
                                                                        //        variant='text'
                                                                        //        onClick={() => handleOpen(model.model)}
                                                                        //    >
                                                                        //        {model.model}

                                                                        //    </Button> */}
                                                                           
                                                                           <Typography
                                                                           onClick={() => handleOpen(model.model)} style={{margin:4 }} align="left">
                                                                            {model.model}
                                                                        </Typography>
                                                                       {/* </CardHeader> */}
                                                                       <Collapse
                                                                           id={model.model}
                                                                           in={open === model.model}
                                                                       >
                                                                           <CardBody style={{ margin: 20 }} >
                                                                           <Table bordered="true" striped="true" responsive="true">                                                                     
                                                                               <TableBody >
                                                                                   {/* <TableRow>
                                                                       <TableCell>Sub Models</TableCell>
                                                                       <TableCell>Quantity</TableCell>
                                                                   </TableRow> */}
                                                                                   {data.filter(ac => ac.model === model.model)
                                                                                       .map(type => {
                                                                                           return (
                                                                                               <TableRow key={type.modelType} style={{ margin: 20 }}>
                                                                                                   <TableCell>{type.modelType}</TableCell>
                                                                                                   <TableCell>
                                                                                                       {(data.find(ac => ac.modelType === type.modelType)).quantity
                                                                                                       }
                                                                                                   </TableCell>
                                                                                               </TableRow>
                                                                                           )
                                                                                       })}
                                                                               </TableBody>
                                                                               </Table>
                                                                           </CardBody>
                                                                       </Collapse>
                                                                   </Card>
                                                               </TableCell>
                                                               <TableCell >{
                                                                   getTotalCount(data.filter(ac => ac.model === model.model))
                                                               }</TableCell>
                                                           </TableRow>)
                                                   })
                                               }
                                               <TableRow key="TotalQty" hover>
                                                   <TableCell>Total Quantity</TableCell>
                                                   <TableCell>{getTotalCount(data)}</TableCell>
                                               </TableRow>
                                           </TableBody>
                                       </Table>
                                       {/* </CardBody> */}
                                   </TableContainer>
                               </Row>
                           </CardBody>

                       </Card>
                   </Col>
               </Row>        
       )
   }
   else {
       return (
           <Card>
               <CardHeader title="THY Fleet Status">

               </CardHeader>
           </Card>
       )
   }
}