import React from 'react';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest'
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import Dashboard from './Dashboard';
import { AcList, AcEdit, AcCreate, AcDelete } from './components/Aircrafts'
import { AcTypeList, AcTypeEdit, AcTypeCreate, AcTypeDelete } from './components/AircraftTypes'
import {FleetStatus} from './components/FleetStatus'
import {AgGrid} from './components/agGrid'
const dataProvider = simpleRestProvider('/api');
const App = () => {
    return (
        <Admin options={{ label: 'Fleet Status' }} dataProvider={dataProvider}>
            <Resource
                options={{ label: 'ag-Grid' }}
                name="Aircraft"
                list={AgGrid}
            />
             <Resource
                options={{ label: 'Fleet Status' }}
                name="FleetStatus"
                list={FleetStatus}
                icon={AirplanemodeActiveIcon} />
            {/* <Resource
                options={{ label: 'Fleet' }}
                name="Aircraft"
                list={AcList}
                edit={AcEdit}
                // create={AcCreate}
                icon={AirplanemodeActiveIcon} /> */}
            <Resource
                id="types"
                options={{ label: 'Aircraft Models' }}
                name="AircraftTypes"
                list={AcTypeList}
                edit={AcTypeEdit}
                create={AcTypeCreate}
                icon={AirplanemodeActiveIcon} />
        </Admin>
    )
}

export default App;
