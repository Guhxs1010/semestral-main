import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Componente Post
const Post = ({ texto, imagens, imagem, tipo, opcoes }) => {
    return (
        <View style={[styles.container]}>

            <View style={styles.header}>

                <View style={styles.box}>
                    <Image style={styles.img} source={require(`../assets/img/alunoFt.png`)} />

                    <Text style={styles.nome}>Nutricionista</Text>
                    <Text style={styles.time}>08/09/2024</Text>
                </View>

                <Pressable onPress={() => console.log(`press in more`)}>
                    <Ionicons name={'ellipsis-horizontal'} size={30} color={'#000'} />
                </Pressable>
            </View>

            {tipo === 'cardapio' && imagem && (
                <View style={styles.cardapioConteiner}>
                    <Image source={{ uri: imagem }} style={styles.postImage} />
                </View>
            )}

            {tipo === 'enquete' && (
                <View style={styles.enqueteConteiner}>
                    <Text style={styles.postText}>{texto}</Text>

                    <View style={styles.enqueteOptionsContainer}>
                        {opcoes?.map((opcao, index) => (
                            <View key={index} style={styles.enqueteOption}>
                                <Text style={styles.enqueteOptionText}>{opcao}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {tipo === 'sugestao' && (
                <View style={styles.sugestaoConteiner}>
                    <Text style={styles.postText}>{texto}</Text>

                    <View style={styles.imagesContainer}>
                        {imagens?.map((imageUri, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={styles.previewImage}
                                />
                            </View>
                        ))}

                    </View>
                </View>
            )}
        </View>
    );
};

// Estilos
const styles = StyleSheet.create({
    container: {
        padding: 10,

    },
    postText: {
        fontSize: 16,
    },
    imagesContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: `space-between`
    },

    imageWrapper: {
        width: 70,
        height: 70,
        marginBottom: 10, // Espaçamento abaixo de cada imagem
    
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    postImage: {
        width: `100%`,
        height: 200,
        marginRight: 10,
        marginBottom: 10,
        borderRadius: 10,
    },
    enqueteOptionsContainer: {
        marginTop: 10,
    },
    enqueteOption: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        padding: 10,
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    enqueteOptionText: {
        fontSize: 14,
        color: '#333',
    },
    img: {
        width: 40,
        height: 40
    },
    header: {
        flexDirection: `row`,
        alignItems: `center`,
        justifyContent: `space-between`,
        marginHorizontal: 5,
    },
    box: {
        flexDirection: `row`,
        alignItems: `center`,
    },
    nome: {
        marginLeft: 5,
        fontSize: 14,
    },
    time: {
        marginLeft: 5,
        fontSize: 12,
        paddingTop: 1,
        color: `#474747`
    },
    sugestaoConteiner: {
        marginHorizontal: 10,
        marginTop: 10
    },
    enqueteConteiner:{
        marginHorizontal: 10,
        marginTop: 10
    },
    cardapioConteiner: {
        marginTop: 10,
        marginHorizontal: 10,
    },

});

export default Post;
