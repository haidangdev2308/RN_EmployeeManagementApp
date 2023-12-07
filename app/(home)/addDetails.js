import { View, Text, ScrollView, Pressable, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useNavigation, useRouter } from 'expo-router';
import axios from 'axios';


const addDetails = () => {

    const router = useRouter()

    const [name, setName] = useState("")
    const [employeeId, setEmployeeId] = useState("")
    const [dob, setDob] = useState("")
    const [mobileNo, setMobileNo] = useState("");
    const [joiningDate, setJoiningDate] = useState("")
    const [salary, setSalary] = useState("")
    const [address, setAddress] = useState("")
    const [designation, setDesignation] = useState("")

    const handleRegister = () => {
        const employeeData = {
            employeeName: name,
            employeeId: employeeId,
            designation: designation,
            phoneNumber: mobileNo,
            dateOfBirth: dob,
            joiningDate: joiningDate,
            activeEmployee: true,
            salary: salary,
            address: address,
        };

        axios
            .post("http://172.16.0.144:8000/addEmployee", employeeData)
            .then((response) => {
                Alert.alert(
                    "Thêm Mới Thành Công!",
                    "Bạn đã thêm nhân viên thành công"
                );
                setName("");
                setEmployeeId("");
                setDob("");
                setMobileNo("");
                setSalary("");
                setAddress("");
                setJoiningDate("");
                setDesignation("");
                router.replace('/employees')
            })
            .catch((error) => {
                Alert.alert(
                    "Thêm Mới Thất Bại!",
                    "Đã xảy ra lỗi khi thêm mới"
                );
                console.log("register failed", error);
            });
    };


    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 16,
        }}>
            <View style={{
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <Pressable>
                        <AntDesign name="left" size={22} color="black" onPress={() => router.replace('/employees')} />
                    </Pressable>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 700,
                        marginLeft: 14,
                    }}>Thêm Nhân Viên Mới</Text>
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Họ và tên</Text>
                    <TextInput
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập họ và tên ' />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Mã nhân viên</Text>
                    <TextInput
                        value={employeeId}
                        onChangeText={(text) => setEmployeeId(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập id nhân viên' />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Vị trí</Text>
                    <TextInput
                        value={designation}
                        onChangeText={(text) => setDesignation(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập vị trí công việc' />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Số điện thoại</Text>
                    <TextInput
                        value={mobileNo}
                        onChangeText={(text) => setMobileNo(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập số điện thoại' />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Ngày sinh</Text>
                    <TextInput value={dob}
                        onChangeText={(text) => setDob(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập ngày tháng năm sinh (dd/mm/yyyy)' />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Ngày gia nhập công ty</Text>
                    <TextInput
                        value={joiningDate}
                        onChangeText={(text) => setJoiningDate(text)} style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập ngày gia nhập' />
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginVertical: 4
                }}>
                    <Text>Nhân viên đang hoạt động</Text>
                    <Entypo name="controller-record" size={20} color="#a3dfc3" />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Lương</Text>
                    <TextInput
                        value={salary}
                        onChangeText={(text) => setSalary(text)} style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập số tiền lương' />
                </View>

                <View style={{
                    marginVertical: 5,
                }}>
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 600
                    }}>Địa chỉ</Text>
                    <TextInput
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                        style={{
                            borderWidth: 1,
                            borderColor: '#d0d0d0',
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 5
                        }}
                        placeholder='Nhập địa chỉ' />
                </View>

                <Pressable
                    onPress={handleRegister}
                    style={{
                        backgroundColor: '#abcaba',
                        marginTop: 10,
                        marginBottom: 60,
                        padding: 14,
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: 'white'
                    }}>Thêm</Text>
                </Pressable>
            </View>


        </ScrollView>
    )
}

export default addDetails