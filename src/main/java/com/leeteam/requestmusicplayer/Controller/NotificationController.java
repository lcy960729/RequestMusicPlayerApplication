package com.leeteam.requestmusicplayer.Controller;

import com.leeteam.requestmusicplayer.Model.NotificationMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController {
    @MessageMapping("/notification.addUser")
    @SendTo("/topic/public")
    public NotificationMessage addMusic(@Payload NotificationMessage notificationMessage, SimpMessageHeaderAccessor headerAccessor){
        headerAccessor.getSessionAttributes().put("requestMusic", notificationMessage);
        return notificationMessage;
    }
}
