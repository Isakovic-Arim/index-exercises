package at.htlleonding.index.backend;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class QueryResponse {
    private Object data;
    private String status;

    public QueryResponse(Object data, String status) {
        this.data = data;
        this.status = status;
    }
}