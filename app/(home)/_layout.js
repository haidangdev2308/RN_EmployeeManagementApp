import { Stack } from 'expo-router'

export default function Layout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='register' />
            <Stack.Screen name='index' />
            <Stack.Screen name='employees' />
            <Stack.Screen name='addDetails' />
            <Stack.Screen name='markattendance' />
            <Stack.Screen name='[user]' />
            <Stack.Screen name='summary' />
            <Stack.Screen name='employeeDetails' />
            <Stack.Screen name='login' />
        </Stack>
    )
}