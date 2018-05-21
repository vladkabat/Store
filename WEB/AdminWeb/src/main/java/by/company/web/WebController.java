/*
 * @(#)WebController.java 1.8.0_101 2017/09/19
 *
 * Copyright (c) 2017 Kabat Vlad
 */



package by.company.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Send page
 *
 * @version 1.0.0 19 Sep 2017
 * @author Kabat Vlad
 */
@Controller
public class WebController {

    @RequestMapping("/*")
    public String getIndexPage(){
        return "index";
    }
}
