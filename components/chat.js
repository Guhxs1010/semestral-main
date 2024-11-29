import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatApp = ({ contato, mensagens, onClose, onSendMessage }) => {
    // Simulação de mensagens em um array
    const [messages, setMessages] = useState(mensagens);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        setMessages(mensagens);
    }, [mensagens]);

    // Usuário atual
    const currentUser = 'me';

    // Função para adicionar uma nova mensagem
    const handleSendMessage = () => {
        if (newMessage.trim() === '') return; // Verifica se a mensagem não está vazia

        const newMsg = {
            id: Math.random().toString(), // Gera um ID único
            text: newMessage,
            sender: currentUser,
        };

        // Chama a função passada pelo pai para enviar a nova mensagem
        onSendMessage(contato.id, newMsg); // Passa o ID do contato e a nova mensagem
        setNewMessage(''); // Limpa o campo de entrada
    };


    // Função para renderizar cada item da lista de mensagens
    const renderMessage = ({ item }) => {
        const isMyMessage = item.sender === currentUser;
        return (
            <View
                style={[
                    styles.messageContainer,
                    isMyMessage ? styles.myMessage : styles.otherMessage,
                ]}
            >
                <Text style={isMyMessage ? styles.myMessageText : styles.otherMessageText}>
                    {item.text}
                </Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho do chat com o nome do contato */}
            <View style={styles.header}>

                <TouchableOpacity onPress={onClose}>
                    <Ionicons name={'arrow-back-outline'} size={20} color={'#000'} />
                </TouchableOpacity>

                <Image style={styles.imagemAluno} source={require('../assets/img/alunoFt.png')}></Image>

                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.text}> {contato.nome} </Text>
                    <Text style={styles.subText}> {contato.telefone} </Text>
                </View>

            </View>
            <View style={styles.linha}></View>

            {/* Lista de mensagens */}
            <FlatList
                data={messages.filter(msg => msg.text !== "")}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
                style={styles.messageList}
                contentContainerStyle={{ paddingBottom: 20 }}
            />

            {/* Campo de texto e botão de envio */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Digite uma mensagem..."
                    style={styles.textInput}
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <Ionicons name={'arrow-up-outline'} size={20} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    messageList: {
        flex: 1,
        marginHorizontal: 10
    },
    messageContainer: {
        padding: 10,
        borderRadius: 20,
        marginVertical: 5,
        maxWidth: '70%',
    },
    myMessage: {
        backgroundColor: '#ECECEC',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#ECECEC',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: '#ECECEC',
        alignSelf: 'flex-start',
    },
    myMessageText: {
        color: '#000',
    },
    otherMessageText: {
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ECECEC',
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#FF3838',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imagemAluno: {
        marginLeft: 10,
        width: 45,
        height: 45
    },
    text: {
        fontSize: 14,
        color: '#000'
    },
    subText: {
        fontSize: 12,
        color: '#727272'
    },
    linha: {
        marginVertical: 10,
        width: '100%',
        height: 0.7,
        borderWidth: 0.7,
        borderColor: '#ff0000',
    }

});

export default ChatApp;
