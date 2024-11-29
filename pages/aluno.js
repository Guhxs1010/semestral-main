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
    ActivityIndicator,
    FlatList
} from 'react-native';

import { supabase } from '../supabase';
import Post from '../components/post';



function HomeScreen() {
    const [filtroAtivo, setFiltroAtivo] = useState('Geral');
    const [posts, setPosts] = useState([]);

    const handleFiltroPress = (filtro) => {
        setFiltroAtivo(filtro);
    };

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('post') // Nome da tabela
                .select('*'); // Busca todas as colunas

            if (error) {
                console.error('Erro ao buscar dados:', error.message);
                return;
            }

            setPosts(data); // Atualiza o estado "posts" com os dados retornados
        } catch (err) {
            console.error('Erro inesperado:', err);
        }
    };

    // useEffect para buscar os dados ao montar o componente
    useEffect(() => {
        fetchPosts(); // Chama a função para buscar os dados
    }, []);


    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: '#fff' }}>

            <View style={index.header}>
                <Image style={index.logo} source={require('../assets/img/logo.png')}></Image>
                <View style={index.linha1}></View>
                <View style={index.filtroBox}>
                    <Pressable
                        style={filtroAtivo === 'Geral' ? index.filtroAtivo : index.filtro}
                        onPress={() => handleFiltroPress('Geral')}
                    >
                        <Text style={index.textoFiltro}>Geral</Text>
                    </Pressable>

                    <Pressable
                        style={filtroAtivo === 'Enquetes' ? index.filtroAtivo : index.filtro}
                        onPress={() => handleFiltroPress('Enquetes')}
                    >
                        <Text style={index.textoFiltro}>Enquetes</Text>
                    </Pressable>

                    <Pressable
                        style={filtroAtivo === 'Cardápio' ? index.filtroAtivo : index.filtro}
                        onPress={() => handleFiltroPress('Cardápio')}
                    >
                        <Text style={index.textoFiltro}>Cardápio</Text>
                    </Pressable>

                    <Pressable
                        style={filtroAtivo === 'Sugestões' ? index.filtroAtivo : index.filtro}
                        onPress={() => handleFiltroPress('Sugestões')}
                    >
                        <Text style={index.textoFiltro}>Sugestões</Text>
                    </Pressable>

                </View>
                <View style={index.linha2}></View>
            </View>

            <View style={index.main}>

                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <>
                            <Post
                                texto={item.texto}
                                imagens={item.imagens}
                                imagem={item.imagem}
                                tipo={item.tipo}
                                opcoes={item.opcoes}
                            />
                            <View style={{
                                width: '95%',
                                height: 2,
                                backgroundColor: '#ff0000',
                                opacity: 0.18,
                                alignSelf: 'center', // Centraliza a linha divisória
                                marginVertical: 25, // Espaçamento vertical entre posts
                            }} />
                        </>
                    )}
                    style={{
                        width: '100%', marginTop: 20
                    }}
                />

            </View>

        </View>

    );
}

function SettingsScreen() {

    const toggleSwitch = () => {
        setIsToggled(prev => !prev);
    };



    return (
        <View style={{ flex: 0.9, justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>

            <View style={config.perfil}>

                <Image style={config.imagemAluno} source={require('../assets/img/alunoFt.png')}></Image>
                <Text style={config.nomeAluno}> {userData.nome} </Text>
            </View>

            <View style={config.contato}>

                <Text style={config.titulo}>contato</Text>

                <View>
                    <View style={config.box}>
                        <View style={config.a}>
                            <Ionicons name={'call'} size={24} color={'#000'} />
                            <Text style={config.desc}> Telefone </Text>
                        </View>
                        <Text style={config.assunto}> {userData.telefone} </Text>
                    </View>

                    <View style={config.box}>
                        <View style={config.a}>
                            <Ionicons name={'mail'} size={24} color={'#000'} />
                            <Text style={config.desc}> Email </Text>
                        </View>
                        <Text style={config.assunto}> {userData.email} </Text>
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
        </View>
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

const index = StyleSheet.create({
    header: {
        marginTop: 10,
        width: '100%',
        flex: 1,
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
    filtroBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 8
    },
    filtro: {
        borderRadius: 25,
        backgroundColor: '#F3F3F3',
        borderColor: '#9F9F9F',
        borderWidth: 0.3,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    filtroAtivo: {
        borderRadius: 25,
        backgroundColor: '#F9DCDC',
        borderColor: '#F9DCDC',
        borderWidth: 0.3,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    textoFiltro: {
        fontSize: 12,
    },
    main: {
        flex: 4,
        width:' 100%',
        alignItems:' center',
        justifyContent: 'center',
        marginTop: -45
    },
});