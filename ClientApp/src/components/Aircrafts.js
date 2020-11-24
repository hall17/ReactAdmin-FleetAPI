import React from 'react';
import {
    FormDataConsumer, SelectInput,
    Datagrid, List, TextField, Edit, SimpleForm, TextInput,
    Create, EditButton, DeleteButton, Filter, required, SearchInput,
} from 'react-admin';
import { useQuery } from 'react-admin';
import { Card as MuiCard, CardContent, withStyles, Typography } from '@material-ui/core';
import { FilterList, FilterListItem } from 'react-admin';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import {useListContext } from 'react-admin';

const AcFilter = (props) => (
    <Filter {...props}>
        <SearchInput placeholder="Search by Registration" source="registration" alwaysOn />
        {/* <TextInput label="Registration" source="registration" /> */}
        {/* <TextInput label="Model" source="model" /> */}
        {/* <TextInput label="ModelType" source="modelType" />
        <TextInput label="Effectivity" source="effectivity" /> */}
    </Filter>
);
const ModelFilter = (props) => {
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
const ModelTypeFilter = (props) => {
        return (
            <FilterList
                label="Aircraft Model Type"
                key = "Model Type"
                icon={<AirplanemodeActiveIcon />}
            >
                {props.data.map(ac => (
                    <FilterListItem
                        label={ac.modelType}
                        key={ac.modelType}
                        value={{ modelType: ac.modelType }}
                    />
                ))}
            </FilterList>
        )
}
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
const FilterSidebar = (props) => {

        return (
            <Card>
                <Typography style={{margin:10}} gutterBottom align="center">
                    <strong>Add Filter</strong>
                </Typography>
                <CardContent>
                    <ModelFilter data={props.types} />
                    <ModelTypeFilter data={props.types} />
                </CardContent>
            </Card>
        )
}
export const AcList = props => {
    const { data, loading, error } = useQuery({
        type: 'getList',
        resource: 'AircraftTypes',
        payload: {
            pagination: { page: 1, perPage: 100 },
            sort: { field: 'modelType', order: 'ASC' },
            filter: {},
        }
    })
    console.log(data)
    if(data) {
    return (
        <List  {...props} aside={<FilterSidebar types={data} />} title={props.options.label} filters={<AcFilter />} sort={{ field: 'id', order: 'ASC' }}>
            <Datagrid>
                <TextField source="registration" />
                <TextField source="model" />
                <TextField label="Model Type" source="modelType" />
                <TextField source="effectivity" />
                <TextField label="Body No" source="bodyNo" />
                <TextField label="Line No" source="lineNo" />
                <TextField label="Serial No" source="serialNo" />
                <TextField source="engine" />
                <EditButton basePath='/Aircraft' />
                <DeleteButton basePath='/Aircraft' />
            </Datagrid>
        </List>
    )
}
else return null
}


export const AcEdit = props => {
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
        const allModels = []
        data.map(type => {
            allModels.push({
                'modName': type.model,
                'modTypeName': type.modelType,
                'engineName': type.engine
            });
        })
        return (
            <Edit {...props}>
                <SimpleForm>
                    <TextInput source="registration" validate={required()} />
                    <SelectInput 
                        source="model"
                        optionText="text"
                        optionValue="text"
                        choices={getChoices(allModels, '')}
                        validate={required()} 
                        resettable
                        />
                    <FormDataConsumer>
                        {({ formData, ...rest }) => (
                            <SelectInput
                                label="Model Type"
                                validate={required()}
                                source="modelType"
                                optionText="text"
                                optionValue="text"
                                choices={
                                    formData.model
                                        ? getChoices(allModels, formData.model)
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
                                        ? getEngineChoices(allModels, formData.modelType, formData.model)
                                        : []
                                }
                                {...rest}
                            />
                        )}
                    </FormDataConsumer>
                    <TextInput source="effectivity" validate={required()} />
                    <TextInput label="Body No" source="bodyNo" />
                    <TextInput label="Line No" source="lineNo" />
                    <TextInput label="Serial No" source="serialNo" validate={required()} />
                    <TextInput label="Delivery Date (Year)" source="deliveryDate" />
                </SimpleForm>
            </Edit>
        )
    }
    else return null
}
const getEngineChoices = (allModels, value1, value2) => {
    if(value1 == 'Select Model' && value2 == 'Select Model Type') {
        const choices=[{id:'1', text:'Select Engine' }]
        return choices
    }
    else {
    const choices = allModels.filter(model => model.modTypeName === value1 && model.modName === value2)
        .map(item => {
            return { id: item.engineName, text: item.engineName }
        })
        choices.unshift({id:'1', text:'Select Engine' })
    return choices
}
    // return choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
}
const getChoices = (allModels, value) => {
    if (value === '') {
        const choices = allModels.filter((v, i, a) => a.findIndex(t => (t.modName === v.modName)) === i)
            .map(item => {
                return { id: item.modName, text: item.modName }
            })
            choices.unshift({id:'1', text:'Select Model' })
        return choices
        //  choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
    }
    else if (allModels.some(model => model.modName === value)) {
        const choices = allModels.filter(model => model.modName === value)
            .map(item => {
                return { id: item.modTypeName, text: item.modTypeName }
            })
            choices.unshift({id:'1', text:'Select Model Type' })
        return choices
        // choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
    }
    else {
        const choices=[{id:'1', text:'Select Model Type' }]
        return choices
    }
    // else if (allModels.some(model => model.modTypeName === value)) {
    //     const choices = allModels.filter(model => model.modTypeName === value)
    //         .map(item => {
    //             return { id: item.engineName, text: item.engineName }
    //         })
    //     return choices
    //     // choices.sort((a, b) => (a.text > b.text) ? 1 : -1)
    // }
}

export const AcCreate = props => {
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
        const allModels = []
        data.map(type => {
            allModels.push({
                'modName': type.model,
                'modTypeName': type.modelType,
                'engineName': type.engine
            });
        })
        return (
            <Create {...props}>
                <SimpleForm>
                    <TextInput
                        source="registration"
                        validate={required()} />
                    <SelectInput source="model"
                        optionText="text"
                        optionValue="text"
                        choices={getChoices(allModels, '')}
                        validate={required()} />
                    <FormDataConsumer>
                        {({ formData, ...rest }) => (
                            <SelectInput
                                label="Model Type"
                                validate={required()}
                                source="modelType"
                                optionText="text"
                                optionValue="text"
                                choices={
                                    formData.model
                                        ? getChoices(allModels, formData.model)
                                        : [ { text: "Select Model Type", id: 1 }]
                                }
                                defaultValue ={"Select Model Type"}
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
                                        ? getEngineChoices(allModels, formData.modelType, formData.model)
                                        : [ { text: "Select Engine", id: 1 }]
                                }
                                defaultValue ={"Select Engine"}
                                {...rest}
                            />
                        )}
                    </FormDataConsumer>
                    <TextInput source="effectivity" validate={required()} />
                    <TextInput label="Body No" source="bodyNo" />
                    <TextInput label="Line No" source="lineNo" />
                    <TextInput label="Serial No" source="serialNo" validate={required()} />
                    <TextInput label="Delivery Date (Year)" source="deliveryDate" />
                </SimpleForm>
            </Create>
        )
    }
    else return null


}

