import React, { Component } from "react";
import API from "../../utils/API";
import Nav from "../Nav";
import Search from "../Search";
import Footer from "../Footer";
import Articles from "../Articles";

class Home extends Component {
    state = {
        articles: [],
        saved: [],
        topic: "",
        start: "",
        records: "",
        end: ""
    };

    // Upon successful component mounting, calls the loadarticles function
    componentDidMount() {
        this.loadSaved();
    };

    loadSaved = () => {
        API.getArticles()
            .then(res => {
                this.setState({ saved: res.data })
                //console.log(res.data);
            })
            .catch(err => console.log(err))
    }

    // Calls the API route to get articles from NYT.
    loadArticles = () => {
        API.searchArticles(this.buildQuery())
            .then(res =>
                res.data.response.docs ?
                    this.setState({
                        articles: res.data.response.docs,
                        topic: "",
                        start: "",
                        end: ""
                    })
                    :
                    (this.setState({ articles: [], message: "No results to display, try another search" })
                    )
                        .catch(err => console.log(err)));
    };

    // Query NYT API
    buildQuery = () => {
        let query = {
            "URL": "https://api.nytimes.com/svc/search/v2/articlesearch.json?",
            "api": "&api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931",
            "q": "q=" + this.state.topic,
            "start": this.testYear("&begin_date=", this.state.start),
            "end": this.testYear("&end_date=", this.state.end)
        };
        return query;
    };

    testYear = (string, yearInput) => {
        if (typeof Number(yearInput) == 'number' && yearInput.length == 4) {
            return string + yearInput + "0101"
        } else { return "" }
    };

    // Calls the API route to delete articles from Mongo, then updates the page.
    deleteArticle = event => {
        let { id } = event.target;
        API.deleteArticle(id)
            .then(res => this.loadSaved())
            .catch(err => console.log(err));
    };

    // Generic handler for input updating
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Handles the search for NYT Articles
    handleFormSubmit = event => {
        event.preventDefault();
        this.loadArticles();
    };

    saveArticle = event => {
        event.preventDefault();
        let { id } = event.target;
        let selectedArticle = this.state.articles.filter(article => id === article._id)
        // Remove the selected Article from the current Articles state (to remove it from the list)
        for (var i = 0; i < this.state.articles.length - 1; i++) {
            if (this.state.articles[i]._id === id) {
                this.state.articles.splice(i, 1);
            }
        }
        const data = {
            web_url: selectedArticle[0].web_url,
            id: selectedArticle[0]._id,
            headline: selectedArticle[0].headline.main,
            snippet: selectedArticle[0].snippet,
            section_name: (selectedArticle[0].section_name ? selectedArticle[0].section_name : ""),
            pub_date: (selectedArticle[0].pub_date ? selectedArticle[0].pub_date.substring(0, 10) : ""),
            byline: (selectedArticle[0].byline ? selectedArticle[0].byline.original : ""),
            note: this.state.note
        }
        // console.log(data)
        API.saveArticle(data).then(() => {
            this.loadSaved();
        });
    };

    findAuthor = byline => {
        if (byline) {
            if (byline.hasOwnProperty("original")) {
                return byline.original;
            } else {
                return byline;
            }
        } else {
            return null;
        };
    };

    render() {
        return (
            <div className="container">

                {/* Navbar Component */}
                <Nav />

                <Search
                    handleInputChange={this.handleInputChange}
                    handleFormSubmit={this.handleFormSubmit}
                    loadArticles={this.loadArticles}
                    buildQuery={this.buildQuery}
                    testYear={this.testYear}

                    topic={this.state.topic}
                    start={this.state.start}
                    end={this.state.end}
                />

                <Articles
                    header="Search Results"
                    articles={this.state.articles}
                    loadSaved={this.loadSaved}
                    saveArticle={this.saveArticle}
                    title="Main Articles"
                    findAuthor={this.findAuthor}
                    btnText="Save"
                />

                <Articles
                    header="Saved News Stories"
                    articles={this.state.saved}
                    saveArticle={this.deleteArticle}
                    loadSaved={this.loadSaved}
                    findAuthor={this.findAuthor}
                    title="Mongo Stored Articles"
                    btnText="Delete"
                />
                <Footer />
            </div>
        )
    };
};

export default Home;