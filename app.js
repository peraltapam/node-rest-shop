const express = require("express");
const app = express();
const logger = require("morgan");

app.use(logger("dev"));

const productsRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);

// error handling in case none of the routers above worked
app.use((req, res, next) => {
  const error = new Error("Not found :(");
  error.status = 404;
  next(error);
});

// error handling for failing operations
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
