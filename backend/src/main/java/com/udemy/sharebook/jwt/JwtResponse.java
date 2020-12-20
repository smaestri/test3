package com.udemy.sharebook.jwt;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
//    private final String jwttoken;

    private final int userId;

    public JwtResponse(/*String jwttoken,*/ int userId) {
//        this.jwttoken = jwttoken;
        this.userId=userId;
    }

//    public String getToken() {
//        return this.jwttoken;
//    }

    public int getUserId() {
        return userId;
    }
}

