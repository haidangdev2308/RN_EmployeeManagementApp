import { View, Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { FontAwesome5, Ionicons, MaterialIcons, Octicons, AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

const index = () => {

    const router = useRouter()

    const handleLogout = async () => {
        try {
            // Xóa token từ AsyncStorage
            await AsyncStorage.removeItem('userToken');
            router.replace('/login')
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View>
            <LinearGradient colors={['#7f7fd5', '#e5e4f0']} classname='flex-1'>
                <View style={{ padding: 16 }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <FontAwesome5 name="chart-pie" size={24} color="white" />
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: 'white'
                        }} >Hệ Thống Quản Lý Nhân Viên</Text>
                        <Pressable>
                            <Entypo onPress={handleLogout} name="log-out" size={24} color="white" />
                        </Pressable>
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 25, gap: 20 }}>
                        <Pressable
                            onPress={() => router.push('/(home)/employees')} // điều hướng đến trang employees
                            style={{
                                backgroundColor: '#d3cce3',
                                padding: 12,
                                borderRadius: 6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 5,
                            }}>
                            <View style={{
                                backgroundColor: 'white',
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Ionicons name="people-sharp" size={24} color="black" />
                            </View>
                            <Text style={{ fontWeight: 600, marginTop: 6 }}>Danh sách nhân viên</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.push('/(home)/markattendance')}
                            style={{
                                backgroundColor: '#d3cce3',
                                padding: 12,
                                borderRadius: 6,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flex: 1,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 5,
                            }}>
                            <View style={{
                                backgroundColor: 'white',
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Ionicons name="people-sharp" size={24} color="black" />
                            </View>
                            <Text style={{ fontWeight: 600, marginTop: 6 }}>Danh sách chấm công</Text>
                        </Pressable>
                    </View>

                    <View style={{
                        marginTop: 16,
                        padding: 12,
                        backgroundColor: 'white',
                        borderRadius: 7,
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        elevation: 5,
                    }}>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#c3cce3',
                            borderRadius: 7,
                            marginVertical: 7
                        }}
                            onPress={() => router.push('/(home)/summary')}
                        >
                            <View style={{
                                padding: 7,
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <Ionicons name="md-newspaper-outline" size={24} color="black" />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16, flex: 1 }}>Báo cáo chấm công</Text>
                            <View style={{
                                padding: 7,
                                width: 35,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </View>
                        </Pressable>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#c3cce3',
                            borderRadius: 7,
                            marginVertical: 7
                        }}>
                            <View style={{
                                padding: 7,
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <Octicons name="repo-pull" size={24} color="black" />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16, flex: 1 }}>Báo cáo tóm tắt</Text>
                            <View style={{
                                padding: 7,
                                width: 35,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </View>
                        </Pressable>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#c3cce3',
                            borderRadius: 7,
                            marginVertical: 7
                        }}>
                            <View style={{
                                padding: 7,
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <Octicons name="report" size={23} color="black" />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16, flex: 1 }}>Chú ý báo cáo</Text>
                            <View style={{
                                padding: 7,
                                width: 35,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </View>
                        </Pressable>
                        <Pressable style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 10,
                            backgroundColor: '#c3cce3',
                            borderRadius: 7,
                            marginVertical: 7
                        }}>
                            <View style={{
                                padding: 7,
                                width: 45,
                                height: 45,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <MaterialIcons name="more-time" size={24} color="black" />
                            </View>
                            <Text style={{ fontSize: 16, fontWeight: '600', marginLeft: 16, flex: 1 }}>Nhân viên Overtime</Text>
                            <View style={{
                                padding: 7,
                                width: 35,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'white',
                                borderRadius: 7
                            }}>
                                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
                            </View>
                        </Pressable>
                    </View>
                    <View style={{
                        marginTop: 25
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 25,
                            gap: 25,
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 175,
                                padding: 17,
                                backgroundColor: '#c3dfc3',
                                borderRadius: 7,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 5,
                            }}>
                                <View style={{
                                    padding: 7,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 7
                                }}>
                                    <MaterialIcons name="face" size={24} color="black" />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 7 }}>Tiêu chuẩn tham dự</Text>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 175,
                                padding: 17,
                                backgroundColor: '#d2aac3',
                                borderRadius: 7,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 5,
                            }}>
                                <View style={{
                                    padding: 7,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 7
                                }}>
                                    <Ionicons name="stats-chart-sharp" size={24} color="black" />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 7 }}>Tiến độ công việc</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginBottom: 25,
                            gap: 25,
                            justifyContent: 'space-between'
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 175,
                                padding: 17,
                                backgroundColor: '#c1eec3',
                                borderRadius: 7,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 5,
                            }}>
                                <View style={{
                                    padding: 7,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 7
                                }}>
                                    <MaterialIcons name="attach-money" size={24} color="black" />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 7 }}>Chi chí tiết kiệm</Text>
                            </View>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: 175,
                                padding: 17,
                                backgroundColor: '#d2aaf3',
                                borderRadius: 7,
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 0,
                                    height: 2,
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 3,
                                elevation: 5,
                            }}>
                                <View style={{
                                    padding: 7,
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: 'white',
                                    borderRadius: 7
                                }}>
                                    <AntDesign name="linechart" size={24} color="black" />
                                </View>
                                <Text style={{ fontSize: 14, fontWeight: '600', marginTop: 7 }}>Hiệu suất nhân viên</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

export default index