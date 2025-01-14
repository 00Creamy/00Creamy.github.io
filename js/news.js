const Game = Object.freeze({
	GENSHIN: {name: "Genshin Impact", type: "game"},
	MISIDE: {name: "MiSide", type: "game"},
	CASTLEVANIA: {name: "Castlevania", type: "game"},
	ONESHOT: {name: "OneShot", type: "game"},
	DEATH_STRANDING: {name: "Death Stranding", type: "game"},
	OTHERS: {name: "Others", type: "game"}
})

const ArticleType = Object.freeze({
	REVIEWS: {name: "Reviews", type: "type"},
	GUIDES: {name: "Guides", type: "type"},
	NEWS: {name: "News", type: "type"},
	OTHERS: {name: "Others", type: "type"}
})

articles = [];
filter_checkboxes = [];

function Article() {
	this.initialize.apply(this, arguments);
}


Article.prototype.initialize = function(title, desc, banner, filter, link) {
	const news_list_div = document.getElementById("news-list");
	
	this.filter = filter;
	this.link = link;

	this.element = document.createElement("div");
	this.element.classList.add("news-item");
	this.element.addEventListener("click", () => {
		window.location.href = this.link;
	}, true);

	let image = document.createElement("img");
	image.src = banner;
	this.element.appendChild(image);

	let text_div = document.createElement("div");
	text_div.classList.add("latest-news-text");
	this.element.appendChild(text_div);

	let title_element = document.createElement("h3");
	title_element.innerHTML = title;
	text_div.appendChild(title_element);

	let desc_element = document.createElement("p");
	desc_element.innerHTML = desc;
	text_div.appendChild(desc_element);

	news_list_div.appendChild(this.element);
	articles.push(this);
}

function createArticle() {
	new Article("OneShot", "The game you shouldn't know about.", "Web Design Assets/Article/OneShot1.png", [Game.ONESHOT, ArticleType.REVIEWS], "article5.html");
	new Article("Castlevania", "How to Find the Best Early-Game Equipment in Symphony of the Night", "Web Design Assets/Article/ArticleSample6.avif", [Game.CASTLEVANIA, ArticleType.GUIDES], "article4.html");
	new Article("MiSide", "How to Find All Mita Cartridges", "Web Design Assets/Article/ArticleSample5.avif", [Game.MISIDE, ArticleType.GUIDES], "article3.html");
	new Article("Death Stranding 2", "Hideo Kojima Offered Death Stranding 2 Update", "Web Design Assets/Article/ArticleSample1.webp", [Game.DEATH_STRANDING, ArticleType.NEWS], "article2.html");
	new Article("Genshin Impact", "How to unlock Pyro Traveler", "Web Design Assets/Article/ArticleSample1.avif", [Game.GENSHIN, ArticleType.GUIDES], "article1.html");
}

function onclick_outer_div() {
	let div = document.getElementById("filter-div");
	if (div.style.display == "none") {
		div.style.display = "block";
	} else {
		div.style.display = "none";
	}
}

function onclick_div(event) {
	event.stopPropagation();
}

function filterInput() {
	let game_filters = []
	let type_filters = []

	for (let input of filter_checkboxes) {
		if (input.checked) {
			if (input.filter.type == "game") {
				game_filters.push(input.filter);
			} else if (input.filter.type == "type") {
				type_filters.push(input.filter);
			}
		}
	}

	if (game_filters.length > 0 || type_filters.length > 0) {
		for (let article of articles) {
			article.element.hidden = true;

			if (game_filters.length > 0) {
				let game_check = false;

				for (let filter of game_filters) {
					if (article.filter.includes(filter)) {
						game_check = true;
					}
				}

				if (!game_check) {
					continue;
				}
			}

			if (type_filters.length > 0) {
				let type_check = false;

				for (let filter of type_filters) {
					if (article.filter.includes(filter)) {
						type_check = true;
					}
				}

				if (!type_check) {
					continue;
				}
			}

			article.element.hidden = false;
		}
	} else {
		for (let article of articles) {
			article.element.hidden = false;
		}
	}
}

function finish_loading() {
	let game_div = document.getElementById("game-check").children[1];
	for (let key of Object.keys(Game)) {
		let div = document.createElement("div");
		div.style.padding = "5px 10px";

		const input = document.createElement("input");
		input.type = "checkbox";
		input.classList.add("form-check-input");
		input.addEventListener("input", () => filterInput(), true);
		input.filter = Game[key];

		const label = document.createElement("label");
		label.classList.add("form-check-label");
		label.innerHTML = Game[key].name;

		div.appendChild(input);
		div.appendChild(label);

		game_div.appendChild(div);
		filter_checkboxes.push(input);
	}


	let article_type_div = document.getElementById("article-type-check").children[1];
	for (let key of Object.keys(ArticleType)) {
		let div = document.createElement("div");
		div.style.padding = "5px 10px";

		const input = document.createElement("input");
		input.type = "checkbox";
		input.classList.add("form-check-input");
		input.addEventListener("input", () => filterInput(), true);
		input.filter = ArticleType[key];

		const label = document.createElement("label");
		label.classList.add("form-check-label");
		label.innerHTML = ArticleType[key].name;

		div.appendChild(input);
		div.appendChild(label);

		article_type_div.appendChild(div);
		filter_checkboxes.push(input);
	}

	createArticle();
}

window.onload = finish_loading;