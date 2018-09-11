import React, { Component } from "react";
import Subheader from "../../components/Subheader"
import { Input, SubmitBtn } from "../../components/SearchForm";
import Saved from "../../components/Saved";
import SaveBtn from "../../components/Saved";
import Header from "../../components/Header";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

class Home extends Component {
  state = {
    saved: [],
    articles: [],
    topic: "",
    startDate: "",
    endDate: ""
  };

  componentDidMount() {
    // this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
    .then(res =>
      this.setState({ articles: res.data, title: "", date: "", url: ""})
      )
    .catch(err => console.log(err));
  }

  saveArticle = title => {
    API.saveArticle({
      title: title
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err))
  };

  deleteArticle = id => {
    API.deleteBook(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startDate && this.state.endDate) {
      var query = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=d580d6be589b4e8499f01d5f0a3ba19d&q=${this.state.topic}&begin_date=${this.state.startDate}0101&end_date=${this.state.endDate}0101`
      console.log(query);
      API.searchArticles(query)
        .then(res => 
        {
          const data = res.data.response.docs;
          var articles = data.map(article => {
            var newObj = {
              headline: article.headline.main,
              date: article.pub_date,
              url: article.web_url
            }
            return newObj;
          })
          this.setState({articles: articles});
          console.log(this.state.articles)

        })
        .catch(err => console.log(err));
    }
  };



  render() {
    return (
      <Container>
        <Row>
          <Header>
          </Header>
        </Row> 
        <Row>
          <Col size="s12">
            <Subheader>
              <h3>Search Your Article</h3>
            </Subheader> 
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                id="topic"
                label="Topic"
                type="text"
              />
              <Input
                value={this.state.startDate}
                onChange={this.handleInputChange}
                name="startDate"
                id="startDate"
                label="Start Year"
                type="text"
              />
              <Input
                value={this.state.endDate}
                onChange={this.handleInputChange}
                name="endDate"
                id="endDate"
                label="End Year"
                type="text"
              />
              <SubmitBtn
                disabled={!(this.state.topic && this.state.startDate && this.state.endDate)}
                onClick={this.handleFormSubmit}
              >
                Search Atricle
              </SubmitBtn>
            </form>
          </Col>
          <Col size="m6 s12">
            <Subheader>
              <h3>Search Result</h3>
            </Subheader>
            {this.state.articles.length ? (
              <div>
              <ul className="collection">
                   {this.state.articles.map(article => (
                  <a href={article.url} className="collection-item">
                  {article.headline}
                  </a>
                ))}
              </ul>
              </div>
                ) : (
                  <h3>No Results to Display</h3>
                )}
          </Col>
        </Row>
      </Container>
      );
  }

}



         
                  



export default Home;
