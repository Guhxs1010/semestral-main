import { createStackNavigator } from '@react-navigation/stack';
import login from './pages/login';
import index from './pages/aluno';
import senha from './pages/senha';
import nutri from './pages/nutri';
import pais from './pages/pais';
import funcionarios from './pages/funcionarios'


const Stack = createStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="login"
                component={login}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="index"
                component={index}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="senha"
                component={senha}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="nutricionista"
                component={nutri}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="pais"
                component={pais}
            options={{ headerShown: false }} 
            />
            <Stack.Screen
                name="funcionarios"
                component={funcionarios}
            options={{ headerShown: false }} 
            />



        </Stack.Navigator>
    )
} 