package com.leeteam.requestmusicplayer.Controller;

import com.leeteam.requestmusicplayer.Handler.WebSockHandler;
import com.leeteam.requestmusicplayer.Model.MusicItem;
import com.leeteam.requestmusicplayer.Model.RequestedMusic;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.*;

@RestController
@RequestMapping("/api")
public class RequestMusicPlayerController {
    @Autowired
    private WebSockHandler webSockHandler;

    private ArrayList<RequestedMusic> requestedMusicList = new ArrayList<>();
    private int topIndex = 0;
    private JSONParser jsonParser = new JSONParser();

    @PostMapping(value = "/getMusicList")
    public List<MusicItem> getMusicList(@RequestBody String search) throws IOException, ParseException {
        JSONObject parameter = (JSONObject) jsonParser.parse(search);
        String musicName = URLEncoder.encode((String)parameter.get("search") + " Official","UTF-8");

        String apiUrl = "https://www.googleapis.com/youtube/v3/search";
        apiUrl += "?key=AIzaSyBU-VXcRIhiCjp1bgDrXM_XC07sujhyang";
        apiUrl += "&part=snippet";
        apiUrl += "&q=" + musicName;
        apiUrl += "&fields=items(id,snippet(title,thumbnails(default(url))))";
        apiUrl += "&id.kind=video";

        URL url = new URL(apiUrl);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"UTF-8"));
        String inputLine;
        StringBuffer response = new StringBuffer();
        while((inputLine = br.readLine()) != null) {
            response.append(inputLine);
        }
        br.close();

        ArrayList<MusicItem> musicItemArrayList = new ArrayList<>();

        JSONObject jsonObject = (JSONObject) jsonParser.parse(response.toString());

        JSONArray items = (JSONArray)jsonObject.get("items");

        for (int i = 0; i < items.size(); i++) {
            MusicItem musicItem = new MusicItem();

            JSONObject item = (JSONObject)items.get(i);
            JSONObject id = (JSONObject)item.get("id");
            String videoId = (String)id.get("videoId");

            JSONObject snippet = (JSONObject)item.get("snippet");
            String title = (String)snippet.get("title");
            if (!title.contains("Official"))
                continue;

            JSONObject thumbnails = (JSONObject)snippet.get("thumbnails");
            JSONObject defaultSize = (JSONObject)thumbnails.get("default");
            String thumbnailUrl = (String)defaultSize.get("url");

            musicItem.setVideoId(videoId);
            musicItem.setTitle(title);
            musicItem.setThumbnailUrl(thumbnailUrl);

            musicItemArrayList.add(musicItem);
        }

        return musicItemArrayList;
    }

    @PostMapping(value = "/addMusic")
    public boolean addMusic(@RequestBody String parameter) throws ParseException, IOException {
        JSONObject jsonObject = (JSONObject) jsonParser.parse(parameter);
        JSONObject musicItemJson = (JSONObject)jsonObject.get("music");

        String videoId = (String)musicItemJson.get("videoId");
        String title = (String)musicItemJson.get("title");
        String thumbnailUrl = (String)musicItemJson.get("thumbnailUrl");
        String requester = (String)musicItemJson.get("requester");

        MusicItem musicItem = new MusicItem();
        musicItem.setVideoId(videoId);
        musicItem.setTitle(title);
        musicItem.setThumbnailUrl(thumbnailUrl);

        RequestedMusic requestedMusic = new RequestedMusic();
        requestedMusic.setOrder(topIndex++);
        requestedMusic.setMusicItem(musicItem);

        requestedMusicList.add(requestedMusic);

        for (int i = 0; i < requestedMusicList.size(); i++) {
            System.out.println(requestedMusicList.get(i));
        }

        webSockHandler.addMusic(requestedMusic);
        return true;
    }

    @GetMapping(value = "/getRequestedMusicList")
    public List<RequestedMusic> getRequestedMusicList(){
        return requestedMusicList;
    }

    @GetMapping(value = "/updateMusic")
    public String updateMusic(){

        return "hello";
    }

    @PostMapping(value = "/deleteMusic")
    public boolean deleteMusic(@RequestBody String parameter) throws ParseException {
        JSONObject jsonObject = (JSONObject) jsonParser.parse(parameter);
        Long order = (Long)jsonObject.get("order");

        for (RequestedMusic requestedMusic : requestedMusicList) {
            if ((long)requestedMusic.getOrder() == order.longValue()) {
                requestedMusicList.remove(requestedMusic);
                break;
            }
        }

        return true;
    }
}
