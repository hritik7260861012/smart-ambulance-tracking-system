package com.hritik.ambulance.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;



@RestController
@CrossOrigin
@RequestMapping("/route")
public class RouteController {

    @GetMapping
    public Map<String, Object> getRoute() {

        Map<String, Object> res = new HashMap<>();

        res.put("start", new double[]{25.2138, 75.8648}); // Kota
        res.put("end", new double[]{26.9124, 75.7873});   // Jaipur

        res.put("ambulanceId", "AMB123");
        res.put("driver", "Ramesh Kumar");

        return res;
    }

    // 🔥 Tracking Link API
    @GetMapping("/track-link")
    public Map<String, String> generateLink() {

        String id = "AMB" + System.currentTimeMillis();

        Map<String, String> map = new HashMap<>();
        map.put("link", "http://localhost:3000/track/" + id);

        return map;
    }
}