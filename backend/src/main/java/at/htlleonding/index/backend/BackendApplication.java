package at.htlleonding.index.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@SpringBootApplication
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://frontend:3000"})
public class BackendApplication {
    private final JdbcClient jdbcClient;

    public BackendApplication(JdbcClient jdbcClient) {
        this.jdbcClient = jdbcClient;
    }

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    @PostMapping("/query")
    public ResponseEntity<QueryResponse> query(@RequestBody String sql) {
        try {
            String sqlTrimmed = sql.trim().toUpperCase();
            if (sqlTrimmed.startsWith("SELECT")) {
                List<Map<String, Object>> result = jdbcClient.sql(sql).query().listOfRows();
                return ResponseEntity.ok(new QueryResponse(result, "success"));
            } else {
                int updatedCount = jdbcClient.sql(sql).update();
                return ResponseEntity.ok(
                        new QueryResponse(
                                "Query executed successfully " + updatedCount + " row(s) affected",
                                "success"
                        )
                );
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new QueryResponse("Error executing query: " + e.getMessage(), "error"));
        }
    }

    @GetMapping("/questions")
    public ResponseEntity<QueryResponse> getQuestions() {
        try {
            List<Map<String, Object>> result = jdbcClient.sql("SELECT * FROM questions").query().listOfRows();
            return ResponseEntity.ok(new QueryResponse(result, "success"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new QueryResponse("Error executing query: " + e.getMessage(), "error"));
        }
    }

    @PostMapping("/{id}/resolve")
    public ResponseEntity<?> resolveQuestion(@PathVariable int id) {
        try {
            int updatedCount = jdbcClient.sql("UPDATE questions SET is_resolved = 1 WHERE id = " + id).update();
            return ResponseEntity.ok("Query executed successfully " + updatedCount + " row(s) affected");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error executing query: " + e.getMessage());
        }
    }
}
