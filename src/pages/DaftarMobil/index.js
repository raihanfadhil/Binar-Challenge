import { StyleSheet, View ,ScrollView} from 'react-native'
import React from 'react'
import DaftarMobilPilihan from '../../components/DaftarMobilPilihan';

const DaftarMobil = () => {
  return (
      <ScrollView>
        <View style={styles.page}>
          <DaftarMobilPilihan/>
          <DaftarMobilPilihan/>
          <DaftarMobilPilihan/>
          <DaftarMobilPilihan/>
          <DaftarMobilPilihan/>
          <DaftarMobilPilihan/>
          <DaftarMobilPilihan/>
        </View>
      </ScrollView>
      
  );
}

export default DaftarMobil

const styles = StyleSheet.create({
   page : {
    flex:1,
    backgroundColor:'#fff',
    paddingBottom: 20,
  },
}) 
