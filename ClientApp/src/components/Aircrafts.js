import React from 'react';
import { SelectInput,ReferenceField,ReferenceInput,Datagrid, List, TextField, Edit, SimpleForm, TextInput, NumberInput, Create, EditButton,DeleteButton, Filter } from 'react-admin';
import { useState, useEffect } from 'react';
import { useGetList,useGetOne,useQuery } from 'react-admin';

const AcFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Registration" source="id" />
        <TextInput label="Model" source="model" />
        <TextInput label="ModelType" source="modelType" />
        <TextInput label="Effectivity" source="effectivity" />
    </Filter>
);

export const AcList = props => (
    <List {...props} filters={<AcFilter />} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="model" />
            <TextField source="modelType" />
            <TextField source="registration" />
            <TextField source="effectivity" />
            <TextField source="bodyNo" />
            <TextField source="lineNo" />
            <TextField source="serialNo" />
            <TextField source="engine" />
            <EditButton basePath='/Aircraft'/>
            <DeleteButton basePath='/Aircraft' />
        </Datagrid>
    </List>
);

export const AcEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="model" />
            <TextInput source="modelType" />
            <TextInput source="registration" />
            <TextInput source="effectivity" />
            <TextInput source="bodyNo" />
            <TextInput source="lineNo" />
            <TextInput source="serialNo" />
            <TextInput source="engine" />
            <TextInput source="deliveryDate" />
        </SimpleForm>
    </Edit>
);
export const AcCreate = props => {
    const [models,setModels] = useState([]);
    // const { data, ids, loading, error } = useGetList(
    //     'AircraftTypes',
    //     { page: 1, perPage: 10 },
    //     { field: 'manufacturer', order: 'DESC' },
    // );

    // const { data, loading, error } = useQuery({
    //     type: 'getList',
    //     resource: 'AircraftTypes',
    //     payload: {
    //     pagination: { page: 1, perPage: 100 },
    //     sort: { field: 'id', order: 'DESC' },
    //     filter: {},
    //     }})        
    return (
        
    <Create {...props}>
        <SimpleForm>
            <ReferenceInput label="Model" source="model" reference="AircraftTypes">
            <SelectInput 
            optionText="model"
            optionValue="model"
            />
            </ReferenceInput>
            <TextInput source="model" />
            <TextInput source="modelType" />
            <TextInput source="registration" />
            <TextInput source="effectivity" />
            <TextInput source="bodyNo" />
            <TextInput source="lineNo" />
            <TextInput source="serialNo" />
            <TextInput source="engine" />
            <TextInput source="deliveryDate" />
        </SimpleForm>
    </Create>
    )
}

