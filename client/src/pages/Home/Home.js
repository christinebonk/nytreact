import SearchForm from "../../components/SearchForm";
import Results from "../../components/Results";
import Saved from "../../components/Saved";
import Header from "../../components/Header";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

class Home extends Component {
  state = {
    articles: [],
    title: "",
    date: "",
    url: ""
  };

  componentDidMount() {
  }

  render() {
    return (
      <Container> 
        <Row>
          <Col size="s12">
            <Header>
            </Header>
          </Col>
        </Row>
        <Row>
          <Col size="s12">
            <Subheader>
              <h2>Search</h2>
            </Subheader>
            <SearchForm>
            </SearchForm>
          </Col>
        </Row>
        <Row>
          <Subheader>
              <h2>Results</h2>
          </Subheader>
          {this.state.articles.length ? (
            <List>
            {this.state.articles.map(article => (
              <ListItem key={article._id}>
                {article.title} on {article.date}
              <SaveBtn onClick={() => this.saveArticle(article._id)} />
                </ListItem>
              ))}
              </List>
            ) : (<h3>No Articles to Dislplay
            )}
        </Row>
        <Row>
          <Saved />
        </Row>
      </Container>
      )
  }

export default Home;
