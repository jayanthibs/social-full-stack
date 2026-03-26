import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export async function authMiddleware(req, res, next) {
  try {
    let token = req.headers.authorization;
    //check if there's a token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    //remove the Bearer part from the token ('Bearer token')

    token = token.split(" ").pop().trim();

    //verify the token
    const { data } = jwt.verify(token, secret);

    //pass the payload from the token to the request object
    req.user = data;
    //move on to the route or next middleware
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
}


