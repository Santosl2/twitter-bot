import { api } from "../services/api.js";

const verses = [];

async function getVerse() {
  const { data } = await api.get("verses/nvi/random");
  const {
    chapter,
    number,
    text,
    book: { name },
  } = data;

  return {
    chapter,
    number,
    text,
    name,
  };
}

async function getBody() {
  let body = await getVerse();

  while (body.text.length > 280 || verses.some((v) => v === body.text)) {
    console.log("Versicle too long, getting another...");
    body = await getVerse();
  }

  const bodyToPost = `
    ${body.text}
    \n\n
    ${body.name} ${body.chapter}:${body.number}
  `;

  verses.push(body.text);
  console.log(bodyToPost);
}

export { getBody };
