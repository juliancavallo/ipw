const createElement = (tagName, text) => {
    const element = document.createElement(tagName);
    element.textContent = text;
    return element;
};

export const renderTopics = (topics) => {
    const container = document.querySelector(".topics");

    topics.forEach((topic) => {
        const link = document.createElement("a");
        link.className = "topic";
        link.href = `#${topic.id}`;
        link.append(createElement("h3", topic.titulo), createElement("p", topic.descripcion));
        container.append(link);
    });
};

export const renderTopicDetails = (topics, details) => {
    const container = document.querySelector("#topic-details");

    topics.forEach((topic) => {
        const article = document.createElement("article");
        article.id = topic.id;
        article.className = "topic-detail";
        article.append(createElement("h2", topic.titulo), createElement("p", topic.descripcionDetalle));

        const grid = document.createElement("div");
        grid.className = "topic-detail-grid";

        details.filter((detail) => detail.temaId === topic.id).forEach((detail) => {
            const item = document.createElement("div");
            item.className = "topic-detail-item";

            const image = document.createElement("img");
            image.src = detail.imagen;
            image.alt = detail.alt;

            item.append(createElement("h3", detail.titulo), createElement("p", detail.descripcion), image);
            grid.append(item);
        });

        article.append(grid);
        container.append(article);
    });
};
