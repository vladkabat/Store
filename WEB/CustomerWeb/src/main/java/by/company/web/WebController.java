/*
 * @(#)WebController.java
 *
 */



package by.company.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Send page
 *
 */
@Controller
public class WebController {

    @RequestMapping("/*")
    public String getIndexPage(){
        return "index";
    }
}
