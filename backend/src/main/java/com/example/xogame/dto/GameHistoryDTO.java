package com.example.xogame.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class GameHistoryDTO {
    private Long id;
    private String playerX;
    private String playerO;
    private int boardSize;
    private String movesJson;
    private String winner;
    private LocalDateTime playedAt;
}
