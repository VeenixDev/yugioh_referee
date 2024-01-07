import express from "express";
import { Card } from "./entities/card";
import Optional from "./util/Optional";
import { scrapeCard } from "./scraping/dataScraper";
import { getCardByName } from "./scraping/cardHandler";
import { fetchSite } from "./scraping/scrapeUtils";

const router = express.Router();

router.post("/validate", (req, res) => {
  res.sendStatus(200);
});

router.get("/", (res, req) => {
  console.log("Got request!");
  scrapeCard({ cardName: "Dunkler Magier" }).then((card) => {
    console.log("Scraped card!");
    req.status(200).json(card);
  });
});

router.get("/card/:cardName", (req, res) => {
  const cardName = req.params.cardName;
  console.log(cardName, "was requested!");

  getCardByName(cardName).then((card) => {
    if (card.isPresent) {
      res.status(200).json(card);
    } else {
      res.sendStatus(404);
    }
  });
});

router.get("/card/:cardId/site", (req, res) => {
  const cardId = req.params.cardId;
  console.log("Site for", cardId, "was requested!");

  fetchSite(
    `https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&request_locale=de&cid=${cardId}`,
    {}
  ).then((result) => res.status(200).send(result.getOrElse("No Data found!")));
});

export default router;
