import express from "express";
import { json } from "body-parser";
import graphqlHttp from "express-graphql";
import { connect } from "mongoose";
import graphQlSchema from "./graphql/schema/index";
import graphQlResolvers from "./graphql/resolvers/index";
import isAuth from "./middleware/is-auth";

const app = express();

app.use(json());

app.use((req, res, next) => {
  //allows a web service to specify that it's OK for it to be invoked from any domain
  res.setHeader("Access-Control-Allow-Origin", "*");
  //browser sends an OPTIONS request before sending POST
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    //graphql playground
    graphiql: true
  })
);

connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-uagfb.mongodb.net/${process.env.MONGO_DB}?retryWrites=true`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
