package com.wziem.backend.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.wziem.backend.exceptions.ErrorFetchingResponseException;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class OpenAiService {

    @Value("${app.system.prompt}")
    private String systemPrompt;

    @Value("${openai.api-key}")
    private String apiKey;

    @Value("${openai.base-url}")
    private String baseUrl;

    @Value("${openai.max-response-tokens:600}")
    private Integer maxTokens;

    private final ObjectMapper objectMapper;

    public OpenAiService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public String fetchResponse(String userContext) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = createHeaders();
            Map<String, Object> requestBody = createRequestBody(userContext);
            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

            log.debug("Sending request to OpenAI API: {}", baseUrl);
            ResponseEntity<String> response = restTemplate.exchange(
                baseUrl, HttpMethod.POST, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                return parseResponse(response.getBody());
            } else {
                log.error("OpenAI API returned status: {}, body: {}", 
                    response.getStatusCode(), response.getBody());
                throw new ErrorFetchingResponseException(
                    "OpenAI API returned status: " + response.getStatusCode());
            }
        } catch (RestClientException e) {
            log.error("Error calling OpenAI API", e);
            throw new ErrorFetchingResponseException("Network error while calling OpenAI API" + e.getMessage());
        } catch (Exception e) {
            log.error("Unexpected error while processing OpenAI response" + e.getMessage());
            throw new ErrorFetchingResponseException("Error processing OpenAI response" + e.getMessage());
        }
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        return headers;
    }

    private Map<String, Object> createRequestBody(String userContext) {
        Map<String, Object> body = new HashMap<>();
        body.put("model", "gpt-4o-mini");
        body.put("max_tokens", maxTokens);
        body.put("temperature", 0.3);
        
        List<Map<String, String>> messages = new ArrayList<>();
        messages.add(Map.of("role", "system", "content", systemPrompt));
        messages.add(Map.of("role", "user", "content", userContext));
        body.put("messages", messages);
        
        return body;
    }

    private String parseResponse(String responseBody) throws Exception {
        JsonNode jsonNode = objectMapper.readTree(responseBody);
        JsonNode choices = jsonNode.path("choices");
        
        if (choices.isArray() && choices.size() > 0) {
            return choices.get(0).path("message").path("content").asText();
        }
        
        throw new ErrorFetchingResponseException("Invalid response format from OpenAI");
    }
}
