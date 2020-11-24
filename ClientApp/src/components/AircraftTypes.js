import React from 'react';
import { required, Datagrid, List, TextField, Edit, SimpleForm, TextInput, Create, EditButton, DeleteButton, Filter } from 'react-admin';
import { Card as MuiCard, CardContent, withStyles, Typography } from '@material-ui/core';
import { FilterList, FilterListItem, useQuery } from 'react-admin';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';

const AcTypeFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Manufacturer" source="manufacturer" />
        <TextInput label="Model" source="model" />
    </Filter>
);

const Card = withStyles(theme => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            order: 1, // display on the right
            width: '15em',
            marginRight: '1em',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
}))(MuiCard);
const ManufacturerFilter = (props) => {
    if (props.data) {
        console.log("Manufacturer Called")
        console.log(props.data)
        return (
            <FilterList
                label="Manufacturer"
                key="Manufacturer"
                icon={<AirplanemodeActiveIcon />}
            >
                {props.data.filter((v, i, a) => a.findIndex(t => (t.manufacturer === v.manufacturer)) === i)
                    .map(ac => (
                        <FilterListItem
                            label={ac.manufacturer}
                            key={ac.manufacturer}
                            value={{ manufacturer: ac.manufacturer }}
                        />
                    ))}
            </FilterList>
        )
    }
    return null;
}
const ModelFilter = (props) => {
    if (props.data) {
        return (
            <FilterList
                label="Aircraft Model"
                icon={<AirplanemodeActiveIcon />}
            >
                {props.data.filter((v, i, a) => a.findIndex(t => (t.model === v.model)) === i)
                    .map(ac => (
                        <FilterListItem
                            label={ac.model}
                            key={ac.model}
                            value={{ model: ac.model }}
                        />
                    ))}
            </FilterList>
        )
    }
    return null;
}
const FilterSidebar = (props) => {
    const { data, loading, error } = useQuery({
        type: 'getList',
        resource: 'AircraftTypes',
        payload: {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'modelType', order: 'ASC' },
            filter: {},
        }
    })
    if (data) {
        console.log(data)
        return (
            <Card>
                <Typography style={{margin:10}} gutterBottom align="center">
                    <strong>Add Filter</strong>
                </Typography>
                <CardContent>
                    <ManufacturerFilter data={data} />
                    <ModelFilter data={data} />
                </CardContent>
            </Card>
        )
    }
    return null
}
export const AcTypeList = props => {
    return (
        <List {...props} title={props.options.label} aside={<FilterSidebar />} filters={<AcTypeFilter />} sort={{ field: 'id', order: 'ASC' }}>
            <Datagrid>
                <TextField source="manufacturer" />
                <TextField source="model" />
                <TextField label="Model Type" source="modelType" />
                <TextField source="engine" />
                <EditButton basePath='/AircraftTypes' />
                <DeleteButton basePath='/AircraftTypes' />
            </Datagrid>
        </List>
    )
}

export const AcTypeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput validate={required()} source="manufacturer" />
            <TextInput validate={required()} source="model" />
            <TextInput validate={required()} label="Model Type" source="modelType" />
            <TextInput validate={required()} source="engine" />
        </SimpleForm>
    </Edit>
);

export const AcTypeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput validate={required()} source="manufacturer" />
            <TextInput validate={required()} source="model" />
            <TextInput validate={required()} label="Model Type" source="modelType" />
            <TextInput validate={required()} source="engine" />
        </SimpleForm>
    </Create>
);
