import { View, Text, ScrollView, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import employees from '../app/(home)/employees'
import { useRouter } from 'expo-router'

const SearchResult = (props) => {

    const router = useRouter()

    const { data, input, setInput } = props

    return (
        <View style={{ padding: 16, }}>
            {
                <FlatList data={data} renderItem={({ item }) => {
                    if (item?.employeeName.toLowerCase().includes(input.toLowerCase())) {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: "/employeeDetails",
                                        params: {
                                            name: item.employeeName,
                                            id: item.employeeId,
                                            phone: item?.phoneNumber,
                                            salary: item?.salary,
                                            designation: item?.designation,
                                            dob: item?.dateOfBirth,
                                            joiningDate: item?.joiningDate,
                                            address: item?.address
                                        },
                                    })
                                } style={{
                                    flexDirection: 'row',
                                    gap: 10,
                                    marginBottom: 12
                                }}>
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
                        )
                    }
                }} />
            }
        </View>
    )
}

export default SearchResult