import { renderTopics, renderTopicDetails } from "./render.js";

const loadData = async (path) => {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error(`Could not load ${path}`);
    }

    return response.json();
};

const initialize = async () => {
    try {
        const [topics, details] = await Promise.all([
            loadData("data/temas.json"),
            loadData("data/detalles.json")
        ]);

        renderTopics(topics);
        renderTopicDetails(topics, details);
    } catch (error) {
        console.error(error);
        document.querySelector(".topics").textContent = "Topics could not be loaded.";
    }
};

initialize();
