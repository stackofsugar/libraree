import { createCookie } from "react-router";

export const user = createCookie("lt", {
  maxAge: 604_800,
});
