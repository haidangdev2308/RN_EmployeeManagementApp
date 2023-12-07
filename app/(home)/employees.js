import { View, Text, ScrollView, Pressable, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import SearchResult from '../../components/SearchResult';

const employees = () => {


    const [employees, setEmployees] = useState([])
    const [input, setInput] = useState("")

    useEffect(() => {
        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get("http://172.16.0.144:8000/employees");
                setEmployees(response.data);
            } catch (error) {
                console.log("error fetching employee data", error);
            }
        };
        fetchEmployeeData();
    }, []);

    console.log(employees);

    const router = useRouter()

    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white'
        }}>
            <View style={{
                flexDirection: 'row',
                padding: 16,
                alignItems: 'center',
            }}>
                <Pressable>
                    <AntDesign name="left" size={22} color="black" onPress={() => router.replace('/(home)')} />
                </Pressable>
                <Pressable style={{
                    marginHorizontal: 14,
                    gap: 16,
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    alignItems: 'center',
                    borderRadius: 4
                }}>
                    <AntDesign name="search1" size={24} color="black" />
                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        style={{
                            flex: 1,
                        }} placeholder='Tìm kiếm' />
                    {
                        employees.length > 0 &&
                        <View>
                            <Pressable
                                style={{
                                    marginRight: 10
                                }}
                                onPress={() => router.push('/(home)/addDetails')}>
                                <AntDesign name="pluscircleo" size={24} color="#0072b1" />
                            </Pressable>
                        </View>
                    }

                </Pressable>
            </View>
            {
                employees.length > 0 ? (
                    <SearchResult data={employees} input={input} setInput={setInput} />
                )
                    : (
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                            <Text>Không Có Dữ Liệu</Text>
                            <Text>Nhấn Vào Biểu Tượng <AntDesign name="pluscircleo" size={14} color="#0072b1" /> Để Thêm Nhân Viên</Text>
                            <Pressable
                                style={{
                                    marginTop: 20
                                }}
                                onPress={() => router.push('/(home)/addDetails')}>
                                <AntDesign name="pluscircleo" size={54} color="#0072b1" />
                            </Pressable>
                        </View>
                    )
            }
        </View>
    )
}

export default employees