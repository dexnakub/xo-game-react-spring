package com.example.xogame.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "game_history")
public class GameHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String playerX;
    private String playerO;
    private int boardSize;

    @Column(columnDefinition = "TEXT")
    private String movesJson;

    private String winner;

    @Column(name = "played_at", columnDefinition = "TIMESTAMP")
    private LocalDateTime playedAt = LocalDateTime.now();
}
