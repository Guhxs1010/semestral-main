import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Pressable,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from './supabase'; 


export default function Bem_Vindo() {

    const navigation = useNavigation();

    // Novo estado para controlar a tela de carregamento
    const [loading, setLoading] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [identifier, setIdentifier] = useState(""); //cpf
  const [password, setPassword] = useState("");

    // useEffect para simular a tela de carregamento
    useEffect(() => {
        // Esconde a tela de carregamento após 2 segundos
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Limpa o timer quando o componente desmontar
        return () => clearTimeout(timer);
    }, []);

    const toggleCheck = () => {
        setIsChecked(prevState => !prevState);
    };


    const handleLogin = async (cpf, password) => {
        const email = await buscarEmailPorCpf(cpf); // Busca o email pelo CPF
    
        if (email) {
          const sucesso = await realizarLogin(email, password); // Realiza o login
          if (sucesso) {
            console.log('Usuário logado com sucesso!');
          } else {
            console.log('Falha no login.');
          }
        } else {
          console.log('Não foi possível encontrar o email para o CPF informado.');
        }
      };
    
      const buscarEmailPorCpf = async (cpf) => {
        console.log(cpf);
    
        try {
          const { data, error } = await supabase
            .from('profiles')  // Nome da tabela
            .select('email')   // Seleciona a coluna 'email'
            .eq('cpf', cpf);   // Filtra pelo CPF
    
          if (error) {
            console.error('Erro ao buscar o email:', error.message);
            return null;
          }
    
          // Verifica se encontrou algum resultado
          if (data && data.length > 0) {
            const email = data[0].email; // Obtém o email do primeiro resultado
            console.log('Email encontrado:', email);
            return email;
          } else {
            console.log('CPF não encontrado');
            return null;
          }
        } catch (err) {
          console.error('Erro desconhecido:', err);
          return null;
        }
      };
    
    
      const realizarLogin = async (email, password) => {
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
    
          if (error) {
            console.error('Erro ao realizar login:', error.message);
            return false; // Indica falha no login
          }
    
          console.log('Login realizado com sucesso!');
          return true; // Indica sucesso no login
        } catch (err) {
          console.error('Erro desconhecido ao tentar logar:', err);
          return false;
        }
      };

    // Se ainda estiver carregando, exibe a tela de carregamento
    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Image
                    style={styles.loadingImage}
                    source={require('../assets/img/logo-branca.png')} // Substitua pelo caminho da imagem que deseja usar
                />
            </View>
        );
    }

    // Conteúdo principal
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollViewContent} keyboardShouldPersistTaps="handled">
                    <View style={styles.box}>
                        <View style={styles.logo}>
                            <Image
                                style={styles.imagemLogo}
                                source={require('../assets/img/logo.png')}
                            />
                            <View style={styles.linha}></View>
                        </View>

                        <View style={styles.form}>
                            <View style={styles.inputLogin}>
                                <Text style={styles.label}>Login: </Text>
                                <TextInput
                                    placeholder='Digite aqui ...'
                                    style={styles.input}
                                    value={login}
                                    onChangeText={setLogin}
                                />
                            </View>

                            <View style={styles.inputSenha}>
                                <Text style={styles.label}>Senha: </Text>
                                <TextInput
                                    placeholder='Digite aqui ...'
                                    style={styles.input}
                                    secureTextEntry
                                    value={senha}
                                    onChangeText={setSenha}
                                />
                            </View>

                            <Pressable style={styles.manterLogin} onPress={toggleCheck}>
                                <MaterialIcons
                                    name={isChecked ? "radio-button-on" : "radio-button-off"}
                                    size={24}
                                    color={isChecked ? "#0D11F0" : "#E6E6E6"}
                                />
                                <Text style={styles.butaoManter}>Manter Login</Text>
                            </Pressable>
                        </View>

                        <View style={styles.botao}>
                            <Pressable onPress={() => handleLogin(identifier, password)} style={styles.botaoEntrar}>
                                <Text style={styles.textoBotao}>Entrar</Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ff3838',
        justifyContent: 'flex-end',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff3838', // Cor de fundo durante o carregamento
    },
    loadingImage: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    scrollViewContent: {
        flexGrow: 1,
        width: '100%',
        justifyContent: 'flex-end',
    },
    box: {
        paddingVertical: 20,
        width: '100%',
        flex: 0.5,
        backgroundColor: '#fff',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    linha: {
        marginTop: 6,
        width: 250,
        height: 2,
        backgroundColor: '#ff3838'
    },
    form: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    input: {
        backgroundColor: '#F5F5F5',
        width: 280,
        height: 30,
        borderRadius: 3,
        elevation: 2,
        paddingHorizontal: 5,
        marginTop: 10,
    },
    label: {
        fontSize: 14
    },
    manterLogin: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    butaoManter: {
        width: 260,
        fontSize: 14,
        color: '#0D11F0',
        marginLeft: 10,
        textDecorationLine: 'underline'
    },
    botao: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botaoEntrar: {
        backgroundColor: '#ff3838',
        width: 100,
        height: 30,
        borderRadius: 8,
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textoBotao: {
        color: '#fff',
        fontSize: 15,
    }
});
