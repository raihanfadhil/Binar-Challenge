import { Text, View ,Image ,ScrollView ,SafeAreaView,StatusBar} from 'react-native'
import React from 'react'
import styles from './style';
import {Profile} from '../../assets/Images';
import SewaMobil from '../../components/SewaMobil';
import { ButtonIcon } from '../../components';
import DaftarMobilPilihan from '../../components/DaftarMobilPilihan';

const Home = () => {
  return (
  <SafeAreaView style={{backgroundColor:'#D3D9FD'}}>
    <StatusBar translucent backgroundColor="transparent" />
    <ScrollView>
    <View style={styles.page}>
      <View style={styles.headerTop}>
        <View style={styles.headerTopNamePhoto}>
          <View style={styles.headerText}>
              <Text style={{color:'#000000'}}>Hi, Raihan Fadhil Ahmad</Text>    
              <Text style={{fontWeight:'bold',color:'#000000',marginTop:4}}>Cibubur, Jawa Barat</Text>
          </View>
           <Image source={Profile} style = {styles.photo}/>
        </View>
      <SewaMobil/> 
      </View>
      <View style={styles.layanan}>
        <View style={styles.iconLayanan}>
          <ButtonIcon title="Sewa Mobil" type="layanan"/>
          <ButtonIcon title="Oleh-Oleh" type="layanan"/>
          <ButtonIcon title="Penginapan" type="layanan"/>
          <ButtonIcon title="Wisata" type="layanan"/>
        </View>
      </View>
      
      <View style={{  paddingTop :24,paddingLeft :16,}}>
        <Text style={{fontSize:14,fontWeight:'bold',color:'#000000'}}>Daftar Mobil Pilihan</Text>
      </View>
        <DaftarMobilPilihan/>
        <DaftarMobilPilihan/>
        <DaftarMobilPilihan/>
        <DaftarMobilPilihan/>
        
    </View>
    </ScrollView>
  </SafeAreaView>
  );
}

export default Home
