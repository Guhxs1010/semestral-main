import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContatoPai = ({ data, onPress }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={styles.conteiner}>
                <View style={{ flexDirection: 'row', }}>
                    <Image style={styles.fotoAluno} source={require('../assets/img/alunoFt.png')} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.text}> {data.nome} </Text>
                        <Text style={styles.subText}> {data.ultimaMensagem ? data.ultimaMensagem : "Ainda não conversaram"} </Text>
                    </View>
                </View>
            </Pressable>

            <View style={styles.linha}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    conteiner: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingVertical: 20,
    },

    linha: {
        width: '100%',
        height: 2,
        backgroundColor: 'rgba(255, 0, 0, 0.18)',
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
        width: 40,
        height: 40
    }
});

export default ContatoPai;
