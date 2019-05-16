const categories = ['World', 'Fashion', 'Tech', 'Sport'];

// ===============render this class to run all of it==================

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Feed />
      </div>
    );
  }
}

// ===============code for post already made and the process for filtering them==================

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {category: categories[0], content: ' - Heal the world, make it a better place, for you and for me and the entire human race!'},
        {category: categories[1], content: ' - Ive always liked yellow tops with strips'}
      ],
      filteredPosts: []
    }

    this.handleNewPost = this.handleNewPost.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }

  handleNewPost(post) {
    this.setState({
      posts: this.state.posts.concat([post])
    });
  }

  handleFilter(filter) {
    this.setState({
      filteredPosts: this.state.posts.filter((post) =>
        post.category.toUpperCase() === filter.toUpperCase() ||
          post.content.includes(filter)
      )
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) =>
      <Post key={index} value={post} />
    );
    const filteredPosts = this.state.filteredPosts.map((post, index) =>
      <Post key={index} value={post} />
    );
    return (
      <div className="feed">
        <Filter onFilter={this.handleFilter} />
        {filteredPosts.length > 0 ? filteredPosts : posts}
        <PostForm onSubmit={this.handleNewPost} />
      </div>
    )
  }
}

class Post extends React.Component {
  render() {
    return (
      <div className="post">
        <span className="label">{this.props.value.category}</span>
        <span className="content">{this.props.value.content}</span>
      </div>
    )
  }
}

// ===============code for making post (the input and having it display)==================

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.onSubmit({
      category: this.category.value,
      content: this.content.value
    });
    this.category.value = categories[0];
    this.content.value = ' - ';
    event.preventDefault();
  }

  render() {
    return (
      <div className="post-form">
        <form onSubmit={this.handleSubmit}>
          <label>
            Category:
            <select ref={(input) => this.category = input}>
              {categories.map((category, index) =>
                <option key={category} value={category}>{category}</option>
              )}
            </select>
          </label>
          <label>
            <input type="text" ref={(input) => this.content = input} />
          </label>
          <button className="button">Submit</button>
        </form>
      </div>
    )
  }
}

// ===============code for filtering==================

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.onFilter(this.state.value);
    }
  }

  render() {
    return (
      <div>
        <label>
          <input type="search" value={this.state.value}
                               onChange={this.handleChange}
                               onKeyUp={this.handleKeyUp}
                               placeholder="Filter by category or content..." />
        </label>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('profile-tweets'));