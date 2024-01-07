import { Card } from "../entities/card";
import Optional from "../util/Optional";
import { getDocumentFromUrl, nodeListToArray } from "./scrapeUtils";
import CardBuilder from "../util/CardBuilder";
import {
  determineMonsterType,
  determineSpellOrTrapType,
  gatherLinkInformation,
} from "./cardUtils";
import { Attributes, MonsterRace, SpellRace, TrapRace } from "entities/meta";

declare type ScrapeInfo = {
  cardName: string;
};

const baseURL = "https://www.db.yugioh-card.com/yugiohdb/card_search.action";
const scrapeHeaders = {
  cookies:
    "CountryCd=DE; Edgescape=1; yugiohdb_cookie_card_list_mode=3; yugiohdb_cookie_card_search_mode=2;",
};

const baseDetailURL =
  "https://www.db.yugioh-card.com/yugiohdb/card_search.action?ope=2&request_locale=de";

function buildURL(info: ScrapeInfo) {
  return `${baseURL}?sess=1&ope=1&page=1&rp=50&keyword=${encodeURI(
    info.cardName
  )}&stype=1&othercon=2&request_locale=de`;
}

function buildDetailURL(cardId: string) {
  return `${baseDetailURL}&cid=${cardId}`;
}

export async function scrapeCard(info: ScrapeInfo): Promise<Optional<Card>> {
  console.log("Start to scrape for card name", info.cardName);
  const cardId = await getCardId(info);
  if (cardId.isEmpty) return Optional.empty();

  let card = await getCardDetails(cardId.value);
  console.log("Finished scraping");
  return card;
}

async function getCardDetails(cardId: string): Promise<Optional<Card>> {
  console.log(`Start gathering card details for ${cardId}`);

  const detailSiteOpt: Optional<Document> = await getDocumentFromUrl(
    buildDetailURL(cardId),
    scrapeHeaders
  );
  if (detailSiteOpt.isEmpty) {
    console.log(`Couldn't retrive detail site for ${cardId}`);

    return Optional.empty();
  }
  const detailSite = detailSiteOpt.value;

  if (detailSite.getElementById("CardSet") === null) {
    console.log(`Couldn't parse scrape details for ${cardId}`);
    return Optional.empty();
  }

  const cardTextSet = Optional.ofNullable(
    detailSite.getElementById("CardTextSet") as HTMLDivElement
  );

  if (cardTextSet.isEmpty) {
    console.log(`Couldn't find detail block for ${cardId}`);
    return Optional.empty();
  }
  const cardSpeciesElement = Optional.ofNullable<HTMLParagraphElement>(
    cardTextSet
      .map((div) => div.querySelector("p.species") as HTMLParagraphElement)
      .getOrNull()
  );

  const cardBuilder = new CardBuilder(cardId);

  const cardName = Optional.ofNullable(detailSite.getElementById("cardname"))
    .map((div) => div.firstElementChild)
    .map((h1) => h1.firstChild)
    .map((txtChild) => txtChild.textContent)
    .map((txt) => txt.trim())
    .getOrElse("N/A");

  console.log(`Found name "${cardName}" for card `);

  cardBuilder.setName(cardName);

  if (cardSpeciesElement.isPresent) {
    console.log(`Filling details for monster with ID: ${cardId}`);
    fillMonsterDetails(cardBuilder, cardTextSet.value);
  } else {
    console.log(`Filling details for spell/trap with ID: ${cardId}`);
    fillSpellOrTrapDetails(cardBuilder, cardTextSet.value);
  }

  console.log(`Finished gathering details for ${cardId}`);
  try {
    return cardBuilder.result;
  } catch (e) {
    console.error(`Error while building the card for ID: ${cardId}`, e);
    return Optional.empty();
  }
}

/**
 * Collects information about an spell or trap card and fills it into a CardBuilder
 *
 * @param cardBuilder The CardBuilder into which the information should be filled
 * @param cardTextSet The HTMLDivElement from which wraps all the information of the card
 * @throws When the function detects the provided HTMLDivElement describes an "Spell"/"Trap" card
 */
function fillSpellOrTrapDetails(
  cardBuilder: CardBuilder,
  cardTextSet: HTMLDivElement
): void {
  const itemBoxes: Array<HTMLDivElement> = nodeListToArray(
    cardTextSet.querySelectorAll("div.item_box")
  )
    .map((e) => e as HTMLDivElement)
    .filter((e: HTMLDivElement) => e.childElementCount == 2);

  console.log("itemBoxes", itemBoxes);

  for (let e of itemBoxes) {
    const valueElement = e.querySelector(
      "span.item_box_value"
    ) as HTMLSpanElement;
    const title = Optional.ofNullable(e.querySelector("span.item_box_title"))
      .map((span) => span.textContent)
      .map((txt) => txt.toLowerCase())
      .map((txt) => txt.trim())
      .getOrElse("");
    const value = Optional.ofNullable(valueElement.textContent)
      .map((txt) => txt.trim())
      .getOrElse("");
    console.log("Found field", title, "with value", value);

    switch (title) {
      case "symbol":
        const result = determineSpellOrTrapType(value);

        cardBuilder.setType(result.cardType);
        cardBuilder.setRace(result.spellTrapRace as SpellRace | TrapRace);
        cardBuilder.setFrame(result.cardFrame);
        break;
      default:
        throw new Error(
          `cannot fill details for 'Monster' cards! Found field: ${title}`
        );
    }
  }

  cardBuilder.setDescription(
    Optional.ofNullable(cardTextSet.querySelector("div.text_title"))
      .map((div) => div.parentElement)
      .map((parent) => parent.textContent)
      .map((txt) => txt.trim())
      .map((txt) => txt.substring("Kartentext".length))
      .map((txt) => txt.trim())
      .getOrElse("N/A")
  );
}

