import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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

import Contato from '../components/contato';
import LaudoAluno from '../components/laudo';


// Defina algumas telas exemplo para as suas tabs
function HomeScreen() {
    const [pesquisa, setPesquisa] = useState('');



    const handleInputChange = (text) => {
        setPesquisa(text);
        console.log('Input na pesquisa:', text); // Para visualizar a entrada atual
    };


    const data = [
        { id: 1, nome: 'Aluno1', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 2, nome: 'Aluno2', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 3, nome: 'Aluno3', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 4, nome: 'Aluno4', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 5, nome: 'Aluno5', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 6, nome: 'Aluno6', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 7, nome: 'Aluno7', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 8, nome: 'Aluno8', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
        { id: 9, nome: 'Aluno9', Email: 'nome.sobrenome@portalsesisp.org.br', RM: '1234', telefone: '(+55) 11 12345-5678' },
    ];

    const [modalVisible, setModalVisible] = useState(false);  // Controle de exibição do modal
    const [selectedContato, setSelectedContato] = useState(null);

    const handlePressContato = (contato) => {
        setSelectedContato(contato);  // Salva o contato selecionado
        setModalVisible(true);  // Exibe o modal
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

            <View style={laudo.header}>
                <Image style={laudo.logo} source={require('../assets/img/logo.png')}></Image>
                <View style={laudo.linha1}></View>

                <View style={laudo.pesquisa}>
                    <TextInput
                        style={laudo.input}
                        value={pesquisa}
                        onChangeText={handleInputChange}
                        placeholder="Pesquise aqui..."
                    />

                    <Ionicons name={"search-sharp"} size={24} color={"#000"} />
                </View>

                <View style={laudo.linha2}></View>
            </View>


            <FlatList
                style={{ flex: 1, width: '90%' }}
                keyExtractor={(item) => String(item.id)}
                data={data}
                renderItem={({ item }) => <Contato data={item} onPress={() => handlePressContato(item)} />}

            />

            <Modal
                visible={modalVisible}
                animationType='fade'
                onRequestClose={() => setModalVisible(false)}  // Fecha o modal ao pressionar o botão de voltar
            >
                <LaudoAluno
                    contato={selectedContato}
                    onClose={() => setModalVisible(false)}  // Função para fechar o modal
                />
            </Modal>

        </View>
    );
}

function SettingsScreen() {

    const [isToggled, setIsToggled] = useState(false);

    const toggleSwitch = () => {
        setIsToggled(prev => !prev);
    };
    return (
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <View style={config.perfil}>

                <Image style={config.imagemAluno} source={require('../assets/img/alunoFt.png')}></Image>
                <Text style={config.nomeAluno}>Nome do Funcionario</Text>
            </View>

            <View style={config.contato}>

                <Text style={config.titulo}>contato</Text>

                <View>
                    <View style={config.box}>
                        <View style={config.a}>
                            <Ionicons name={'call'} size={24} color={'#000'} />
                            <Text style={config.desc}> Telefone </Text>
                        </View>
                        <Text style={config.assunto}> (+55) 11 12345-6789 </Text>
                    </View>

                    <View style={config.box}>
                        <View style={config.a}>
                            <Ionicons name={'mail'} size={24} color={'#000'} />
                            <Text style={config.desc}> Email </Text>
                        </View>
                        <Text style={config.assunto}> nome.sobrenome@portalsesisp.org.br </Text>
                    </View>
                </View>

            </View>

            <View style={config.config}>
                <Text style={config.titulo}>Configuração</Text>

                <View>
                    <View style={config.box}>
                        <View style={config.a}>
                            <Ionicons name={'notifications'} size={24} color={'#000'} />
                            <Text style={config.desc}> Notificação </Text>
                        </View>
                        <Pressable onPress={toggleSwitch}>
                            <FontAwesome6
                                name={isToggled ? "toggle-on" : "toggle-off"}
                                size={24}
                                color={isToggled ? "#ff3838" : "#ff3838"}
                            />
                        </Pressable>
                    </View>

                    <View style={config.box}>
                        <View style={config.a}>
                            <Ionicons name={'menu'} size={24} color={'#000'} />
                            <Text style={config.desc}> Termos </Text>
                        </View>
                        <Ionicons name={'chevron-forward'} size={24} color={'#727272'} />
                    </View>
                </View>
            </View>
        </View >
    );
}

const Tab = createBottomTabNavigator();

export default function Acesso() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'settings' : 'settings-outline';
                    }

                    // Retorna o ícone apropriado da biblioteca Ionicons
                    return <Ionicons name={iconName} size={30} color={color} />;
                },
                tabBarActiveTintColor: '#fff', // Cor do texto e ícone ativo
                tabBarInactiveTintColor: '#fff',  // Cor do texto e ícone inativo
                tabBarStyle: {                     // Estilos para a barra de abas
                    backgroundColor: '#FF3838',         // Cor de fundo da barra de abas
                    borderTopColor: '#ccc',          // Cor da borda superior da barra
                    borderTopWidth: 1,               // Largura da borda superior da barra
                    height: 60,                       // Altura da barra de abas
                },
                tabBarLabelStyle: {                 // Estilos para os rótulos
                    fontSize: 14,                     // Tamanho da fonte dos rótulos
                    marginBottom: 5,                  // Margem inferior dos rótulos
                },
                tabBarLabelStyle: {
                    display: 'none', // Oculta os rótulos
                },
                tabBarIconStyle: {                  // Estilos para os ícones
                    marginTop: 5,                     // Margem superior dos ícones
                }
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

const config = StyleSheet.create({
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
    config: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
});

const laudo = StyleSheet.create({
    header: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center'
    },
    linha1: {
        marginTop: 6,
        width: 280,
        height: 2,
        backgroundColor: '#ff3838'
    },
    linha2: {
        width: "100%",
        height: 2,
        backgroundColor: '#ff3838'
    },
    pesquisa: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#ECECEC',

        borderRadius: 5,
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginVertical: 7,
    },
    input: {
        height: 30,
    }

});
