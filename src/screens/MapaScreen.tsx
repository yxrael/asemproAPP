import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import { Mapa } from '../components/Mapa';
import { PermissionsContext } from '../context/PermissionsContext';
import { PermisoLocalizacion } from '../components/PermisoLocalizacion';
import { LoadingScreen } from './LoadingScreen';
import { NegociosContext } from '../context/NegociosContext';
import { MapMarkerProps } from 'react-native-maps'
import useEffect from 'react';

export const MapaScreen = ( { navigation }: any) => {   

    const { permissions } = useContext( PermissionsContext );
    const { negocios} = useContext( NegociosContext );
    
    let listado: MapMarkerProps[] = [];

    negocios.map( (item ) => {
            listado.push({
                coordinate: { latitude: Number(item.latitude), longitude: Number(item.longitude)},
                title: item.nombre,
                description: item.descripcion,
                identifier: item._id
            })
        })

    if( permissions.locationStatus === 'unavailable' ){
        return <LoadingScreen />
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>

          <Mapa 
            markers={ listado }
          />
            
        </View>
    );
}

