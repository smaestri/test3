import React from 'react'

export default React.createContext(
    {
        userInfo: {/*token: '',*/ userId: ''},
        updateUserInfo: ()=>{}
    })