import { View, Text, Pressable, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';


const user = () => {

    const params = useLocalSearchParams()
    const [attendanceStatus, setAttendanceStatus] = useState("present")
    const [currentDate, setCurrentDate] = useState(moment())
    const router = useRouter()

    const goToNextDate = () => {
        const nextDate = moment(currentDate).add(1, "days");
        setCurrentDate(nextDate)
    }

    const goToPrevDate = () => {
        const prevDate = moment(currentDate).subtract(1, "days");
        setCurrentDate(prevDate)
    }

    const formatDate = (date) => {
        return date.format("DD/MM/YYYY");
    }

    const submitAttendance = async () => {
        try {
            const attendanceData = {
                employeeId: params?.id,
                employeeName: params?.name,
                date: currentDate.format("MMMM D, YYYY"),
                status: attendanceStatus,
            };
            const response = await axios.post(
                "http://172.16.0.144:8000/attendance",
                attendanceData
            );

            if (response.status === 200) {
                Alert.alert(`Xác Nhận Thành Công Cho ${params?.name}`);
            }
        } catch (error) {
            Alert.alert(
                "Xác Nhận Thất Bại!",
                "Đã xảy ra lỗi khi xác nhận"
            );
            console.log('error submitting mark attendance');
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
            <TouchableOpacity onPress={() => router.replace('/markattendance')}
                style={{ flexDirection: 'row', alignItems: 'center', padding: 12 }}>
                <AntDesign name="left" size={22} color="black" />
                <Text style={{
                    fontSize: 14,
                    fontWeight: 500,
                    marginLeft: 14,
                }}>Quay Lại</Text>
            </TouchableOpacity>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 12,
                marginVertical: 20
            }}>
                <Entypo onPress={goToPrevDate} name="triangle-left" size={24} color="black" />
                <Text style={{ fontSize: 16, fontWeight: 500 }}>{formatDate(currentDate)}</Text>
                <Entypo onPress={goToNextDate} name="triangle-right" size={24} color="black" />
            </View>
            <Pressable style={{ flexDirection: 'row', gap: 10 }}>
                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    padding: 10,
                    backgroundColor: '#3b6cb7',
                    alignItems: 'center',
                    justifyContent: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3,
                    elevation: 5,
                }}>
                    <Text style={{ color: 'white', fontWeight: 600 }}>
                        {params?.name.toUpperCase().charAt(0)}</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 600
                    }}>{params?.name}</Text>
                    <Text style={{
                        color: 'gray'
                    }}>{params?.designation} #{params?.id}</Text>
                </View>
            </Pressable>
            <Text style={{ fontSize: 16, marginVertical: 2 }}>Lương cơ bản: {params?.salary} $</Text>
            <Text style={{ fontSize: 16, marginVertical: 2 }}>Ngày sinh: {params?.dob} </Text>
            <Text style={{ fontSize: 16, marginVertical: 2 }}>Ngày vào công ty: {params?.joiningDate} </Text>
            <Text style={{ fontSize: 16, marginVertical: 2 }}>Địa chỉ: {params?.address} </Text>
            <View>
                <Text style={{ letterSpacing: 3, fontSize: 16, marginBottom: 10, marginLeft: 'auto', marginRight: 'auto' }}>CHẤM CÔNG</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                    <TouchableOpacity
                        onPress={() => setAttendanceStatus("present")}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3,
                            elevation: 5,
                            flex: 1,
                            marginHorizontal: 10,
                            backgroundColor: '#c4e0e5',
                            padding: 12,
                            borderRadius: 8,
                            flexDirection: 'row',
                            gap: 12,
                            alignItems: 'center'
                        }}>
                        {
                            attendanceStatus === 'present' ? (
                                <FontAwesome name="dot-circle-o" size={24} color="black" />
                            ) : (
                                <FontAwesome name="circle-o" size={24} color="black" />
                            )
                        }
                        <Text style={{ fontWeight: 600 }}>Có Mặt</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setAttendanceStatus("absent")}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3,
                            elevation: 5,
                            flex: 1,
                            marginHorizontal: 10,
                            backgroundColor: '#c4e0e5',
                            padding: 12,
                            borderRadius: 8,
                            flexDirection: 'row',
                            gap: 12,
                            alignItems: 'center'
                        }}>
                        {
                            attendanceStatus === 'absent' ? (
                                <FontAwesome name="dot-circle-o" size={24} color="black" />
                            ) : (
                                <FontAwesome name="circle-o" size={24} color="black" />
                            )
                        }
                        <Text style={{ fontWeight: 600 }}>Vắng Mặt</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => setAttendanceStatus("halfday")}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3,
                            elevation: 5,
                            flex: 1,
                            marginHorizontal: 10,
                            backgroundColor: '#c4e0e5',
                            padding: 12,
                            borderRadius: 8,
                            flexDirection: 'row',
                            gap: 12,
                            alignItems: 'center'
                        }}>
                        {
                            attendanceStatus === 'halfday' ? (
                                <FontAwesome name="dot-circle-o" size={24} color="black" />
                            ) : (
                                <FontAwesome name="circle-o" size={24} color="black" />
                            )
                        }
                        <Text style={{ fontWeight: 600 }}>Nửa Ngày</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setAttendanceStatus("holiday")}
                        style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 3,
                            elevation: 5,
                            flex: 1,
                            marginHorizontal: 10,
                            backgroundColor: '#c4e0e5',
                            padding: 12,
                            borderRadius: 8,
                            flexDirection: 'row',
                            gap: 12,
                            alignItems: 'center'
                        }}>
                        {
                            attendanceStatus === 'holiday' ? (
                                <FontAwesome name="dot-circle-o" size={24} color="black" />
                            ) : (
                                <FontAwesome name="circle-o" size={24} color="black" />
                            )
                        }
                        <Text style={{ fontWeight: 600 }}>Kì Nghỉ</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={submitAttendance} style={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                        elevation: 5,
                        backgroundColor: '#a1a5e5',
                        width: 150,
                        padding: 15,
                        borderRadius: 8,
                        marginTop: 20,
                        alignSelf: 'center'
                    }}>
                    <Text style={{ alignSelf: 'center', fontWeight: 600, color: 'white' }}>XÁC NHẬN</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default user