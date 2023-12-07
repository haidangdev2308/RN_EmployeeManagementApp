import { View, Text, TouchableOpacity, Pressable, Alert, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';


const employeeDetails = () => {

    const router = useRouter()
    const params = useLocalSearchParams()

    const [renewActive, setRenewActive] = useState(false)

    const [updatedEmployeeName, setUpdatedEmployeeName] = useState(params.name);
    const [updatedDesignation, setUpdatedDesignation] = useState(params.designation);
    const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(params.phone);
    const [updatedDateOfBirth, setUpdatedDateOfBirth] = useState(params.dob);
    const [updatedJoiningDate, setUpdatedJoiningDate] = useState(params.joiningDate);
    const [updatedSalary, setUpdatedSalary] = useState(params.salary);
    const [updatedAddress, setUpdatedAddress] = useState(params.address);

    const deleteEmployee = () => {

        Alert.alert('Bạn có muốn xoá nhân viên này không?', '', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    try {
                        const response = await axios.delete(`http://172.16.0.144:8000/deleteEmployee/${params.id}`);
                        // Kiểm tra xem yêu cầu đã thành công hay không
                        if (response.status === 200) {
                            console.log("Employee deleted successfully");
                            // Nếu thành công, quay lại màn hình danh sách nhân viên
                            router.replace('/employees')
                        } else {
                            console.log("Failed to delete employee");
                        }
                    } catch (error) {
                        console.error("Error deleting employee", error);
                    }
                }
            },
        ]);
    };

    const updateEmployee = async () => {
        try {
            const response = await axios.put(`http://172.16.0.144:8000/updateEmployee/${params.id}`, {
                employeeName: updatedEmployeeName,
                designation: updatedDesignation,
                phoneNumber: updatedPhoneNumber,
                dateOfBirth: updatedDateOfBirth,
                joiningDate: updatedJoiningDate,
                salary: updatedSalary,
                address: updatedAddress,
            });

            if (response.status === 200) {
                Alert.alert(
                    "Sửa Thành Công!",
                    ""
                );
                console.log("Employee updated successfully");
            } else {
                console.log("Failed to update employee");
            }
        } catch (error) {
            console.error("Error updating employee", error);
        }
    };


    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white', padding: 15 }}>
            <TouchableOpacity onPress={() => router.replace('/employees')}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                <AntDesign name="left" size={22} color="black" />
                <Text style={{
                    fontSize: 14,
                    fontWeight: 500,
                    marginLeft: 14,
                }}>Quay Lại</Text>
            </TouchableOpacity>
            <Pressable style={{ flexDirection: 'row', gap: 10, marginBottom: 15 }}>
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
                {
                    !renewActive &&
                    <TouchableOpacity onPress={() => setRenewActive(true)} style={{ flexDirection: 'row', gap: 5 }}>
                        <FontAwesome name="pencil-square-o" size={24} color="black" />
                        <Text>Sửa thông tin</Text>
                    </TouchableOpacity>
                }
            </Pressable>
            {
                renewActive ? (
                    <View>
                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Họ và tên</Text>
                            <TextInput
                                value={updatedEmployeeName}
                                onChangeText={(text) => setUpdatedEmployeeName(text)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập họ và tên mới' />
                        </View>

                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Vị trí</Text>
                            <TextInput
                                value={updatedDesignation}
                                onChangeText={(text) => setUpdatedDesignation(text)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập vị trí công việc mới' />
                        </View>

                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Số điện thoại</Text>
                            <TextInput
                                value={updatedPhoneNumber}
                                onChangeText={(text) => setUpdatedPhoneNumber(text)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập số điện thoại mới' />
                        </View>

                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Ngày sinh</Text>
                            <TextInput value={updatedDateOfBirth}
                                onChangeText={(text) => setUpdatedDateOfBirth(text)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập lại ngày tháng năm sinh (dd/mm/yyyy)' />
                        </View>

                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Ngày gia nhập công ty</Text>
                            <TextInput
                                value={updatedJoiningDate}
                                onChangeText={(text) => setUpdatedJoiningDate(text)} style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập lại ngày gia nhập' />
                        </View>

                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Lương</Text>
                            <TextInput
                                value={updatedSalary}
                                onChangeText={(text) => setUpdatedSalary(text)} style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập số tiền lương mới' />
                        </View>

                        <View style={{
                            marginVertical: 5,
                        }}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: 600
                            }}>Địa chỉ</Text>
                            <TextInput
                                value={updatedAddress}
                                onChangeText={(text) => setUpdatedAddress(text)}
                                style={{
                                    borderWidth: 1,
                                    borderColor: '#d0d0d0',
                                    marginTop: 10,
                                    padding: 10,
                                    borderRadius: 5
                                }}
                                placeholder='Nhập địa chỉ mới' />
                        </View>
                    </View>
                ) : (
                    <View>
                        <Text style={{ fontSize: 16, marginVertical: 5 }}>Lương cơ bản: {params?.salary} $</Text>
                        <Text style={{ fontSize: 16, marginVertical: 5 }}>Ngày sinh: {params?.dob} </Text>
                        <Text style={{ fontSize: 16, marginVertical: 5 }}>Ngày vào công ty: {params?.joiningDate} </Text>
                        <Text style={{ fontSize: 16, marginVertical: 5 }}>Địa chỉ: {params?.address} </Text>
                    </View>
                )
            }
            {
                renewActive ? (
                    <View >
                        <TouchableOpacity
                            onPress={updateEmployee} style={{
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
                                alignSelf: 'center',
                                marginBottom: 40
                            }}>
                            <Text style={{ alignSelf: 'center', fontWeight: 600, color: 'white' }}>SỬA</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity
                            onPress={deleteEmployee} style={{
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
                                alignSelf: 'center',
                                marginBottom: 40
                            }}>
                            <Text style={{ alignSelf: 'center', fontWeight: 600, color: 'white' }}>XOÁ</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        </ScrollView>
    )
}

export default employeeDetails