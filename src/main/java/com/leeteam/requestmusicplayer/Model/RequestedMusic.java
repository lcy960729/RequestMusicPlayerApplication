package com.leeteam.requestmusicplayer.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestedMusic {
    private int order;
    private MusicItem musicItem;

    @Override
    public String toString() {
        return "{" +
                "order=" + order +
                ", MusicItem='" + musicItem + '\'' +
                '}';
    }
}
