import React from 'react';
import { Datagrid, List, TextField, Edit, SimpleForm, TextInput, NumberInput, Create, EditButton,DeleteButton, Filter } from 'react-admin';
import { useState, useEffect } from 'react';

const AcTypeFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Manufacturer" source="manufacturer" />
        <TextInput label="Model" source="model" />
    </Filter>
);

export const AcTypeList = props => {
    useEffect( () => {
        console.log(props.record)
    })    
    return (
    <List {...props} filters={<AcTypeFilter />} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="manufacturer" />
            <TextField source="model" />
            <TextField source="modelType" />
            <TextField source="engine" />
            <EditButton basePath='/AircraftTypes'/>
            <DeleteButton basePath='/AircraftTypes' />
        </Datagrid>
    </List>
    )
}

export const AcTypeEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="manufacturer" />
            <TextInput source="model" />
            <TextInput source="modelType" />
            <TextInput source="engine" />
        </SimpleForm>
    </Edit>
);

export const AcTypeCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="manufacturer" />
            <TextInput source="model" />
            <TextInput source="modelType" />
            <TextInput source="engine" />
        </SimpleForm>
    </Create>
);
