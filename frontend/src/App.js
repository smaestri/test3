import * as React from "react"
import axios from 'axios'
import ListBooks from './components/list-books/ListBooks'
import Login from './components/login/Login'
import AddBook from './components/add-book/AddBook'
import MyBooks from './components/my-books/MyBooks'
import MyBorrows from './components/my-borrows/MyBorrows'
import Header from './components/header/Header'
import AddUser from './components/add-user/AddUser'
import Home from './components/home/Home'
import UserContext from './context/UserContext'
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    useHistory
} from 'react-router-dom'

export default function App() {

    function PrivateRoute({ children, ...rest }) {
        return (
            <Route {...rest} render={({ location }) => {
                console.log('toto')
                return userInfo
                    ? children
                    : <Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />
            }} />
        )
    }

    function AuthButton({ isConnected, signout }) {
        const history = useHistory()

        return isConnected === true
            ? <p>
                Welcome! <button onClick={signout}>Sign out</button>
            </p>
            : <p>You are not logged in.</p>
    }
    const [userInfo, setUserInfo] = React.useState('');

    const authenticate = (email, password) => {
        axios.post('/authenticate', {
            email: email,
            password: password
        }).then(response => {
            console.log(response)
            if (response && response.data && response.data.token) {
                setUserInfo(response.data)
            }
        })
    }
    const signout = () => {
        axios.post('/logout').then(response => {
            setUserInfo(null)
        })
    }

    const updateUserInfo = ({token, userId}) => {
        console.log('update user')
        console.log(token + " " + userId)
        setUserInfo({token, userId})
    }


    console.log('values t transmit to children : ' + JSON.stringify(userInfo))

    const isConnected = (userInfo && userInfo.token && userInfo.userId?true:false);

    console.log("is onected" + isConnected)

    return <Router>
        {isConnected && <Header />}
        <div>
            <UserContext.Provider value={{userInfo, updateUserInfo}} >
                <AuthButton isConnected={isConnected} signout={signout} />

                <PrivateRoute path="/listBooks">
                    <ListBooks />
                </PrivateRoute>
                <PrivateRoute path="/addBook">
                    <AddBook />
                </PrivateRoute>
                <PrivateRoute path="/myBooks">
                    <MyBooks />
                </PrivateRoute>
                <PrivateRoute path="/myBorrows">
                    <MyBorrows />
                </PrivateRoute>
                <Route path="/addUser">
                    <AddUser />
                </Route>
                <Route path="/login">
                    <Login authenticate={authenticate} isConnected={isConnected} />
                </Route>
            
                <Home isConnected={isConnected} />
            </UserContext.Provider>
        </div>
    </Router>
}
