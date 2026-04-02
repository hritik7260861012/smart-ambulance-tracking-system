package com.hritik.ambulance.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import com.hritik.ambulance.model.Location;

@Controller
public class AmbulanceSocketController {

    @MessageMapping("/location")
    @SendTo("/topic/location")
    public Location sendLocation(Location location) {
        return location;
    }
}
