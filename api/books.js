const express = require("express");
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../db/books");

const booksRouter = express.Router();

// {baseURL/api/books/}
booksRouter.get("/", async (req, res, next) => {
  try {
    const results = await getBooks();
    res.send(results);
  } catch (err) {
    next(err);
  }
});

// {baseURL/api/books/:id}
booksRouter.get("/:id", async (req, res, next) => {
  const id = Number(req.params.id);
  console.log(id);
  if (isNaN(id) || req.param.id === "") {
    next({
      name: "Invalid ID Format",
      message: "The provided request parameter is not a valid book ID",
    });
    return;
  }

  try {
    const { id } = req.params;
    const result = await getBook(id);
    res.send(result);
  } catch (err) {
    res.send({ err, message: "Something went wrong" });
  }
});

// {baseURL/api/books}
booksRouter.post("/", async (req, res) => {
  try {
    const result = await createBook();
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

// {baseURL/api/books/delete/:id}
booksRouter.delete("/:id", async (req, res) => {
  try {
    const result = await deleteBook(req.params.id);
    res.send({ message: "book deleted successfully", id: result });
  } catch (err) {
    res.send(err);
  }
});

// Update book
booksRouter.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    console.log(id);
    if (isNaN(id) || req.params.id === " ") {
      next({
        name: "InvalidIDFormat",
        message: "The provided request parameter is not a valid book ID.",
      });
      return;
    }
    const result = await getBook(id);
    if (!result) {
      next({ name: "Not Found", message: "no matching book found" });
      return;
    } else {
      const updated = await updateBook(req.params.id, req.body.avaliable);
      if (updated) {
        res.send({
          message: "updated successfully",
          updated,
        });
      } else {
        next({
          name: "UpdateError",
          messages: "there was an error updating this book.",
        });
        return;
      }
    }
  } catch (err) {
    res.send(err);
  }
});

module.exports = booksRouter;
