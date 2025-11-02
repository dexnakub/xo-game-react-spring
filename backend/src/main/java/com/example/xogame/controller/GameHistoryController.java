package com.example.xogame.controller;

import com.example.xogame.model.GameHistory;
import com.example.xogame.dto.GameHistoryDTO;
import com.example.xogame.repository.GameHistoryRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/game-history")
@CrossOrigin(origins = "http://localhost:5173")
public class GameHistoryController {

    private final GameHistoryRepository repository;

    public GameHistoryController(GameHistoryRepository repository) {
        this.repository = repository;
    }

    // POST: Save game
    @PostMapping
    public GameHistoryDTO saveGame(@RequestBody GameHistoryDTO dto) {
        GameHistory game = new GameHistory();
        game.setPlayerX(dto.getPlayerX());
        game.setPlayerO(dto.getPlayerO());
        game.setBoardSize(dto.getBoardSize());
        game.setMovesJson(dto.getMovesJson());
        game.setWinner(dto.getWinner());
        game = repository.save(game);

        dto.setId(game.getId());
        dto.setPlayedAt(game.getPlayedAt());
        return dto;
    }

    // GET: All games
    @GetMapping
    public List<GameHistoryDTO> getAllGames() {
        return repository.findAll().stream().map(game -> {
            GameHistoryDTO dto = new GameHistoryDTO();
            dto.setId(game.getId());
            dto.setPlayerX(game.getPlayerX());
            dto.setPlayerO(game.getPlayerO());
            dto.setBoardSize(game.getBoardSize());
            dto.setMovesJson(game.getMovesJson());
            dto.setWinner(game.getWinner());
            dto.setPlayedAt(game.getPlayedAt());
            return dto;
        }).collect(Collectors.toList());
    }

    // GET: Single game by id
    @GetMapping("/{id}")
    public GameHistoryDTO getGame(@PathVariable Long id) {
        GameHistory game = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));
        GameHistoryDTO dto = new GameHistoryDTO();
        dto.setId(game.getId());
        dto.setPlayerX(game.getPlayerX());
        dto.setPlayerO(game.getPlayerO());
        dto.setBoardSize(game.getBoardSize());
        dto.setMovesJson(game.getMovesJson());
        dto.setWinner(game.getWinner());
        dto.setPlayedAt(game.getPlayedAt());
        return dto;
    }
}
