package com.udemy.sharebook.jwt;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
//    private final String jwttoken;

    private final int userId;
    private final String userName;

    public JwtResponse(/*String jwttoken,*/ int userId, String userName){
//        this.jwttoken = jwttoken;
        this.userId=userId;
        this.userName=userName;
    }

//    public String getToken() {
//        return this.jwttoken;
//    }

    public int getUserId() {
        return userId;
    }

    public String getUserName() {
        return userName;
    }
}

