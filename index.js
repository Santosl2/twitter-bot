import "dotenv/config";
import config from "./config/config.js";
import { Twitter } from "./twitter.js";
import { scheduleJob } from "node-schedule";
import { getBody } from "./bible/index.js";

const connectTwitter = new Twitter(config);

console.log("Twitter BOT is started...");

scheduleJob("5 */1 * * *", async () => {
  connectTwitter.getInstance().post(
    "statuses/update",
    {
      status: await getBody(),
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
