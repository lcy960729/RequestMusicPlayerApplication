package com.leeteam.requestmusicplayer.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NotificationMessage {
    private RequestedMusic requestedMusic;
    private String Time;
    private String requester;
}
