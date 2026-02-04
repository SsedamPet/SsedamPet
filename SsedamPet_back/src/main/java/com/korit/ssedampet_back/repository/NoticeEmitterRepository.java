package com.korit.ssedampet_back.repository;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.stream.Collectors;

@Component
public class NoticeEmitterRepository {

    private final Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    /*public void add(int userId, SseEmitter emitter) {
        emitters.computeIfAbsent(userId, k -> new CopyOnWriteArrayList<>()).add(emitter);
    }*/

    /*public void remove(int userId, SseEmitter emitter) {
        List<SseEmitter> list = emitters.get(userId);
        if (list == null) return;
        list.remove(emitter);
        if (list.isEmpty()) emitters.remove(userId);
    }*/

    /*public List<SseEmitter> get(int userId) {
        return emitters.getOrDefault(userId, Collections.emptyList());
    }*/

    /*public boolean isEmpty(int userId) {
        return get(userId).isEmpty();
    }*/

    public void save(String emitterId, SseEmitter emitter) {
        emitters.put(emitterId, emitter);
    }



    public void removeEmitter(String emitterId) {
        emitters.remove(emitterId);
    }

    public Map<String, SseEmitter> findEmittersByUserId(int userId) {
        return emitters.entrySet().stream()
                .filter(e -> e.getKey().startsWith(userId + "_"))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue
                ));
    }
}
