package com.udemy.sharebook.book;

import javax.validation.constraints.Size;

public class Book {

    @Size(min = 5, max = 25, message = "Le nom du livre doit faire entre 5 et 25 carcatères")
    private String name;

    @Size(min = 5, max = 25, message = "La catégorie du livre doit faire entre 5 et 25 carcatères")
    private String category;

    public Book() {
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Book(String bookname) {
        this.name = bookname;
    }





}
