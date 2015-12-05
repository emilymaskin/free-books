var freeBooks = freeBooks || (function() {
  'use strict';

  var renderBooks = function(bookList) {
    var bookTemplate = _.template(
      '<div class="book">' +
        '<img class="cover" src="<%=image%>" alt="<%=title%>">' +
        '<button class="free-btn">Free</button>' +
        '<div class="readers"><%=readers%></div>' +
        '<div class="title"><%=title%></div>' +
        '<div class="author"><%=author%></div>' +
      '</div>'
    );
    var bookCount = bookList.length;
    var $bookWrapper = $('<div class="book_wrapper"/>');

    for (var i=0; i < bookCount; i++) {
      $bookWrapper.append(bookTemplate(
        {
          title: bookList[i].title,
          image: bookList[i].largeImage,
          author: _renderAuthors(bookList[i].authors),
          readers: _renderReaders(bookList[i].readers.slice(0, 3))
        }
      ));
    }
    $('body').append($bookWrapper);
  };

  var _renderAuthors = function(authorList) {
    var authors = authorList.map(function(a) {
      return 'by <span>' + a.name + '</span>';
    }).join(' and ');

    return authors;
  };

  var _renderReaders = function(readerList) {
    var readerTemplate = _.template(
      '<img class="avatar" src="<%=avatar%>" alt="<%=name%>">'
    );
    var readers = readerList.map(function(r) {
      return readerTemplate(
        {
          name: r.name,
          avatar: r.avatar
        })
    }).join('');

    return readers;
  };

  return {
    renderBooks: renderBooks
  }
}());

$(document).ready(function() {
  var url = 'https://api.glose.com/v1/booklists/free-books';

  $.ajax({
    url: url
  }).done(function(resp) {
    var bookList = resp.modules[0][1].books;
    freeBooks.renderBooks(bookList);
  });
});