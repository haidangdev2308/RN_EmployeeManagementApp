import { View, Text, Pressable, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import moment from 'moment'
import axios from 'axios'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const markattendance = () => {

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

    const [employees, setEmployees] = useState([])

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

    const [attendance, setAttendance] = useState([])
    const fetchAttendanceData = async () => {
        try {
            const response = await axios.get("http://172.16.0.144:8000/attendance", {
                params: {
                    date: currentDate.format("MMMM D,YYYY")
                }
            });
            setAttendance(response.data)
        } catch (error) {
            console.log("error fetching attendance data", error);
        }
    }

    useEffect(() => {
        fetchAttendanceData();
    }, [currentDate])

    const employeeWithAttendance = employees.map((employee) => {
        const attendanceRecord = attendance.find((record) => record.employeeId === employee.employeeId)
        return {
            ...employee,
            status: attendanceRecord ? attendanceRecord.status : ""
        }
    })

    console.log(employeeWithAttendance);

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Pressable>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                    <Pressable>
                        <AntDesign name="left" size={22} color="black" onPress={() => router.replace('/(home)')} />
                    </Pressable>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 700,
                        marginLeft: 14,
                    }}>Danh Sách Chấm Công</Text>
                </View>

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

                <View style={{ marginHorizontal: 15 }}>
                    {
                        employeeWithAttendance.map((item, index) => (
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/[user]",
                                        params: {
                                            name: item.employeeName,
                                            id: item.employeeId,
                                            salary: item?.salary,
                                            designation: item?.designation,
                                            dob: item?.dateOfBirth,
                                            joiningDate: item?.joiningDate,
                                            address: item?.address
                                        },
                                    })
                                }
                                key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 }}>
                                <View style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    padding: 10,
                                    backgroundColor: '#3b6cb7',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 600 }}>{item?.employeeName?.toUpperCase().charAt(0)}</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 600
                                    }}>{item?.employeeName}</Text>
                                    <Text style={{
                                        color: 'gray'
                                    }}>{item?.designation} #{item?.employeeId}</Text>

                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </Pressable>
        </View>
    )
}

export default markattendance