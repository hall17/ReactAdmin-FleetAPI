import React, { useState, useEffect } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { Card, CardBody, CardHeader, Col, Row, TabContent, TabPane } from 'reactstrap';
import { useQuery } from 'react-admin';
import { Table, TableHead, TableBody, TableRow, TableContainer, TableCell,Button, Collapse
} from '@material-ui/core'

export default () => {
    const { data, total, loading, error } = useQuery({
        type: 'getList',
        resource: 'FleetStatus',
        payload: {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'modelType', order: 'ASC' },
            filter: {},
        }
    })
    // const { data, total, loading, error } = useQuery({
    //     type: 'getList',
    //     resource: 'Aircraft',
    //     payload: {
    //         pagination: { page: 1, perPage: 100 },
    //         sort: { field: 'modelType', order: 'ASC' },
    //         filter: {},
    //     }
    // })
    const { data: typedata, totaltype, loadingtype, errortype } = useQuery({
        type: 'getList',
        resource: 'AircraftTypes',
        payload: {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'modelType', order: 'ASC' },
            filter: {},
        }
    })
    const [open, setOpen] = useState();

    // if (data && typedata)
    if(data)
     {
         console.log(data)
        const handleOpen = model => {
            if (open !== model) setOpen(model)
            else setOpen(0)
        }

        return (
            <div>
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
                                                    <TableCell><strong>Model</strong></TableCell>
                                                    <TableCell><strong>Quantity</strong></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    data.filter((v, i, a) => a.findIndex(t => (t.model === v.model)) === i).map(model => {
                                                        return (
                                                            <TableRow key={model.model} hover>
                                                                <TableCell>
                                                                    <Card>
                                                                        <CardHeader id={model.model}>
                                                                            <Button
                                                                                // block="true"
                                                                                // onClick={() => setActiveTab(model.model)}
                                                                                variant='text'
                                                                                onClick={() => handleOpen(model.model)}
                                                                            >
                                                                                {model.model}

                                                                            </Button>
                                                                        </CardHeader>
                                                                        <Collapse
                                                                            id={model.model}
                                                                            in={open === model.model}
                                                                        >
                                                                            <CardBody style={{ margin: 20 }} gutterBottom>
                                                                                <TableBody >
                                                                                    {/* <TableRow>
                                                                        <TableCell>Sub Models</TableCell>
                                                                        <TableCell>Quantity</TableCell>
                                                                    </TableRow> */}
                                                                                    {typedata.filter(ac => ac.model === model.model)
                                                                                        .map(type => {
                                                                                            return (
                                                                                                <TableRow key={type.modelType} style={{ margin: 20 }} gutterBottom>
                                                                                                    <TableCell>{type.modelType}</TableCell>
                                                                                                    <TableCell>
                                                                                                        {(data.filter(ac => ac.modelType === type.modelType)).length
                                                                                                        }
                                                                                                    </TableCell>
                                                                                                </TableRow>
                                                                                            )
                                                                                        })}
                                                                                </TableBody>
                                                                            </CardBody>
                                                                        </Collapse>
                                                                    </Card>
                                                                </TableCell>
                                                                <TableCell >{
                                                                    (data.filter(ac => ac.model === model.model)).length
                                                                }</TableCell>
                                                            </TableRow>)
                                                    })
                                                }
                                                <TableRow key="TotalQty" hover>
                                                    <TableCell>Total Quantity</TableCell>
                                                    <TableCell>{data.length}</TableCell>
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
            </div>
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