package com.udemy.sharebook.user;

import javax.validation.constraints.Size;

public class User {

    @Size(min = 5, max = 25, message = "Le nom du livre doit faire entre 5 et 25 carcatères")
    private String lastName;

    @Size(min = 5, max = 25, message = "Le nom du livre doit faire entre 5 et 25 carcatères")
    private String firstName;


    private String userId;

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserId() {
        return userId;
    }
}
