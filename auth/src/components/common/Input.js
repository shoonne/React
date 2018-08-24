import React from 'react';
import {Text, View, TextInput} from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry  }) => {
    //Passing the props to our Input component
    const { inputStyle, labelStyle, containerStyle} = styles;
    return(
        <View style = {containerStyle} > 
            <Text style = {labelStyle}>{label}</Text>
            <TextInput 
            secureTextEntry= {secureTextEntry}
            placeholder= {placeholder}
            style={inputStyle}
            value= {value}
            onChangeText= {onChangeText}
            autoCorrect={false}
            />
        </View>
    );

};

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft : 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2, // 2/3

    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1 // 1/3
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },


};

export { Input };