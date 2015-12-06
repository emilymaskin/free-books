(function() {
  var Book = React.createClass({
    getReaders: function() {
      return this.props.readers.slice(0, 3).map(function(r) {
        return <img className="avatar" src={r.avatar} alt={r.name} />;
      });
    },
    getAuthors: function() {
      return this.props.author.map(function(a, i) {
        if (i === 0) {
          return (<span>by <span className="name">{a.name}</span></span>);
        } else {
          return (<span> and <span className="name">{a.name}</span></span>);
        }
      });
    },
    render: function() {
      return (
        <div className="book">
          <img className="cover" src={this.props.image} alt={this.props.title} />
          <button className="free-btn">Free</button>
          <div className="readers">{this.getReaders()}</div>
          <div className="title">{this.props.title}</div>
          <div className="author">{this.getAuthors()}</div>
        </div>
      );
    }
  });

  $(document).ready(function(){
    $.ajax({
      url: 'https://api.glose.com/v1/booklists/free-books'
    }).done(function(resp) {
      var bookList = resp.modules[0][1].books;

      ReactDOM.render(
        <div className='book_wrapper'>
          {bookList.map(function(book, i){
            return <Book key={i}
              title={book.title}
              image={book.largeImage}
              author={book.authors}
              readers={book.readers} />;
          })}
        </div>, document.querySelector('.page_content')
      );
    });
  });
}());
