package com.leeteam.requestmusicplayer.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MusicItem {
    private String title;
    private String videoId;
    private String thumbnailUrl;

    @Override
    public String toString() {
        return "MusicItem{" +
                "title='" + title + '\'' +
                ", videoId='" + videoId + '}';
    }
}
