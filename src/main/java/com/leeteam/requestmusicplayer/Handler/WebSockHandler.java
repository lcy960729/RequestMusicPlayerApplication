package com.leeteam.requestmusicplayer.Handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.leeteam.requestmusicplayer.Model.MusicItem;
import com.leeteam.requestmusicplayer.Model.NotificationMessage;

import com.leeteam.requestmusicplayer.Model.RequestedMusic;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalDateTime;

@Slf4j
@Component
public class WebSockHandler extends TextWebSocketHandler {

    private WebSocketSession session;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload);

        this.session = session;
    }

    public void addMusic(RequestedMusic requestedMusic) throws IOException {
        NotificationMessage notificationMessage = new NotificationMessage();

        notificationMessage.setRequestedMusic(requestedMusic);
        notificationMessage.setTime(LocalDateTime.now().toString());

        ObjectMapper mapper = new ObjectMapper();
        String sendData = mapper.writeValueAsString(notificationMessage);

        TextMessage textMessage = new TextMessage(sendData);

        if (session != null)
            session.sendMessage(textMessage);
    }
}