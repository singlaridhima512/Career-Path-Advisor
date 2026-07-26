
import { useEffect, useState } from "react";
import { getHistory } from "../api/careerApi";
// import "../styles/History.css";

const History = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const data = await getHistory();
                setHistory(data.history);
            } catch (err) {
                setError("Failed to load history. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <p className="history-status">Loading your history...</p>;
    if (error) return <p className="history-status error">{error}</p>;
    if (!history.length) return <p className="history-status">No past suggestions yet — get your first career advice!</p>;

    const [current, ...past] = history;

    return (
        <div className="history-page">
            <h1>Your Career Journey</h1>
            <p className="subtitle">See how your recommendations evolved as your profile grew.</p>

            <div className="comparison-grid">
                <div className="suggestion-column current">
                    <h2>Current — {new Date(current.createdAt).toLocaleDateString()}</h2>
                    {current.suggestions.map((s, i) => (
                        <SuggestionCard key={i} suggestion={s} />
                    ))}
                </div>

                {past.map((set) => (
                    <div className="suggestion-column past" key={set._id}>
                        <h2>{new Date(set.createdAt).toLocaleDateString()}</h2>
                        {set.suggestions.map((s, i) => (
                            <SuggestionCard key={i} suggestion={s} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

const SuggestionCard = ({ suggestion }) => (
    <div className="suggestion-card">
        <h3>{suggestion.path}</h3>
        <p>{suggestion.reasoning}</p>
        <div className="skills-tags">
            {suggestion.suggestedSkillsToLearn.map((skill, i) => (
                <span className="tag" key={i}>{skill}</span>
            ))}
        </div>
    </div>
);

export default History;