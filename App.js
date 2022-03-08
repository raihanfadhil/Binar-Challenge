/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
 import styles from './style.js';

 export default function app(){
     return(
         <View style={styles.container}>
            <View style={[styles.card, styles.shadow]}>
        <Image
            style={styles.image}
            resizeMode="cover"
            source={{
                uri:"https://res.cloudinary.com/djyjm9ayd/image/upload/v1643249117/19025216_1439860629412992_3671167199250762358_o_hzryz8.png",
            }}
        />
        <View style={styles.footer}>
                <Text style={styles.nameText}>Styling di React Native</Text>
            <Text>
                Binar Academy - React Native
            </Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.descriptionText}>As a component grows in complexity, it is much cleaner and efficient to use StyleSheet.create so as to define several styles in one place.</Text>
            </View>
            <View style={styles.buttonPosition}>
                  <Text style={styles.buttonColor}>Understood!</Text>
                  <Text style={styles.buttonColor}>What?!!</Text> 
              </View>
        </View>
        </View>
     );
}