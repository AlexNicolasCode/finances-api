import { createHmac } from "crypto";

export const encondePassword = (password) => {
    return createHmac("sha256", process.env.KEY_PASSWORD)
      .update(password)
      .digest("hex");
}