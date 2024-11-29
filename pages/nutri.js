import React, { useState, useLayoutEffect, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { LineChart, BarChart, ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import axios from "axios";
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
  Modal,
  ScrollView
} from "react-native";
import { supabase } from "../supabase";

import Adicionar from "../components/adicionar";
import Contato from "../components/contato";
import LaudoAluno from "../components/laudo";
import ContatoPai from "../components/contatoPai";
import ChatApp from "../components/chat";
import Post from "../components/post";

//paginas


function HomeScreen() {
    const [filtroAtivo, setFiltroAtivo] = useState("Geral");
    const [isModalVisible, setModalVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [postEditando, setPostEditando] = useState(null); // Post em edição
  
    const handleFiltroPress = (filtro) => {
      setFiltroAtivo(filtro);
    };
  
    const openModal = (post = null) => {
      setPostEditando(post);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setPostEditando(null);
      setModalVisible(false);
    };
  
    
    const removerPost = (postParaRemover) => {
      setPosts(posts.filter((post) => post !== postParaRemover));
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
      <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff" }}>
        <View style={home.header}>
          <Image
            style={home.logo}
            source={require("../assets/img/logo.png")}
          ></Image>
          <View style={home.linha1}></View>
          <View style={home.filtroBox}>
            <Pressable
              style={filtroAtivo === "Geral" ? home.filtroAtivo : home.filtro}
              onPress={() => handleFiltroPress("Geral")}
            >
              <Text style={home.textoFiltro}>Geral</Text>
            </Pressable>
  
            <Pressable
              style={filtroAtivo === "Enquetes" ? home.filtroAtivo : home.filtro}
              onPress={() => handleFiltroPress("Enquetes")}
            >
              <Text style={home.textoFiltro}>Enquetes</Text>
            </Pressable>
  
            <Pressable
              style={filtroAtivo === "Cardápio" ? home.filtroAtivo : home.filtro}
              onPress={() => handleFiltroPress("Cardápio")}
            >
              <Text style={home.textoFiltro}>Cardápio</Text>
            </Pressable>
  
            <Pressable
              style={filtroAtivo === "Sugestões" ? home.filtroAtivo : home.filtro}
              onPress={() => handleFiltroPress("Sugestões")}
            >
              <Text style={home.textoFiltro}>Sugestões</Text>
            </Pressable>
          </View>
          <View style={home.linha2}></View>
        </View>
  
        <View style={home.main}>
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
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <TouchableOpacity onPress={() => removerPost(item)}>
                    <Ionicons name="trash-outline" size={30} color={'#ff0000'}/>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    width: "95%",
                    height: 2,
                    backgroundColor: "#ff0000",
                    opacity: 0.18,
                    alignSelf: "center",
                    marginVertical: 25,
                  }}
                />
              </>
            )}
            style={{ width: "100%" }}
          />
        </View>
  
        <Pressable onPress={() => openModal()} style={home.botaoAdicionar}>
          <Ionicons name={"add-outline"} size={30} color={"#fff"} />
        </Pressable>
  
        {isModalVisible && (
          <Adicionar
            visible={isModalVisible}
            onClose={closeModal}
            postEditando={postEditando} // Passa o post em edição
          />
        )}
      </View>
    );
  }

function SettingsScreen() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <View
      style={{
        flex: 0.9,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: `#fff`,
      }}
    >
      <View style={config.perfil}>
        <Image
          style={config.imagemAluno}
          source={require("../assets/img/alunoFt.png")}
        ></Image>
        <Text style={config.nomeAluno}>Nome da nutricionista</Text>
      </View>

      <View style={config.contato}>
        <Text style={config.titulo}>contato</Text>

        <View>
          <View style={config.box}>
            <View style={config.a}>
              <Ionicons name={"call"} size={24} color={"#000"} />
              <Text style={config.desc}> Telefone </Text>
            </View>
            <Text style={config.assunto}> (+55) 11 12345-6789 </Text>
          </View>

          <View style={config.box}>
            <View style={config.a}>
              <Ionicons name={"mail"} size={24} color={"#000"} />
              <Text style={config.desc}> Email </Text>
            </View>
            <Text style={config.assunto}>
              {" "}
              nome.sobrenome@portalsesisp.org.br{" "}
            </Text>
          </View>
        </View>
      </View>

      <View style={config.config}>
        <Text style={config.titulo}>Configuração</Text>

        <View>
          <View style={config.box}>
            <View style={config.a}>
              <Ionicons name={"notifications"} size={24} color={"#000"} />
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
              <Ionicons name={"menu"} size={24} color={"#000"} />
              <Text style={config.desc}> Termos </Text>
            </View>
            <Ionicons name={"chevron-forward"} size={24} color={"#727272"} />
          </View>
        </View>
      </View>
    </View>
  );
}



