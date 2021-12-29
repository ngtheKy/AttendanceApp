import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const Login = () => {
    const [user, setUser] = useState({
        email: '', password: ''
    })

    const onChangeInput = e => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }


    return (
        <View>
            <TextInput
                placeholder='email'
                value={user.email}
                onChange={onChangeInput}
            />
            <TextInput
                placeholder='password'
                value={user.password}
                onChange={onChangeInput}
            />

        </View>
    )
}

export default Login
