import Twit from "twit";

class Twitter {
  constructor(config) {
    if (!this.twitter) this.twitter = new Twit(config);
  }

  getInstance() {
    return this.twitter;
  }
}

export { Twitter };
