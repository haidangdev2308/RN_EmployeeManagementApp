
import { useRouter } from 'expo-router'
import React, { useState } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity, Alert
} from "react-native";
import { isValidEmail, isValidPassword } from '../../components/Validation';


const login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const router = useRouter()

    const loginUser = async () => {
        if (!email || !password) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ thông tin', [
                {
                    text: 'thoát',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
        } else {
            try {
                const response = await axios.post('http://172.16.0.144:8000/login', { email, password });
                console.log(response.data.message);
                const token = response.data.token;
                // Lưu token vào AsyncStorage
                AsyncStorage.setItem('userToken', token);
                router.replace('/(home)')
            } catch (error) {
                Alert.alert(
                    "Đăng Nhập Thất Bại!",
                    "Email hoặc mật khẩu sai"
                );
            }
        }
    }
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require("../../assets/login2.png")} />
            <View style={styles.inputView}>
                <TextInput
                    value={email}
                    style={styles.TextInput}
                    placeholder="Địa chỉ email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => {
                        setErrorEmail(isValidEmail(email) ? '' : 'Vui lòng nhập địa chỉ email hợp lệ.')
                        setEmail(email)
                    }}
                />
            </View>
            {
                errorEmail ?
                    <View className="h-6 mb-1">
                        <Text className="text-red-500 text-[10px]">{errorEmail}</Text>
                    </View> : null
            }
            <View style={styles.inputView}>
                <TextInput
                    value={password}
                    style={styles.TextInput}
                    placeholder="Mật khẩu"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => {
                        setErrorPassword(isValidPassword(password) ? '' : 'Mật khẩu phải tối thiểu 5 ký tự.')
                        setPassword(password)
                    }}
                />
            </View>
            {
                errorPassword ?
                    <View className="h-6 mb-1">
                        <Text className="text-red-500 text-[10px]">{errorPassword}</Text>
                    </View> : null
            }
            <TouchableOpacity>
                <Text onPress={() => router.push('/register')} style={styles.forgot_button}>Chưa có tài khoản? Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={loginUser} style={styles.loginBtn}>
                <Text style={styles.loginText}>Đăng Nhập</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        marginBottom: 40,
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 10
    },
    inputView: {
        backgroundColor: "#aFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 10,
        alignItems: "center",
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    forgot_button: {
        height: 30,
        marginBottom: 30,
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
    loginText: {
        color: '#fff',
    }
});

export default login