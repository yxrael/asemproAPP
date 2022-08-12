import React, { useContext, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Mapa } from '../components/Mapa';
import { PermissionsContext } from '../context/PermissionsContext';
import { PermisoLocalizacion } from '../components/PermisoLocalizacion';
import { LoadingScreen } from './LoadingScreen';
import { NegociosContext } from '../context/NegociosContext';
import { MapMarkerProps } from 'react-native-maps'
import useEffect from 'react';
import { AuthContext } from '../context/AuthContext';

export const MapaScreen = () => {

    const { permissions } = useContext( PermissionsContext );
    const { negocios} = useContext( NegociosContext );
    

    let listado: MapMarkerProps[] = [];

    negocios.map( (item ) => {
            listado.push({
                coordinate: { latitude: Number(item.latitude), longitude: Number(item.longitude)},
                title: item.nombre,
                description: item.descripcion
            })
        })

    if( permissions.locationStatus === 'unavailable' ){
        return <LoadingScreen />
    }

    // if( demora ) return <ActivityIndicator />

    // setTimeout(() => {
    //     setDemora(false)
    // }, 200);
    

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

            {
                ( permissions.locationStatus === 'granted' && listado !== []) 
                ? <Mapa 
                    markers={listado} 
                />
                : <PermisoLocalizacion />
            }
            
        </View>
    );
}

