import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

async function isAuthorizedUser(request, response, next) {
  try {
    // GETTING JWT TOKEN FROM REQUEST
    const token = request.cookies.token;

    // NO TOKEN? RESPOND 400 (BAD REQUEST)
    if (!token) {
      return response
        .status(400)
        .json({ status: "failed", message: "Unauthorized user" });
    }

    // GET USER ID BY DECODING THE TOKEN
    const decoded = jwt.verify(token, process.env.JWT_SECRET_STRING);

    // GET USER FROM DB BY SEARCHING WITH USER ID
    const user = await User.findById(decoded.userId).select("-password");

    // SET NEW PROPERTY TO REQUEST OBJ
    request.user = user;

    // CALL NEXT MIDDLEWARE
    next();
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
}

export default isAuthorizedUser;
