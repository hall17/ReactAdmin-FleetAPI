import React from 'react';
import { FormDataConsumer,SelectInput,
    Datagrid, List, TextField, Edit, SimpleForm, TextInput,
    Create, EditButton,DeleteButton, Filter,required } from 'react-admin';
import { setState,useState, useEffect } from 'react';
import { useGetList,useGetOne,useQuery } from 'react-admin';
import { Query,Loading } from 'react-admin';
import { useFormState } from 'react-final-form';

const AcFilter = (props) => (
    <Filter {...props}>
        <TextInput label="Registration" source="id" />
        <TextInput label="Model" source="model" />
        <TextInput label="ModelType" source="modelType" />
        <TextInput label="Effectivity" source="effectivity" />
    </Filter>
);

export const AcList = props => {
    return (
    <List {...props} filters={<AcFilter />} sort={{ field: 'id', order: 'ASC' }}>
        <Datagrid>
            <TextField source="registration" />
            <TextField source="model" />
            <TextField source="modelType" />
            <TextField source="effectivity" />
            <TextField source="bodyNo" />
            <TextField source="lineNo" />
            <TextField source="serialNo" />
            <TextField source="engine" />
            <EditButton basePath='/Aircraft'/>
            <DeleteButton basePath='/Aircraft' />
        </Datagrid>
    </List>
    )
}

export const AcEdit = props => {
    const { data, loading, error } = useQuery({
        type: 'getList',
        resource: 'AircraftTypes',
        payload: {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'DESC' },
        filter: {},
        }})
        if(data) {
            const allModels = []
            data.map(type => {
                allModels.push({
                'modName':type.model,
                'modTypeName':type.modelType,
                'engineName':type.engine
                });             
            })
            return (
                <Edit {...props}>
                    <SimpleForm>
                    <TextInput source="registration" validate={required()} />
                    <SelectInput source="model"
                                   optionText="text"
                                    optionValue="text"
                                     choices={getChoices(allModels,'')}
                                     validate={required()} />
                                <FormDataConsumer>
                                {({ formData, ...rest }) => (
                                    <SelectInput
                                        validate={required()}
                                        source="modelType"
                                        optionText="text"
                                        optionValue="text"
                                        choices={
                                            formData.model
                                                ? getChoices(allModels,formData.model)
                                                : []
                                        }
                                        {...rest}
                                    />
                                )}
                                </FormDataConsumer>
                                <FormDataConsumer>
                                    {({ formData, ...rest }) => (
                                        <SelectInput
                                            validate={required()}
                                            source="engine"
                                            optionText="text"
                                            optionValue="text"
                                            choices={
                                                formData.modelType && formData.model
                                                    ? getEngineChoices(allModels,formData.modelType,formData.model)
                                                    : []
                                            }
                                            {...rest}
                                        />
                                    )}
                                </FormDataConsumer>
                        <TextInput source="effectivity" validate={required()} />
                        <TextInput source="bodyNo" />
                        <TextInput source="lineNo" />
                        <TextInput source="serialNo" validate={required()} />
                        <TextInput source="deliveryDate" />
                    </SimpleForm>
                </Edit>
                )
        }
        else return null
}
const getEngineChoices=(allModels,value1,value2) => {
    const choices = allModels.filter(model=> model.modTypeName === value1 && model.modName ===value2)
                             .map(item =>{
                                return { id: item.engineName, text: item.engineName }
                                })
return choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
}
const getChoices = (allModels,value) => {
    if(value==='') {
        const choices = allModels.filter((v,i,a)=>a.findIndex(t=>(t.modName === v.modName))===i)
        .map(item =>{    
            return { id: item.modName, text: item.modName }
        })
    return choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
    }
    else if(allModels.some(model => model.modName === value)) {
    const choices = allModels.filter(model=> model.modName === value)
                                .map(item =>{         
                                return { id: item.modTypeName, text: item.modTypeName }       
    })       
    return choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
    }
    else if(allModels.some(model => model.modTypeName === value)) {
        const choices = allModels.filter(model=> model.modTypeName === value)
                        .map(item =>{
                        return { id: item.engineName, text: item.engineName }
                        })
    return choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
    }
} 

export const AcCreate = props => {
    const { data, loading, error } = useQuery({
        type: 'getList',
        resource: 'AircraftTypes',
        payload: {
        pagination: { page: 1, perPage: 100 },
        sort: { field: 'id', order: 'DESC' },
        filter: {},
        }})

        if(data) {
            const allModels = []
            data.map(type => {
                allModels.push({
                'modName':type.model,
                'modTypeName':type.modelType,
                'engineName':type.engine
                });             
            })
            return (
                <Create {...props}>
                    <SimpleForm>    
                    <TextInput source="registration"
                     validate={required()} />                
                    <SelectInput source="model"
                       optionText="text"
                        optionValue="text"
                         choices={getChoices(allModels,'')}
                         validate={required()} />
                    <FormDataConsumer>
                    {({ formData, ...rest }) => (
                        <SelectInput
                            validate={required()}
                            source="modelType"
                            optionText="text"
                            optionValue="text"
                            choices={
                                formData.model
                                    ? getChoices(allModels,formData.model)
                                    : []
                            }
                            {...rest}
                        />
                    )}
                    </FormDataConsumer>
                    <FormDataConsumer>
                        {({ formData, ...rest }) => (
                            <SelectInput
                                validate={required()}
                                source="engine"
                                optionText="text"
                                optionValue="text"
                                choices={
                                    formData.modelType && formData.model
                                        ? getEngineChoices(allModels,formData.modelType,formData.model)
                                        : []
                                }
                                {...rest}
                            />
                        )}
                    </FormDataConsumer>
                        <TextInput source="effectivity" validate={required()} />
                        <TextInput source="bodyNo"  />
                        <TextInput source="lineNo"  />
                        <TextInput source="serialNo" validate={required()} />
                        <TextInput source="deliveryDate" />
                    </SimpleForm>
                </Create>
                )
        }
        else return null
    

}

