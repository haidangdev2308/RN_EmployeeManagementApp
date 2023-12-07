import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { DataTable } from "react-native-paper";
import { useRouter } from 'expo-router';

const summary = () => {

    const [attendanceData, setAttendanceData] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const router = useRouter()

    const goToNextMonth = () => {
        const nextMonth = moment(currentDate).add(1, "months");
        setCurrentDate(nextMonth);
    };

    const goToPrevMonth = () => {
        const prevMonth = moment(currentDate).subtract(1, "months");
        setCurrentDate(prevMonth);
    };

    const formatDate = (date) => {
        return date.format("MMMM, YYYY");
    };
    const fetchAttendanceReport = async () => {
        try {
            const respone = await axios.get(
                `http://172.16.0.144:8000/attendance-report-all-employees`,
                {
                    params: {
                        month: currentDate.month() + 1, //lấy tháng hiện tại, dùng thư viện moment
                        year: 2023,
                    },
                }
            );

            setAttendanceData(respone.data.report);
        } catch (error) {
            console.log("Error fetching attendance");
        }
    };
    useEffect(() => {
        fetchAttendanceReport();
    }, [currentDate]);
    console.log(attendanceData);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16 }}>
                <Pressable>
                    <AntDesign name="left" size={22} color="black" onPress={() => router.replace('/(home)')} />
                </Pressable>
                <Text style={{
                    fontSize: 18,
                    fontWeight: 700,
                    marginLeft: 14,
                }}>Báo Cáo Chấm Công</Text>
            </View>

            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 12,
                marginVertical: 20
            }}>
                <Entypo onPress={goToPrevMonth} name="triangle-left" size={24} color="black" />
                <Text style={{ fontSize: 16, fontWeight: 500 }}>{formatDate(currentDate)}</Text>
                <Entypo onPress={goToNextMonth} name="triangle-right" size={24} color="black" />
            </View>

            <View style={{ padding: 16 }}>
                {
                    attendanceData?.map((item, index) => (
                        <View key={index} style={{ marginBottom: 15 }}>
                            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 15 }}>
                                <View style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 8,
                                    padding: 10,
                                    backgroundColor: '#3b6cb7',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 600 }}>{item?.name?.toUpperCase().charAt(0)}</Text>
                                </View>
                                <View>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: 600
                                    }}>{item?.name}</Text>
                                    <Text style={{
                                        color: 'gray'
                                    }}>{item?.designation} #{item?.employeeId}</Text>
                                </View>
                            </View>

                            <View style={{ backgroundColor: '#a1ffce', marginTop: 10, padding: 5, borderRadius: 8 }}>
                                <DataTable>
                                    <DataTable.Header>
                                        <DataTable.Title>Có Mặt</DataTable.Title>
                                        <DataTable.Title>Vắng Mặt</DataTable.Title>
                                        <DataTable.Title>Nửa Ngày</DataTable.Title>
                                        <DataTable.Title>Kỳ Nghỉ</DataTable.Title>
                                    </DataTable.Header>
                                    <DataTable.Row>
                                        <DataTable.Cell>{item?.present}</DataTable.Cell>
                                        <DataTable.Cell>{item?.absent}</DataTable.Cell>
                                        <DataTable.Cell>{item?.halfday}</DataTable.Cell>
                                        <DataTable.Cell>1</DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>
                            </View>
                        </View>
                    ))
                }
            </View>

        </ScrollView>
    )
}

export default summary