const dadosDashboard = {
  alunosPorMes: [
    { mes: 'Janeiro', media: 120 },
    { mes: 'Fevereiro', media: 150 },
    { mes: 'Março', media: 110 },
    { mes: 'Abril', media: 140 },
    { mes: 'Maio', media: 130 },
    { mes: 'Junho', media: 160 },
    { mes: 'Julho', media: 170 },
    { mes: 'Agosto', media: 145 },
    { mes: 'Setembro', media: 155 },
    { mes: 'Outubro', media: 125 },
    { mes: 'Novembro', media: 135 },
    { mes: 'Dezembro', media: 140 },
  ],
  desperdicioTrimestral: [
    { trimestre: 'Q1', porcentagem: 12.5 },
    { trimestre: 'Q2', porcentagem: 15.0 },
    { trimestre: 'Q3', porcentagem: 10.2 },
    { trimestre: 'Q4', porcentagem: 13.8 },
  ],
};

const Dashboard = () => {
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  // useLayoutEffect(() => {
  //   const onResize = () => {
  //     setWindowWidth(Dimensions.get('window').width);
  //   };

  //   Dimensions.addEventListener('change', onResize);

  //   return () => {
  //     Dimensions.removeEventListener('change', onResize);
  //   };
  // }, []);

  return (
    <ScrollView style={dash.container}>
      
      <View style={chat.header}>
        <Image style={chat.logo} source={require('../assets/img/logo.png')} />
        <View style={chat.linha1}></View>
      </View>

      {/* Estatísticas principais */}
      <View style={dash.dash1}>
        <View style={dash.caixa1}>
          <Text style={dash.tituloCaixa}>Alunos presentes:</Text>
          <Text style={dash.numeroCaixa}>356</Text>
        </View>
        <View style={dash.caixa2}>
          <Text style={dash.tituloCaixa}>Alunos com dieta presentes:</Text>
          <Text style={dash.numeroCaixa}>14</Text>
        </View>
      </View>
      {/* Gráfico de média de alunos por mês */}
      <Text style={dash.title}>Média de Alunos por Mês</Text>
      <View style={dash.chartContainer}>
        <LineChart
          data={{
            labels: dadosDashboard.alunosPorMes.map((item) => item.mes),
            datasets: [
              {
                data: dadosDashboard.alunosPorMes.map((item) => item.media),
              },
            ],
          }}
          width={windowWidth - 60} // Ajuste do tamanho dos gráficos
          height={140} // Tamanho reduzido
          yAxisSuffix=" alunos"
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Vermelho
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Preto para o texto
            style: {
              borderRadius: 16,
            },
          }}
          style={dash.chartStyle}
        />
      </View>

      {/* Gráfico de desperdício por trimestre (meia bola) */}
      <Text style={dash.title}>Desperdício por Trimestre</Text>
      <View style={dash.chartContainer}>
        <ProgressChart
          data={{
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            data: dadosDashboard.desperdicioTrimestral.map((item) => item.porcentagem / 100),
          }}
          width={windowWidth - 60} // Ajuste do tamanho dos gráficos
          height={150} // Tamanho reduzido
          strokeWidth={16}
          radius={40}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Vermelho
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Preto para o texto
          }}
          style={dash.chartStyle}
          hideLegend={false}
        />
      </View>
    </ScrollView>
  );
};

