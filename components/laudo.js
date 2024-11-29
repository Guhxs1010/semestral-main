import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Pressable,
    FlatList,
    Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const ModalAluno = ({ contato, onClose }) => {

    return (


        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <Pressable onPress={onClose} style={{backgroundColor: '#ff3838', width: '100%'}}>
                <Ionicons style={{padding: 10, paddingTop: 15}} name={'chevron-back-outline'} size={30} color={'#ffd'} />
            </Pressable>

            <View style={styles.perfil}>

                <Image style={styles.imagemAluno} source={require('../assets/img/alunoFt.png')}></Image>
                <Text style={styles.nomeAluno}> {contato.nome} </Text>
            </View>

            <View style={styles.contato}>

                <Text style={styles.titulo}>contato</Text>

                <View>
                    <View style={styles.box}>
                        <View style={styles.a}>
                            <Ionicons name={'call'} size={24} color={'#000'} />
                            <Text style={styles.desc}> Telefone </Text>
                        </View>
                        <Text style={styles.assunto}> {contato.telefone} </Text>
                    </View>

                    <View style={styles.box}>
                        <View style={styles.a}>
                            <Ionicons name={'mail'} size={24} color={'#000'} />
                            <Text style={styles.desc}> Email </Text>
                        </View>
                        <Text style={styles.assunto}> {contato.Email} </Text>
                    </View>
                </View>

            </View>

            <View style={styles.botao}>
                <Pressable onPress={() => console.log('opa')} style={styles.botaoEntrar}>
                    <Text style={styles.textoBotao}>Baixar Laudo</Text>
                    <Ionicons name={'cloud-download-outline'} size={24} color={'#fff'} />
                </Pressable>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    perfil: {
        flex: 2,
        width: '100%',
        backgroundColor: "#FF3838",
        justifyContent: 'center',
        alignItems: 'center'
    },
    nomeAluno: {
        marginTop: 10,
        fontSize: 20,
        color: '#fff'
    },
    contato: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    box: {
        flexDirection: 'row',
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderTopWidth: 0.5,         // Largura da borda superior
        borderBottomWidth: 0.5,      // Largura da borda inferior
        borderTopColor: 'rgba(0, 0, 0, 0.2)',    // Cor da borda superior
        borderBottomColor: 'rgba(0, 0, 0, 0.2)', // Cor da borda inferior    
    },
    titulo: {
        fontSize: 14,
        color: '#727272',
        marginVertical: 20
    },
    a: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    desc: {
        fontSize: 13
    },
    assunto: {
        color: '#727272',
        fontSize: 12
    },
    botao: {
        flex: 1,
        justifyContent: 'center',
        justifyContent: 'center' // Espaçamento fora do botão (opcional)
    },
    botaoEntrar: {
        flexDirection: 'row', // Alinha o texto e o ícone horizontalmente
        alignItems: 'center', // Alinha verticalmente ao centro
        justifyContent: 'center', // Centraliza o conteúdo dentro do botão
        backgroundColor: '#ff3838', // Cor de fundo do botão
        paddingVertical: 10, // Espaçamento interno vertical
        paddingHorizontal: 20, // Espaçamento interno horizontal
        borderRadius: 8, // Bordas arredondadas
    },
    textoBotao: {
        color: '#fff', // Cor do texto
        fontSize: 16, // Tamanho da fonte
        marginRight: 10, // Espaçamento entre o texto e o ícone
    },
});

export default ModalAluno;
