import "dotenv/config";
import config from "./config/config.js";
import { Twitter } from "./twitter.js";
import { scheduleJob } from "node-schedule";
import { getBody } from "./bible/index.js";

const connectTwitter = new Twitter(config);

scheduleJob("5 */1 * * *", async () => {
  const verse = await getBody();

  connectTwitter.getInstance().post(
    "statuses/update",
    {
      status: verse,
    },
    function (err, data, response) {
      if (err) {
        console.log(err);
        return;
      }

      console.log("Tweet successfully sent! %d", new Date());
    }
  );
});
