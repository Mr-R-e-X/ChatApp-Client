import { isValidUsername } from "6pp";
export const usernameValidator = (username) => {
  if (!isValidUsername(username))
    return { isVaid: false, errorMessage: "Username is invalid" };
};
