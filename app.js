import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./src/routers/user.router.js";
const app = express();

/**
 * Basic Middlewares
 * 1. cookie-parser middleware
 * 2. Middleware for handling JSON data
 * 3. Middleware for handling URL-encoded data
 * 4. Middleware to serve static files
 * 5. (CORS) middleware between two different origin --> fronted - backend commnucation
 */
app.use(cookieParser()); //Use the cookie-parser middleware to handle cookies in the request header
app.use(express.json({ limit: "16kb" })); // Middleware for handling JSON data in the request body
app.use(express.urlencoded({ extended: true, limit: "16kb" })); //Middleware that parses the urlencoded data
app.use(express.static("public")); // Serve static files from public directory
app.use(
  //Enable Cross-Origin Resource Sharing (CORS) middleware between two different origin(fronted-backend)
  cors({
    origin: "*",
    credentials: true,
  })
);
//add router as a middleware function
app.use("/api/v1/users", userRouter); //https:localhost:8055/api/v1/users

app.get("/", (req, res) => {
  res.send("hello this is our first server");
});

/**
 * default api if page not found
 */
app.all("*", (req, res) => {
  // req--> fronted --> sign --> name, email, password --> req.methord--> req.body, req.params, req.query
  res.status(404).send("<h3>Page Not Found </h3>");
});


export { app };
