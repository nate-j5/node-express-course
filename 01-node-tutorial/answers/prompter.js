const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let superHeroValue = "";
let userNumber = 0;

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
 <p> ${superHeroValue}</p>
 <p> ${userNumber}</p>
  <form method="POST">
  <label for="superHeroValue">Enter a SuperHero name</label><br>
  <input id="superHeroValue" name="superHeroValue"></input>

  <div> 
   <label for="userNumber">Enter your rating for them from 1-10 (10 is the highest)</label><br>
  <input id="userNumber" type="number" name="userNumber" min="1" max="10"></input>
  </div>
 
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic
      if (body["superHeroValue"] && body["userNumber"]) {
        superHeroValue = body["superHeroValue"];
        userNumber = body["userNumber"];
      } else {
        superHeroValue = "Nothing was entered.";
        userNumber = "Nothing was entered.";
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.listen(3000);
console.log("The server is listening on port 3000.");
