const bookController = (Book) => {
	const getBooks = async (req, res) => {
	  const { query } = req;
  	  const response = await Book.find(query);
	  res.json(response);
	};
  
	const postBook = async (req, res) => {
	  const book = new Book(req.body);
  	  await book.save();
	  res.json(book);
	};
  
	const getBooksById = async (req, res) => {
	  try {
		const { params } = req;
		const response = await Book.findById(params.bookId);
  		res.json(response);
	  } catch (err) {
		res.status(500).json('Error');
	  }
	};
  
	const putBookById = async (req, res) => {
	  try {
		const { body } = req;
		const response = await Book.updateOne({
			_id: req.params.bookId
		  },
		  {
			$set: {
			  title: body.title,
			  author: body.author,
			  genre: body.genre,
			  read: body.read
			}
		  })
		res.json(response);
	  } catch (err) {
		res.status(500).json('Error');
	  }
	};
  
	const deleteBooksById = async (req, res) => {
	  try {
		const id = req.params.bookId;
		await Book.findByIdAndDelete(id);
  		res.status(202).json('Book has been deleted');
	  } catch (err) {
		res.status(500).json('Error');
	  }
	};
  
	const getBooksByName = async (req, res) => {
	  const {query} = req;
	  const bookName = await Book.findOne({title: query.title});
		if(bookName===null){
		   res.json("Title is not found");
		}
		else{
		   res.json(bookName);
		}
	};
  
	const getBooksByAuthor = async(req,res) => {
	  const {query} = req;
	  const bookAuthor = await Book.findOne({author: query.author});
		if(bookAuthor===null){
		   res.json("Author is not found");
		}
		else{
		   res.json(bookAuthor);
		}
	};
  
	return { getBooks, postBook, getBooksById, getBooksByName, getBooksByAuthor, putBookById, deleteBooksById };
};
  
module.exports = bookController;