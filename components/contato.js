import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Contato = ({ data, onPress }) => {
    return (
        <Pressable onPress={onPress} style={styles.conteiner}>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.fotoAluno} source={require('../assets/img/alunoFt.png')} />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}> {data.nome} </Text>
                    <Text style={styles.subText}>{data.Email}</Text>
                    <Text style={styles.subText}>RM: {data.RM}</Text>
                </View>
            </View>
            <Ionicons name={'chevron-forward-outline'} size={20} color={'#727272'} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingHorizontal: 10,
        marginVertical: 10,
        borderRadius: 5,
        backgroundColor: '#ECECEC'
    },
    text: {
        fontSize: 12,
        color: '#000'
    },
    subText: {
        marginLeft: 2,
        fontSize: 10,
        color: '#727272'
    },
    fotoAluno: {
        width: 45,
        height: 45
    }
});

export default Contato;