function Chat() {
  const [pesquisa, setPesquisa] = useState("");

  const handleInputChange = (text) => {
    setPesquisa(text);
    console.log("Input na pesquisa:", text); // Para visualizar a entrada atual
  };

  const [data, setData] = useState([
    {
      id: 1,
      nome: "Pai do aluno1",
      ultimaMensagem: "Estou com dúvidas sobre a tarefa do aluno 1",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 2,
      nome: "Pai do aluno2",
      ultimaMensagem: "",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 3,
      nome: "Pai do aluno3",
      ultimaMensagem: "",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 4,
      nome: "Pai do aluno4",
      ultimaMensagem: "Estou com dúvidas sobre a tarefa do aluno 4",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 5,
      nome: "Pai do aluno5",
      ultimaMensagem: "",
      telefone: "(+55) 11 12345-5678",
    },
  ]);

  const filteredData = data.filter((item) => {
    // Se houver uma pesquisa, retorne true se o nome contém a pesquisa
    if (pesquisa) {
      return item.nome.toLowerCase().includes(pesquisa.toLowerCase());
    } else {
      // Caso contrário, retorne true se ultimaMensagem não estiver vazia
      return item.ultimaMensagem !== "";
    }
  });

  const [mensagens, setMensagens] = useState({
    1: [
      { id: 1, text: `Olá, eu sou o 1. Como você está?`, sender: "me" },
      { id: 2, text: "Estou bem, obrigado!", sender: "outro" },
      {
        id: 3,
        text: `Estou com dúvidas sobre a tarefa do aluno 1`,
        sender: "me",
      },
    ],
    2: [{ id: 1, text: ``, sender: "" }],
    3: [{ id: 1, text: ``, sender: "" }],
    4: [
      { id: 1, text: `Olá, eu sou o 4. Como você está?`, sender: "me" },
      { id: 2, text: "Estou bem, obrigado!", sender: "me" },
      {
        id: 3,
        text: `Estou com dúvidas sobre a tarefa do aluno 4`,
        sender: "me",
      },
    ],
    5: [{ id: 1, text: ``, sender: "" }],
  });

  const handleSendMessage = (id, newMessage) => {
    // Verifica se há mensagens para o contato específico
    if (mensagens[id]) {
      // Adiciona a nova mensagem ao array de mensagens
      const updatedMessages = [...mensagens[id], newMessage];

      // Atualiza as mensagens do contato
      setMensagens((prevMensagens) => ({
        ...prevMensagens,
        [id]: updatedMessages, // Atualiza as mensagens do contato
      }));

      // Atualiza o valor de ultimaMensagem dentro de data
      setData((prevData) => {
        return prevData.map((contato) => {
          if (contato.id === id) {
            return {
              ...contato,
              ultimaMensagem: newMessage.text, // Atualiza a ultimaMensagem
            };
          }
          return contato; // Retorna os outros contatos inalterados
        });
      });
    }
  };

  const [modalVisible, setModalVisible] = useState(false); // Controle de exibição do modal
  const [selectedContato, setSelectedContato] = useState(null);

  const handlePressContato = (contato) => {
    setSelectedContato(contato); // Salva o contato selecionado
    setModalVisible(true); // Exibe o modal
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: `#fff`,
      }}
    >
      <View style={chat.header}>
        <Image
          style={chat.logo}
          source={require("../assets/img/logo.png")}
        ></Image>
        <View style={chat.linha1}></View>

        <View style={chat.pesquisa}>
          <TextInput
            style={chat.input}
            value={pesquisa}
            onChangeText={handleInputChange}
            placeholder="Pesquise aqui..."
          />

          <Ionicons name={"search-sharp"} size={24} color={"#000"} />
        </View>

        <View style={chat.linha2}></View>
      </View>

      <FlatList
        style={{ flex: 1, width: "90%" }}
        keyExtractor={(item) => String(item.id)}
        data={filteredData}
        renderItem={({ item }) => (
          <ContatoPai data={item} onPress={() => handlePressContato(item)} />
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <ChatApp
          contato={selectedContato}
          mensagens={mensagens[selectedContato?.id]}
          onSendMessage={handleSendMessage}
          onClose={() => setModalVisible(false)}
        />
      </Modal>
    </View>
  );
}

