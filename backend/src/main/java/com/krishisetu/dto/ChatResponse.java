package com.krishisetu.dto;

import java.util.List;
import java.util.Map;

public class ChatResponse {
    private String reply;
    private String intent;
    private List<Map<String, Object>> schemes;
    private List<String> followUpChips;
    private boolean grounded;

    public ChatResponse() {}

    public ChatResponse(String reply, String intent, List<Map<String, Object>> schemes, List<String> followUpChips, boolean grounded) {
        this.reply = reply;
        this.intent = intent;
        this.schemes = schemes;
        this.followUpChips = followUpChips;
        this.grounded = grounded;
    }

    public String getReply() { return reply; }
    public void setReply(String reply) { this.reply = reply; }

    public String getIntent() { return intent; }
    public void setIntent(String intent) { this.intent = intent; }

    public List<Map<String, Object>> getSchemes() { return schemes; }
    public void setSchemes(List<Map<String, Object>> schemes) { this.schemes = schemes; }

    public List<String> getFollowUpChips() { return followUpChips; }
    public void setFollowUpChips(List<String> followUpChips) { this.followUpChips = followUpChips; }

    public boolean isGrounded() { return grounded; }
    public void setGrounded(boolean grounded) { this.grounded = grounded; }
}
