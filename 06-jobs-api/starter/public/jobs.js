// Handle click events inside the jobs div
jobsDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addJob) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        setToken(null);
        message.textContent = "You have been logged off.";
        jobsTable.replaceChildren([jobsTableHeader]);
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        // Delete operation
        const jobId = e.target.dataset.id;
        enableInput(false);
  
        try {
          const response = await fetch(`/api/v1/jobs/${jobId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
  
          const data = await response.json();
          if (response.status === 200) {
            message.textContent = data.msg || "The job entry was deleted.";
            showJobs(); // Refresh the jobs list after deletion
          } else {
            message.textContent = data.msg || "Failed to delete the job entry.";
          }
        } catch (err) {
          console.error(err);
          message.textContent = "A communication error occurred.";
        }
  
        enableInput(true);
      }
    }
  });
  