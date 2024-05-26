import jwt from "jsonwebtoken";

export default function generateJwtAndSetCookie(userId, response) {
  // CREATING TOKEN WITH USER ID AND SECRET STRING FROM .ENV
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_STRING, {
    expiresIn: "10d",
  });

  // SETTING THE TOKEN IN COOKIE
  response.cookie("token", token, {
    httpOnly: true,
    maxAge: 10 * 24 * 60 * 60 * 1000,
  });

  return token;
}
