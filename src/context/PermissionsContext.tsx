import React, { useEffect } from 'react';
import { createContext, useState } from "react";
import { AppState, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from "react-native-permissions";



export interface PermissionsState {
    locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable',
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    checkLocationPermission: () => void;
    requestLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps); //TODO

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState( permissionInitState );

    useEffect(() => {

        checkLocationPermission();
      
        AppState.addEventListener('change', state => {
            if( state !== 'active' ) return;

            checkLocationPermission();
        })

    
    }, [])
    

    const checkLocationPermission = async() => {

        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios') {
            permissionStatus = await check( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else {
            permissionStatus = await check( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        if ( permissionStatus === 'blocked'){
            openSettings();
        }
        
        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })
    }

    const requestLocationPermission = async () => {

        
        let permissionStatus: PermissionStatus;

        if ( Platform.OS === 'ios') {
            permissionStatus = await request( PERMISSIONS.IOS.LOCATION_WHEN_IN_USE );
        } else {
            permissionStatus = await request( PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION );
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        })

    }

    



    return (
        <PermissionsContext.Provider value={{
            permissions,
            requestLocationPermission,
            checkLocationPermission
        }}>
            { children }
        </PermissionsContext.Provider>
    )

}