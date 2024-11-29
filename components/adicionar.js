    import React, { useState } from 'react';
    import { Modal, View, Text, TextInput, Pressable, StyleSheet, Image, ScrollView } from 'react-native';
    import { Ionicons } from '@expo/vector-icons';
    import DropDownPicker from 'react-native-dropdown-picker';
    import * as ImagePicker from 'expo-image-picker';
    import Feather from '@expo/vector-icons/Feather';
    import MaterialIcons from '@expo/vector-icons/MaterialIcons';

    const Adicionar = ({ visible, onClose, onSubmit }) => {


        // picker

        const [open, setOpen] = useState(false);
        const [value, setValue] = useState('opcao1');
        const [items, setItems] = useState([
            { label: 'Sugestao', value: 'opcao1' },
            { label: 'Enquetes', value: 'opcao2' },
            { label: 'Cardapio', value: 'opcao3' },
        ]);

        //op 1

        const [selectedImages, setSelectedImages] = useState([]);

        const pickImageAsync = async () => {
            if (selectedImages.length >= 4) {
                alert('Você só pode adicionar até 4 imagens.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const newImageUri = result.assets[0].uri;
                console.log("Imagem selecionada URI:", newImageUri); // Verifica o URI da imagem selecionada
                setSelectedImages([...selectedImages, newImageUri]);
            } else {
                alert('Você não selecionou nenhuma imagem.');
            }
        };

        const removeImage = (indexToRemove) => {
            setSelectedImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
        };

        //op 2

        const [options, setOptions] = useState(['', '']); // Começa com duas opções
        const [numOptions, setNumOptions] = useState(2);  // Controla o número de opções

        const updateOption = (index, value) => {
            const newOptions = [...options];
            newOptions[index] = value;
            setOptions(newOptions);
        };

        const incrementOptions = () => {
            if (numOptions < 10) {  // Limite de 10 opções
                setNumOptions(numOptions + 1);
                setOptions([...options, '']);  // Adiciona uma nova opção vazia
            }
        };

        const decrementOptions = () => {
            if (numOptions > 2) {  // Mínimo de 2 opções
                setNumOptions(numOptions - 1);
                setOptions(options.slice(0, -1));  // Remove a última opção
            }
        };

        //op 3

        const [selectedImage, setSelectedImage] = useState(null);

        const pickImageOneAsync = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const newImageUri = result.assets[0].uri;
                console.log("Imagem selecionada URI:", newImageUri); // Verifica o URI da imagem selecionada
                setSelectedImage(newImageUri); // Armazena a imagem selecionada
            } else {
                alert('Você não selecionou nenhuma imagem.');
            }
        };

        const clearSelectedImage = () => {
            setSelectedImage(null); // Redefine selectedImage para null, apagando a imagem selecionada
        };


        // postar

        const [texto, setTexto] = useState('');
        const [titulo, setTitulo] = useState(``)


        const handleEnviar = () => {
            let dataToSubmit = null;
            let isValid = false;  // Flag para verificar se os dados estão válidos
        
            // Verifica a opção selecionada no picker e cria um objeto conforme necessário
            if (value === 'opcao1') {
                if (texto.trim() !== '') {  // Verifica se o texto não está vazio
                    dataToSubmit = {
                        tipo: 'sugestao',
                        texto: texto,
                        imagens: selectedImages,
                    };
                    isValid = true;
                } else {
                    alert('Por favor, preencha o campo de texto para a sugestão.');
                }
            } else if (value === 'opcao2') {
                // Verifica se o título não está vazio e se todas as opções têm valores
                const areOptionsFilled = options.every(option => option.trim() !== '');
                if (titulo.trim() !== '' && areOptionsFilled) {
                    dataToSubmit = {
                        tipo: 'enquete',
                        texto: titulo,
                        opcoes: options,
                    };
                    isValid = true;
                } else {
                    alert('Por favor, preencha o título e todas as opções para a enquete.');
                }
            } else if (value === 'opcao3') {
                // Verifica se uma imagem foi selecionada
                if (selectedImage) {
                    dataToSubmit = {
                        tipo: 'cardapio',
                        imagem: selectedImage,
                    };
                    isValid = true;
                } else {
                    alert('Por favor, selecione uma imagem para o cardápio.');
                }
            }
        
            // Envia o objeto ao componente pai se os dados estiverem válidos
            if (isValid && dataToSubmit) {
                onSubmit(dataToSubmit);
                onClose();  // Fecha o modal após o envio
            }
        };
        


        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >

                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.header}>
                            <Pressable onPress={onClose}>
                                <Ionicons name={'close-circle-outline'} size={40} color={'#ff0000'} />
                            </Pressable>
                            <View style={styles.linha}></View>
                        </View>

                        <View style={styles.form}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="Selecione uma opção"
                                style={styles.pickerContainer}
                                dropDownContainerStyle={styles.dropdownContainer}
                                itemSeparator={true}
                                itemSeparatorStyle={styles.separator}
                                selectedItemContainerStyle={styles.selectedItemContainer}
                                selectedItemLabelStyle={styles.selectedItemLabel}
                            />

                            {value === 'opcao1' ? (
                                <>
                                    <View style={styles.textAreaContainer}>
                                        <TextInput
                                            style={styles.textArea}
                                            placeholder="Digite algo mais..."
                                            placeholderTextColor="#999"
                                            multiline={true}
                                            numberOfLines={6}
                                            value={texto}
                                            onChangeText={setTexto}
                                        />
                                        <Pressable onPress={pickImageAsync} style={styles.attachButton}>
                                            <Feather name="paperclip" size={20} color="#727272" />
                                        </Pressable>
                                    </View>

                                    <View style={styles.imagePreviewContainer}>
                                        {selectedImages.map((imageUri, index) => (
                                            <View key={index} style={styles.imageWrapper}>
                                                <Image
                                                    source={{ uri: imageUri }}
                                                    style={styles.previewImage}
                                                />
                                                <Pressable
                                                    onPress={() => removeImage(index)}
                                                    style={styles.deleteButton}
                                                >
                                                    <Ionicons name="trash-outline" size={20} color="#ff3838" />
                                                </Pressable>
                                            </View>
                                        ))}
                                    </View>
                                </>
                            ) : value === 'opcao2' ? (
                                <View style={styles.otherOptionContainer}>
                                    <TextInput
                                        style={styles.titulo}
                                        placeholder="Digite o título..."
                                        value={titulo}
                                        onChangeText={setTitulo}
                                    />

                                    <View style={styles.numInputContainer}>
                                        <Pressable onPress={decrementOptions} style={styles.arrowButton}>
                                            <Ionicons name="remove-circle-outline" size={24} color="#727272" />
                                        </Pressable>
                                        <TextInput
                                            style={styles.numInput}
                                            value={String(numOptions)}  // Exibe o número de opções
                                            keyboardType="numeric"
                                            editable={false}  // Desabilita edição direta
                                        />
                                        <Pressable onPress={incrementOptions} style={styles.arrowButton}>
                                            <Ionicons name="add-circle-outline" size={24} color="#727272" />
                                        </Pressable>
                                    </View>

                                    <ScrollView
                                        style={styles.enquete}
                                        contentContainerStyle={styles.enqueteContent}
                                        showsVerticalScrollIndicator={false}
                                    >
                                        {options.map((option, index) => (
                                            <View key={index} style={styles.option}>
                                                <MaterialIcons name={"radio-button-off"} size={24} color={"#E6E6E6"} />
                                                <TextInput
                                                    style={styles.textOption}
                                                    placeholder="Digite aqui..."
                                                    value={option}
                                                    onChangeText={(text) => updateOption(index, text)}
                                                />
                                            </View>
                                        ))}
                                    </ScrollView>
                                </View>
                            ) : (
                                <View style={styles.ImageFood}>

                                    {selectedImage ? (
                                        <>

                                            <Image
                                                source={{ uri: selectedImage }}
                                                style={styles.previewOneImage}
                                            />

                                            <Pressable
                                                onPress={clearSelectedImage}
                                                style={styles.deleteButton}
                                            >
                                                <Ionicons name="trash-outline" size={20} color="#ff3838" />
                                            </Pressable>
                                        </>
                                    ) : (
                                        <Pressable onPress={pickImageOneAsync}>
                                            <Ionicons name="add-circle-outline" size={30} color="#000" />
                                        </Pressable>
                                    )}

                                </View>
                            )}

                        </View>

                        <Pressable onPress={handleEnviar} style={styles.botaoEntrar}>
                            <Text style={styles.textoBotao}>Enviar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        );
    };

    const styles = StyleSheet.create({
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 10,
        },

        enquete: {
            width: '100%',
            maxHeight: 150, // Altura máxima do ScrollView
            marginVertical: 20,
        },
        enqueteContent: {
            paddingBottom: 10, // Para dar espaço abaixo do último item
        },
        option: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
        },
        textOption: {
            borderBottomWidth: 1,
            borderColor: '#727272',
            width: '90%',
            marginLeft: 5,
        },
        modalContainer: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // fundo escurecido
        },
        modalContent: {
            height: 'auto',
            width: '90%',
            padding: 20,
            backgroundColor: '#fff',
            borderRadius: 10,
            alignItems: 'center',
        },
        linha: {
            width: '70%',
            height: 2,
            backgroundColor: '#ff3838',
            opacity: 0.18,
            marginVertical: 15,
        },
        header: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        form: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        pickerContainer: {
            borderWidth: 0, // Mantido conforme solicitado  
            width: '100%',
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            marginBottom: 10,
        },
        titulo: {
            width: '100%',
            height: 50,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 6,
        },
        dropdownContainer: {
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#ffffff', // Cor de fundo do dropdown
            borderRadius: 10,
        },
        separator: {
            backgroundColor: '#ccc', // Cor do separador entre os itens
            height: 1,
        },
        selectedItemContainer: {
            backgroundColor: '#e0e0e0', // Cor de fundo para o item selecionado
        },
        selectedItemLabel: {
            fontWeight: 'bold', // Estilo do texto para o item selecionado
        },
        textAreaContainer: {
            position: 'relative',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 15,
        },
        textArea: {
            flex: 1,
            width: '100%',
            padding: 10,
            backgroundColor: '#F0F0F0',
            borderRadius: 10,
            textAlignVertical: 'top', // Alinha o texto no topo do TextArea
            minHeight: 200,
        },
        attachButton: {
            position: 'absolute',
            bottom: 10,
            right: 10,
        },
        imagePreviewContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap', // Permite que as imagens fiquem em várias linhas, se necessário
            justifyContent: '~space-between', // Espaçamento entre as imagens
            width: '100%',
            marginTop: 10,
        },
        imageWrapper: {
            width: 60,
            height: 60,
            marginBottom: 10, // Espaçamento abaixo de cada imagem
            position: 'relative', // Para posicionar o botão de deletar
        },
        previewImage: {
            width: '100%',
            height: '100%',
            borderRadius: 5,
        },
        deleteButton: {
            position: 'absolute',
            top: -10, // Ajusta a posição do botão de deletar
            right: -10,
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 2,
            elevation: 5, // Adiciona sombra para destacar o botão
        },
        botaoEntrar: {
            backgroundColor: '#ff3838',
            width: 100,
            height: 30,
            marginVertical: 10,
            borderRadius: 8,
            elevation: 2,
            justifyContent: 'center',
            alignItems: 'center',
        },
        textoBotao: {
            color: '#fff',
            fontSize: 15,
        },
        otherOptionContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        otherOptionText: {
            fontSize: 16,
            color: '#333',
            textAlign: 'center',
        },
        numInput: {
            width: '100%',
            height: 40,
            backgroundColor: '#f0f0f0',
            borderRadius: 10,
            paddingHorizontal: 10,
            textAlign: 'center',
        },
        numInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
        },
        numInput: {
            width: 50,
            height: 40,
            textAlign: 'center',
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            marginHorizontal: 10,
            fontSize: 18,
        },
        arrowButton: {
            padding: 5,
        },
        previewOneImage: {
            width: 200,
            height: 200,
            borderRadius: 10,
            marginTop: 10,
        },

    });

    export default Adicionar;
