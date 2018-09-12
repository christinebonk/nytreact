import React, { Component } from "react";
import Subheader from "../../components/Subheader"
import { Input, SubmitBtn } from "../../components/SearchForm";
import SaveBtn from "../../components/SaveBtn";
import Header from "../../components/Header";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";


class Home extends Component {
  state = {
    saved: [],
    articles: [],
    topic: "",
    startDate: "",
    endDate: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
    .then(res =>
      this.setState({ saved: res.data})
      )
    .catch(err => console.log(err));
  }

  saveArticle = url => {
    let result = this.state.articles.filter(obj => {
      return obj.url === url
   });
    API.saveArticle({
      title: result[0].headline,
      url: result[0].url,
      date: result[0].date
    })
      .then(this.loadArticles())
      .catch(err => console.log(err))
  };

  deleteArticle = id => {
    API.deleteArticle(id)
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
            var date = article.pub_date;
            date = date.substring(0,10);
            var newObj = {
              headline: article.headline.main,
              date: date,
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
                Search Articles
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
                  <li key={article.url} className="collection-item">
                  <a href={article.url} >
                    {article.headline}
                  </a>
                  <p>{article.date}</p>
                  <SaveBtn title="Save" onClick={() => this.saveArticle(article.url)} />
                  </li>
                ))}
              </ul>
              </div>
                ) : (
                  <h3>No Results to Display</h3>
                )}
          </Col>
          <Col size="m6 s12">
            <Subheader>
              <h3>Saved Articles</h3>
            </Subheader>
            {this.state.saved.length ? (
              <div>
              <ul className="collection">
                   {this.state.saved.map(article => (
                  <li key={article.url} className="collection-item">
                  <a href={article.url} >
                    {article.title}
                  </a>
                  <p>{article.date}</p>
                  <SaveBtn title="Delete" onClick={() => this.deleteArticle(article._id)} />
                  </li>
                ))}
              </ul>
              </div>
                ) : (
                  <h3>No Saved Articles</h3>
                )}
          </Col>
        </Row>
      </Container>
      );
  }

}



         
                  



export default Home;
