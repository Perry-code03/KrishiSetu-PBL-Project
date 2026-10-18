package com.krishisetu.dto;

import java.util.List;
import java.util.Map;

public class EligibilitySubmitRequest {
    private Map<String, Object> answers;
    private List<String> matchedSchemeIds;

    public EligibilitySubmitRequest() {}

    public Map<String, Object> getAnswers() { return answers; }
    public void setAnswers(Map<String, Object> answers) { this.answers = answers; }

    public List<String> getMatchedSchemeIds() { return matchedSchemeIds; }
    public void setMatchedSchemeIds(List<String> matchedSchemeIds) { this.matchedSchemeIds = matchedSchemeIds; }
}
