### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - Using async/await, Promises

- What is a Promise?
  - Handles asynchronous code that can either be resolved or rejected

- What are the differences between an async function and a regular function?
  - async functions always return a Promise, so these functions are usually expected to have an *await* keyword inside
  - Regular functions simply run one line after another and don't return a Promise.

- What is the difference between Node.js and Express.js?
  - Node.js is a runtime environment that allows the execution of JavaScript code on the server side of an application.
  - Express.js is a framework used on top of Node.js that simplifies API requests.

- What is the error-first callback pattern?
  - Node.js handles errors first before handling other asynchronous code. It is the first argument passed in a function to handle an error first.

- What is middleware?
  - Functions that have access to a request and response objects, and the next function to be executed.

- What does the `next` function do?
  - It executes the next function to be called after the request and/or response objects are accessed.

- What does `RETURNING` do in SQL? When would you use it?
  - Retrieves values of columns that were modified.
  - Used after performing `INSERT`, `UPDATE`, or `DELETE` operations.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
  - Multiple awaits within an async function can cause performance issues. It may take a while for the variables to be updated since the awaits are run consecutively instead of in parallel.

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
