
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    Pressable,
    Animated
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function Bem_Vindo() {
    const navigation = useNavigation();
    const route = useRoute(); // Inicialize o hook useRoute corretamente

    const { usuario } = route.params;

    const [isChecked, setIsChecked] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [criteriaStatus, setCriteriaStatus] = useState({
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSymbol: false,
        hasMinLength: false,
    });
    const progressBarWidth = `${(passwordStrength / 5) * 100}%`;
    const [progressWidth] = useState(new Animated.Value(0));

    const animateProgressBar = (strength) => {
        const newWidth = (strength / 5) * 100;

        Animated.timing(progressWidth, {
            toValue: newWidth,
            duration: 300, // Duração da transição em milissegundos
            useNativeDriver: false, // Como estamos animando a largura, useNativeDriver deve ser falso
        }).start();
    };

    // Chamar a função de animação toda vez que a força da senha mudar
    React.useEffect(() => {
        animateProgressBar(passwordStrength);
    }, [passwordStrength]);



    const toggleCheck = () => {
        setIsChecked(prevState => !prevState);
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;

        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        const hasMinLength = password.length >= 8;

        setCriteriaStatus({
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSymbol,
            hasMinLength,
        });

        if (hasUpperCase) strength++;
        if (hasLowerCase) strength++;
        if (hasNumber) strength++;
        if (hasSymbol) strength++;
        if (hasMinLength) strength++;

        setPasswordStrength(strength);
    };

    // Função para definir a cor da barra com base na força da senha
    const getProgressBarColor = (strength) => {
        switch (strength) {
            case 1:
                return '#ff4d4d'; // Vermelho
            case 2:
                return '#ff9933'; // Laranja
            case 3:
                return '#ffcc00'; // Amarelo
            case 4:
                return '#99cc33'; // Verde-claro
            case 5:
                return '#339900'; // Verde-escuro
            default:
                return '#E6E6E6'; // Cinza para zero critério
        }
    };


    const getTextColor = (isValid) => {
        return isValid ? 'green' : 'red';
    };

    return (

        
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image style={styles.imagemLogo} source={require('../assets/img/logo.png')} />
                <View style={styles.linha}></View>
            </View>

            <View style={styles.form}>

                <View style={styles.inputs}>
                    {/* Campo de nova senha com ícone de olho */}
                    <View style={{ width: `100%` }}>
                        <Text style={styles.label}>Nova senha:</Text>
                        <View style={styles.inputLogin}>

                            <TextInput
                                placeholder='Digite aqui ...'
                                style={styles.input}
                                secureTextEntry={!passwordVisible}  // Alterna entre mostrar/ocultar senha
                                onChangeText={(text) => {
                                    setPassword(text);
                                    checkPasswordStrength(text);
                                }}
                                value={password}
                            />
                            <Ionicons
                                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                                size={24}
                                color="#B3B3B3"
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.eyeIcon}
                            />

                        </View>
                    </View>

                    {/* Barra de força da senha */}
                    {/* Barra de força da senha */}
                    <View style={styles.progressBarContainer}>
                        <Animated.View
                            style={[
                                styles.progressBar,
                                {
                                    width: progressWidth.interpolate({
                                        inputRange: [0, 100],
                                        outputRange: ['0%', '100%']
                                    }),
                                    backgroundColor: getProgressBarColor(passwordStrength)
                                }
                            ]}
                        />
                    </View>



                    {/* Textos dos critérios */}
                    <View style={styles.criteriaContainer}>
                        <Text style={[styles.criteriaText, { color: getTextColor(criteriaStatus.hasUpperCase) }]}>
                            * Letra Maiúscula
                        </Text>
                        <Text style={[styles.criteriaText, { color: getTextColor(criteriaStatus.hasLowerCase) }]}>
                            * Letra Minúscula
                        </Text>
                        <Text style={[styles.criteriaText, { color: getTextColor(criteriaStatus.hasNumber) }]}>
                            * Número
                        </Text>
                        <Text style={[styles.criteriaText, { color: getTextColor(criteriaStatus.hasSymbol) }]}>
                            * Símbolo
                        </Text>
                        <Text style={[styles.criteriaText, { color: getTextColor(criteriaStatus.hasMinLength) }]}>
                            * 8 ou mais dígitos
                        </Text>
                    </View>

                    {/* Campo de confirmar senha com ícone de olho */}
                    <View style={{ width: `100%` }}>
                        <Text style={styles.label}>Confirme a senha:</Text>
                        <View style={styles.inputSenha}>

                            <TextInput
                                placeholder='Digite aqui ...'
                                style={styles.input}
                                secureTextEntry={!confirmPasswordVisible}
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                            <Ionicons
                                name={confirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                size={24}
                                color="#B3B3B3"
                                onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                style={styles.eyeIcon}
                            />

                        </View>
                    </View>
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
                <Pressable onPress={() => navigation.navigate(usuario)} style={styles.botaoEntrar}>
                    <Text style={styles.textoBotao}>Entrar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: `space-between`
    },
    logo: {
        alignItems: 'center',
        marginTop: 20,
    },
    linha: {
        marginTop: 6,
        width: 250,
        height: 2,
        backgroundColor: '#ff3838',
    },
    form: {
        alignItems: 'center',
        justifyContent: `flex-start`,
    },
    inputs: {
        width: `100%`,
    },
    inputSenha: {
        backgroundColor: '#F5F5F5',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        elevation: 2,
        paddingHorizontal: 5,
        paddingVertical: 4,
    },
    inputLogin: {
        backgroundColor: '#F5F5F5',
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 3,
        elevation: 2,
        paddingHorizontal: 5,
        paddingVertical: 4
    },
    input: {
        width: '95%',
        borderRadius: 5,
        fontSize: 18,
    },
    eyeIcon: {
        marginRight: 5,
    },
    label: {
        fontSize: 14,
    },
    manterLogin: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25
    },
    butaoManter: {
        width: 260,
        fontSize: 14,
        color: '#0D11F0',
        marginLeft: 10,
        textDecorationLine: 'underline',
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 75
    },
    botaoEntrar: {
        backgroundColor: '#ff3838',
        width: 110,
        height: 31,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textoBotao: {
        color: '#fff',
        fontSize: 16,
    },
    progressBarContainer: {
        width: `auto`,
        height: 15,
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
        marginBottom: 15,
    },
    progressBar: {
        height: '100%',
    },
    criteriaContainer: {
        marginTop: 10,
        marginBottom: 25,
        alignItems: 'flex-start',
    },
    criteriaText: {
        fontSize: 16,
        marginVertical: 3,
    },


});