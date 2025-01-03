package com.example.Clique.controller;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Clique.Entities.Comments;
import com.example.Clique.dto.CommentDTO;
import com.example.Clique.service.CommentService;
import com.example.Clique.service.UserService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;
    private final UserService userService;

    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    private Long getUserId(Authentication auth) {
        String username = auth.getName();
        return userService.getUserByUsername(username).getUserId();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addComment(
            Authentication auth,
            @RequestBody Long postId,
            @RequestBody String content) {

        Long userId = getUserId(auth);
        String message = commentService.createComment(userId, postId, content);
        return ResponseEntity.ok(message);

    }

    @GetMapping("/feed")
    public ResponseEntity<Set<CommentDTO>> getComments(Authentication auth, @RequestBody Long postId) {
        Long userId = getUserId(auth);
        return ResponseEntity.ok(commentService.getComments(userId, postId));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteComment(Authentication auth, @RequestBody Long commentId) {
        Long userId = getUserId(auth);
        return ResponseEntity.ok(commentService.deleteComment(userId, commentId));
    }
}
