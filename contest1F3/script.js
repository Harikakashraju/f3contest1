const fetchWithDelayTime = (API, delay) => {
    return new Promise(async (resolve, reject) => {
      try {
        setTimeout(async () => {
          const response = await fetch(API);
          const data = await response.json();
          resolve(data);
        }, delay);
      } catch (err) {
        reject(err);
      }
    });
  };
  
  // const fetchWithDelayTimeThenMethod = (API, delay) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       fetch(API)
  //         .then((response) => response.json())
  //         .then((data) => resolve(data))
  //         .catch((err) => reject(err));
  //     }, delay);
  //   });
  // };
  
  const button = document.getElementById("button");
  const tableBody = document.getElementById("my-table-body");
  
  function appendData(data) {
    if (data.posts) {
      tableBody.innerHTML = ""; // this is cleaning my table
      let postsData = "";
      data.posts.map((post) => {
        postsData += `<tr>
              <td>${post.id}</td>
              <td>${post.title}</td>
              <td>${post.body}</td>
              </tr>`;
      });
      tableBody.innerHTML += postsData;
    } else if (data.products) {
      let productsData = "";
      data.products.map((product) => {
        productsData += `<tr>
              <td>${product.id}</td>
              <td>${product.title}</td>
              <td>${product.description}</td>
              </tr>`;
      });
      tableBody.innerHTML += productsData;
    } else if (data.todos) {
      let todosData = "";
      data.todos.map((todo) => {
        todosData += `<tr>
              <td>${todo.id}</td>
              <td>${todo.todo}</td>
              <td>${todo.completed}</td>
              </tr>`;
      });
      tableBody.innerHTML += todosData;
    }
  }
  
  button.addEventListener("click", function () {
    fetchWithDelayTime("https://dummyjson.com/posts", 1000)
      .then((data) => {
        appendData(data);
        return fetchWithDelayTime("https://dummyjson.com/products", 2000);
      })
      .then((data) => {
        appendData(data);
        return fetchWithDelayTime("https://dummyjson.com/todos", 3000);
      })
      .then((data) => {
        appendData(data);
      })
      .catch((err) => console.log(err));
  });