import React, { useState, useEffect } from "react";
import backgroundImage from './problem.jpg';

function Contact() {
    const [problem, setProblem] = useState("");
    const [canSubmit, setCanSubmit] = useState(true);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState(""); // State to hold the submission confirmation message
    const username = sessionStorage.getItem("username");

    useEffect(() => {
        const fetchUserIssues = async () => {
            try {
                const response = await fetch(`http://localhost:5146/api/Contact?username=${username}`);
                if (!response.ok) throw new Error('Failed to fetch issues');
                const issues = await response.json();
                const pendingIssue = issues.find(issue => issue.isSolved === "PENDING");
                const solvedIssue = issues.find(issue => issue.isSolved === "SOLVED");
                setCanSubmit(!pendingIssue);
                setShowConfirmation(!!solvedIssue);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchUserIssues();
    }, [username, showConfirmation]); // Added showConfirmation to dependencies to refresh after confirming issue solved

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;

        const issueData = { username, problem, isSolved: "PENDING" };
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(issueData),
            };
            const response = await fetch('http://localhost:5146/api/Contact', requestOptions);
            if (!response.ok) throw new Error('Failed to submit issue');
            console.log("Issue submitted successfully");
            setProblem("");
            setCanSubmit(false);
            setSubmissionMessage("Your problem has been submitted. We will try to solve it as soon as possible."); // Show submission message
            setTimeout(() => {
                setSubmissionMessage(""); // Hide submission message after 3 seconds
            }, 3000);
        } catch (error) {
            console.error("Error submitting issue:", error);
        }
    };

    const handleConfirmSolved = async () => {
        try {
            const response = await fetch(`http://localhost:5146/api/Contact/${username}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete issue');
            console.log("Issue deleted successfully");
            setShowConfirmation(false);
            setCanSubmit(true);
        } catch (error) {
            console.error("Error deleting issue:", error);
        }
    };

    const styles = {
        contactForm: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Custom background color
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "600px",
            margin: "20px auto", // Center the form
            color: 'white',
        },
        submissionMessage: {
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: "black",
            color: 'white',
            borderRadius: "4px",
        },
        formControl: {
            width: "100%",
            padding: "10px",
            margin: "10px 0", // Add some margin top for spacing
            border: "1px solid #ced4da",
            borderRadius: "4px",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: 'white',
        },
        label: {
            display: "block",
            marginBottom: "5px",
            fontWeight: 'bold',
        },
        btnSuccess: {
            backgroundColor: "#6c5ce7", // Custom color for the confirm solved button
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
        },
        btnPrimary: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Custom color for the submit button
            color: "white",
            fontWeight: 'bold',
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            display: "block", // Make the button a block element to take full width
            width: "100%", // Ensure it stretches to the full width of its parent
        },
    };

    useEffect(() => {
        // Apply background image when component mounts
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundAttachment = "fixed"; // Optional: Makes background image fixed during scroll
        // Set a transparent overlay color if needed
        document.body.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Example: Black background with 50% opacity
        document.body.style.backgroundBlendMode = "overlay"; // Blends the background color with the image

        // Cleanup function to reset background when component unmounts
        return () => {
            document.body.style.backgroundImage = "";
            document.body.style.backgroundColor = "";
            document.body.style.backgroundBlendMode = "";
        };
    }, []);

   

    return (
        <div style={styles.contactForm}>
            {submissionMessage && <div style={styles.submissionMessage}>{submissionMessage}</div>}
            {showConfirmation ? (
                <div>
                    <p>Your issue has been solved, kindly click here to confirm.</p>
                    <button onClick={handleConfirmSolved} style={styles.btnSuccess}>Confirm Solved</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="issueTextArea" style={styles.label}>Describe your issue:</label>
                        <textarea
                            id="issueTextArea"
                            style={styles.formControl}
                            value={problem}
                            onChange={(e) => setProblem(e.target.value)}
                            required
                            disabled={!canSubmit}
                        />
                    </div>
                    <button type="submit" style={styles.btnPrimary} disabled={!canSubmit}>Submit</button>
                </form>
            )}
        </div>
    );
}

export default Contact;