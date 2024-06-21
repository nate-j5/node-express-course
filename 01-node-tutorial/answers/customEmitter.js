const EventEmitter = require("node:events");

const emitter = new EventEmitter();

emitter.on("order-pizza", (size, topping) => {
  console.log(
    `order recieved - making a ${size} pizza with ${topping} it will be ready soon!`
  );
});

emitter.on("order-pizza", (size, topping) => {
  if (size === "large") {
    console.log(
      `since you ordered a ${size} pizza, you are our lucky customer of the day!`
    );
  }
});

emitter.on("order-snacks", (snacks) => {
  console.log("Below are the snacks I like:");
  snacks.map((snack) => {
    console.log(`- ${snack}`);
  });
});

emitter.emit("order-pizza", "large", "mushroom");
emitter.emit("order-snacks", ["trail-mix", "fruit", "kombucha"]);
