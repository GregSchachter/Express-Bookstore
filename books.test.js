process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
const db = require("./db");

test("post request adds book", async () => {
  const newBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: 2017,
  };
  const res = await request(app).post("/books").send(newBook);
  expect(res.body.book.title).toBe(
    "Power-Up: Unlocking the Hidden Mathematics in Video Games"
  );
});

test("incorrect post request recieves error code", async () => {
  const newBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: "2017d",
  };
  const res = await request(app).post("/books").send(newBook);
  expect(res.body.error.status).toBe(400);
});

test("get request shows books", async () => {
  const res = await request(app).get("/books");
  console.log(res.body);
  expect(res.body.books).toHaveLength(1);
  expect(res.body.books[0].title).toBe(
    "Power-Up: Unlocking the Hidden Mathematics in Video Games"
  );
});

test("incorrect put request recieves error", async () => {
  const newBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: "2017d",
  };
  const res = await request(app).put("/books/0691161518").send(newBook);
  expect(res.body.error.status).toBe(400);
});

test("put request changes book", async () => {
  const newBook = {
    isbn: "0691161518",
    amazon_url: "http://a.co/eobPtX2",
    author: "Matthew Lane",
    language: "english",
    pages: 264,
    publisher: "Princeton University Press",
    title: "Power-Up: Unlocking the Hidden Mathematics in Video Games",
    year: 2024,
  };
  const res = await request(app).put("/books/0691161518").send(newBook);
  expect(res.body.book.year).toBe(2024);
});

test("delete request deletes books", async () => {
  const res = await request(app).delete("/books/0691161518");
  expect(res.body.message).toBe("Book deleted");
});
