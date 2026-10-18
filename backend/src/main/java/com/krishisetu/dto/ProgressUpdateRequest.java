package com.krishisetu.dto;

import com.krishisetu.model.ApplicationProgress;
import jakarta.validation.constraints.NotNull;

public class ProgressUpdateRequest {

    @NotNull(message = "Status is required")
    private ApplicationProgress.Status status;

    private String notes;

    public ProgressUpdateRequest() {}

    public ApplicationProgress.Status getStatus() { return status; }
    public void setStatus(ApplicationProgress.Status status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
