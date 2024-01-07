import mongoose from "mongoose";
import { Card, Monster, Spell, Trap } from "../entities/card";
import cardModel from "../schemas/cardModel";
import CardModel from "../schemas/cardModel";
import Optional from "../util/Optional";
import { scrapeCard } from "./dataScraper";

export async function getCardByName(cardName: string): Promise<Optional<Card>> {
  const databaseResult = await getCardFromDatabase(cardName);
  if (databaseResult.isEmpty) {
    console.log(`Card with name ${cardName} was not found in the database!`);
    const scrapedCard = await scrapeCard({ cardName: cardName });

    if (scrapedCard.isEmpty) {
      return Optional.empty();
    }

    saveCardToDatabase(scrapedCard.value)
      .then(() => console.log(`Saved ${scrapedCard.value.name} to database!`))
      .catch((err) =>
        console.log(`Couldn't save ${scrapedCard.value.name} to database:`, err)
      );
    return scrapedCard;
  }
  console.log(`Found card with name ${cardName} in database`);
  return databaseResult;
}

async function getCardFromDatabase(
  cardName: string
): Promise<Optional<Card | Monster | Spell | Trap>> {
  try {
    const card = await CardModel.findOne({ name: cardName }).exec();

    return Optional.ofNullable(card);
  } catch (err) {
    console.error(err);
    return Optional.empty();
  }
}

/**
 * Stores a card inside the database
 *
 * @param card The card to be saved
 * @returns If the saving was successful
 * @throws If the card to save is neither a Spell, Trap or Monster card
 */
async function saveCardToDatabase(
  card: Card | Monster | Spell | Trap
): Promise<boolean> {
  console.log(`save card with name ${card.name}`);

  return cardModel.create(card) !== null;
}