/**
 * Collects information about an monster card and fills it into a CardBuilder
 *
 * @param cardBuilder The CardBuilder into which the information should be filled
 * @param cardTextSet The HTMLDivElement from which wraps all the information of the card
 * @throws When the function detects the provided HTMLDivElement describes an "Spell"/"Trap" card
 */
function fillMonsterDetails(
  cardBuilder: CardBuilder,
  cardTextSet: HTMLDivElement
): void {
  const itemBoxes: Array<HTMLDivElement> = nodeListToArray(
    cardTextSet.querySelectorAll("div.item_box")
  )
    .map((e) => e as HTMLDivElement)
    .filter((e: HTMLDivElement) => e.childElementCount == 2);

  for (let e of itemBoxes) {
    const valueElement = e.querySelector(
      "span.item_box_value"
    ) as HTMLSpanElement;
    const title = Optional.ofNullable(e.querySelector("span.item_box_title"))
      .map((span) => span.textContent)
      .map((txt) => txt.toLowerCase())
      .map((txt) => txt.trim())
      .getOrElse("");
    const value = Optional.ofNullable(valueElement.textContent)
      .map((txt) => txt.trim())
      .getOrElse("");
    console.log(`Found field "${title}" with value "${value}"`);

    switch (title) {
      case "symbol":
        throw new Error(
          `Cannot fill details for 'Spell'/'Trap' cards! Found field: ${title}`
        );
      case "eigenschaft":
        cardBuilder.setAttribute(value as Attributes);
        break;
      case "atk":
        cardBuilder.setAtk(value === "?" ? "?" : Number(value));
        break;
      case "def":
        cardBuilder.setDef(value === "?" ? "?" : Number(value));
        break;
      case "link":
        const linkInfo = gatherLinkInformation(valueElement);
        cardBuilder.setLinkval(linkInfo.linkvalue);
        cardBuilder.setLinkmarkers(linkInfo.linkmarkers);
        break;
      case "rang":
      case "stufe":
        const levelStr = value || "Stufe 0";
        cardBuilder.setLevel(Number(levelStr.slice(levelStr.indexOf(" "))));
        break;
      default:
        break;
    }
  }

  const cardSpeciesElement = cardTextSet.querySelector(
    "p.species"
  ) as HTMLParagraphElement;

  const typeAndFrame = determineMonsterType(
    cardSpeciesElement.textContent as string
  );

  cardBuilder.setType(typeAndFrame.cardType);
  cardBuilder.setFrame(typeAndFrame.cardFrame);

  const race = cardSpeciesElement.firstElementChild?.textContent?.split(
    " "
  )[0] as MonsterRace;
  cardBuilder.setRace(race);

  cardBuilder.setDescription(
    Optional.ofNullable(cardTextSet.querySelector("div.text_title"))
      .map((div) => div.parentElement)
      .map((parent) => parent.textContent)
      .map((txt) => txt.trim())
      .map((txt) => txt.substring("Kartentext".length))
      .map((txt) => txt.trim())
      .getOrElse("N/A")
  );

  // Pendulum fields
  Optional.ofNullable<HTMLDivElement>(
    cardTextSet.querySelector("div.pen_s>span.item_box_value")
  )
    .map((div) => div.textContent as string)
    .map((scaleStr) => Number(scaleStr))
    .ifPresent((scale) => cardBuilder.setScale(scale));

  Optional.ofNullable<HTMLDivElement>(
    cardTextSet.querySelector("div.pen_effect>div.item_box_text")
  )
    .map((div) => div.textContent as string)
    .map((txt) => txt.trim())
    .ifPresent((penDesc) => cardBuilder.setPendulumDescription(penDesc));
}

async function getCardId(info: ScrapeInfo): Promise<Optional<string>> {
  const url = buildURL(info);
  const documentOpt = await getDocumentFromUrl(url, scrapeHeaders);
  if (documentOpt.isEmpty) return Optional.empty();

  const document = documentOpt.value;
  const noData = document.querySelector("div.no_data");
  if (noData) {
    console.error("Couldn't find data", noData);
    // The site cannot provide data for the given query
    return Optional.empty();
  }

  const cardListEl = document.getElementById("card_list") as HTMLDivElement;
  let bestMatchingEntryEl = cardListEl.firstElementChild as HTMLDivElement;
  console.log(cardListEl.children);

  for (let i = 0; i < cardListEl.children.length; i++) {
    const currentElement = cardListEl.children.item(i) as HTMLDivElement;
    const cardName = (currentElement.querySelector(".cnm") as HTMLInputElement)
      .value;
    console.log(
      `cur "${cardName}" search "${info.cardName}" match ${
        info.cardName.toUpperCase() === cardName.toUpperCase()
      }`
    );

    if (info.cardName.toUpperCase() === cardName.toUpperCase()) {
      bestMatchingEntryEl = currentElement;
      break;
    }
  }
  if (!bestMatchingEntryEl) {
    console.error(`Couldn't find ID for ${info.cardName}`);
    return Optional.empty();
  }

  const idInputEl = bestMatchingEntryEl.lastElementChild as HTMLInputElement;

  const cardId = idInputEl.value.split(/&/)[1].split(/=/)[1];
  console.log(
    `Found ID ${cardId} for ${info.cardName}, will start scraping details!`
  );
  return Optional.ofNullable(cardId);
}