function Laudo() {
  const [pesquisa, setPesquisa] = useState("");

  const handleInputChange = (text) => {
    setPesquisa(text);
    console.log("Input na pesquisa:", text); // Para visualizar a entrada atual
  };

  const data = [
    {
      id: 1,
      nome: "Aluno1",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 2,
      nome: "Aluno2",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 3,
      nome: "Aluno3",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 4,
      nome: "Aluno4",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 5,
      nome: "Aluno5",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 6,
      nome: "Aluno6",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 7,
      nome: "Aluno7",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 8,
      nome: "Aluno8",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
    {
      id: 9,
      nome: "Aluno9",
      Email: "nome.sobrenome@portalsesisp.org.br",
      RM: "1234",
      telefone: "(+55) 11 12345-5678",
    },
  ];

  const [modalVisible, setModalVisible] = useState(false); // Controle de exibição do modal
  const [selectedContato, setSelectedContato] = useState(null);

  const handlePressContato = (contato) => {
    setSelectedContato(contato); // Salva o contato selecionado
    setModalVisible(true); // Exibe o modal
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: `#fff`,
      }}
    >
      <View style={laudo.header}>
        <Image
          style={laudo.logo}
          source={require("../assets/img/logo.png")}
        ></Image>
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
        style={{ flex: 1, width: "90%" }}
        keyExtractor={(item) => String(item.id)}
        data={data}
        renderItem={({ item }) => (
          <Contato data={item} onPress={() => handlePressContato(item)} />
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Fecha o modal ao pressionar o botão de voltar
      >
        <LaudoAluno
          contato={selectedContato}
          onClose={() => setModalVisible(false)} // Função para fechar o modal
        />
      </Modal>
    </View>
  );
}

//bottons tab

const Tab = createBottomTabNavigator();

export default function Acesso() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          // Lógica para selecionar o ícone com base no nome da aba (route.name)
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "people" : "people-outline"; // Ícone para Dashboard
          } else if (route.name === "Chatbox") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"; // Ícone para Chatbox
          } else if (route.name === "Laudo") {
            iconName = focused ? "document-text" : "document-text-outline"; // Ícone para Laudo
          }

          // Retorna o ícone apropriado da biblioteca Ionicons
          return <Ionicons name={iconName} size={30} color={color} />;
        },
        tabBarActiveTintColor: "#fff", // Cor do texto e ícone ativo
        tabBarInactiveTintColor: "#fff", // Cor do texto e ícone inativo
        tabBarStyle: {
          // Estilos para a barra de abas
          backgroundColor: "#FF3838", // Cor de fundo da barra de abas
          height: 60, // Altura da barra de abas
        },
        tabBarLabelStyle: {
          display: "none", // Oculta os rótulos
        },
        tabBarIconStyle: {
          // Estilos para os ícones
          marginTop: 5, // Margem superior dos ícones
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Chatbox"
        component={Chat}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Laudo"
        component={Laudo}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

//styles

const home = StyleSheet.create({
  header: {
    marginTop: 10,
    width: "100%",
    flex: 1,
    alignItems: "center",
  },
  botaoEditar: {
    color: "blue",
    margin: 10,
  },
  botaoExcluir: {
    color: "red",
    margin: 10,
  },
  linha1: {
    marginTop: 6,
    width: 280,
    height: 2,
    backgroundColor: "#ff3838",
  },
  linha2: {
    width: "100%",
    height: 2,
    backgroundColor: "#ff3838",
  },
  filtroBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 8,
  },
  filtro: {
    borderRadius: 25,
    backgroundColor: "#F3F3F3",
    borderColor: "#9F9F9F",
    borderWidth: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  filtroAtivo: {
    borderRadius: 25,
    backgroundColor: "#F9DCDC",
    borderColor: "#F9DCDC",
    borderWidth: 0.3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textoFiltro: {
    fontSize: 12,
  },
  main: {
    flex: 4,
    width: `100%`,
    alignItems: `center`,
    justifyContent: `center`,
    marginTop: 0,
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#ff3838",
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    right: 10,
    bottom: 10,
  },
});

const config = StyleSheet.create({
  perfil: {
    flex: 2,
    width: "100%",
    backgroundColor: "#FF3838",
    justifyContent: "center",
    alignItems: "center",
  },
  nomeAluno: {
    marginTop: 10,
    fontSize: 20,
    color: "#fff",
  },
  contato: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 0.5, // Largura da borda superior
    borderBottomWidth: 0.5, // Largura da borda inferior
    borderTopColor: "rgba(0, 0, 0, 0.2)", // Cor da borda superior
    borderBottomColor: "rgba(0, 0, 0, 0.2)", // Cor da borda inferior
  },
  titulo: {
    fontSize: 14,
    color: "#727272",
    marginVertical: 20,
  },
  a: {
    flexDirection: "row",
    alignItems: "center",
  },
  desc: {
    fontSize: 13,
  },
  assunto: {
    color: "#727272",
    fontSize: 12,
  },
  config: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});

const dash = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chartContainer: {
    backgroundColor: '#f0f0f0', // Fundo cinza para o quadrado
    borderRadius: 16, // Bordas arredondadas
    padding: 10,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartStyle: {
    borderRadius: 16,
    overflow: 'hidden', // Garante que as bordas arredondadas não sejam sobrescritas
  },
  header: {
    alignItems: "center",
    marginVertical: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  linha1: {
    width: "80%",
    height: 2,
    backgroundColor: "red",
    marginTop: 5,
  },
  dash1: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  caixa1: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "45%",
  },
  caixa2: {
    backgroundColor: "#F0F0F0",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    width: "45%",
  },
  textoCaixa: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tituloCaixa: {
    fontSize: 15,
  },
  numeroCaixa: {
    fontSize: 25,
    fontWeight: "bold",
  },
  chartContainer: {
    backgroundColor: "#F0F0F0",
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

const chat = StyleSheet.create({
  header: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  linha1: {
    marginTop: 6,
    width: 280,
    height: 2,
    backgroundColor: "#ff3838",
  },
  linha2: {
    width: "100%",
    height: 2,
    backgroundColor: "#ff3838",
  },
  pesquisa: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#ECECEC",

    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginVertical: 7,
  },
  input: {
    height: 30,
  },
});

const laudo = StyleSheet.create({
  header: {
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  linha1: {
    marginTop: 6,
    width: 280,
    height: 2,
    backgroundColor: "#ff3838",
  },
  linha2: {
    width: "100%",
    height: 2,
    backgroundColor: "#ff3838",
  },
  pesquisa: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#ECECEC",

    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginVertical: 7,
  },
  input: {
    height: 30,
  },
});
