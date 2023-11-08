import React, { useState, useContext } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import MapView, { Marker } from "react-native-maps";
import styled from 'styled-components'

import { MarcadoresContext } from '../contexts/ContextMarcadores';

function MapaScreen({ navigation, route }) {
  const marcadoresObject = useContext(MarcadoresContext);
  const initialRegion = route.params ? route.params.initialRegion : marcadoresObject.localizacaoInicial;
  
  const [localizacaoAtual, setLocalizacaoAtual] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.00,
    longitudeDelta: 0.00,
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onPress={(event) => {
          const { coordinate } = event.nativeEvent;
          setLocalizacaoAtual(coordinate);
        }}
      >
        {
          marcadoresObject.listaMarcadores.map((item, index) => {
            return (
              <Marker coordinate={{
                latitude: item.latitude,
                longitude: item.longitude
              }}
                key={index}
                pinColor={item.color}
                title={item.title} />
            );
          })
        }
        <Marker coordinate={{
          latitude: localizacaoAtual.latitude,
          longitude: localizacaoAtual.longitude
        }}
          title='Localização selecionada'
          key={'atual'}
          pinColor={"orange"} />
      </MapView>
      <View style={styles.caixa}>
        <Text style={styles.titulo}>Clique no mapa para selecionar um local para criar um marcador</Text>
        <Text style={styles.texto}>Latitude: {localizacaoAtual.latitude}</Text>
        <Text style={styles.texto}>Longitude: {localizacaoAtual.longitude}</Text>
        <TouchableOpacity style={styles.botaoAdicionar} onPress={() => {
          navigation.navigate('NovoMarker',
            {
              latitude: localizacaoAtual.latitude,
              longitude: localizacaoAtual.longitude,
            })
        }}>
          <Text style={{ color: 'white', fontSize: 17 }}>Adicionar novo marcador</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoAdicionar} onPress={() => {
          navigation.navigate('ListaMarkers')
        }}>
          <Text style={{ color: 'white', fontSize: 17 }}>Listar marcadores</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  botaoAdicionar: {
    color: 'purple',
    alignItems: 'center',
    backgroundColor: '#0000DD',
    padding: 10,
    margin: 5,
    borderRadius: 5
  },
  texto: {
    color: 'blue',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5
  },
  titulo: {
    color: 'black',
    fontSize: 10,
    textAlign: 'center',
    marginBottom: 5
  },
  caixa: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 5,
    margin: 25
  }
});


export default MapaScreen;