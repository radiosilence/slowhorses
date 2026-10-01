import { CARDS, FACTIONS } from "../trumps/cards.js";
import { portrait } from "../shared/portraits.js";

const card = (id) => CARDS.find((c) => c.id === id);

const people = {
  lamb: {
    body: [
      "You are rude, unwashed and almost always right. You give every impression of not caring, and you would walk through fire for your people, though you'd complain about the smoke.",
      "Colleagues find you exhausting. Enemies find you, eventually, exactly where you meant them to.",
    ],
  },
  river: {
    body: [
      "Talented, impatient and convinced you've been wronged, which to be fair you were. You run towards trouble because standing still feels like giving up.",
      "You want to get back to the Park more than anything, and you keep doing the brave, reckless thing that guarantees you won't.",
    ],
  },
  standish: {
    body: [
      "You are the one who keeps everything running: the files, the rota, the accounts and, quietly, everybody's morale. People underestimate you, and you let them.",
      "You are steadier than anyone in the building and you know exactly where the gun is kept.",
    ],
  },
  louisa: {
    body: [
      "Capable, guarded and harder than people assume. You keep your head when things go wrong and you keep your grief to yourself.",
      "You've lost more than most in this job, and you are still the one who finishes it.",
    ],
  },
  min: {
    body: [
      "Warm, funny and a better officer than your file suggests. You're the one who makes a desperate office feel almost bearable.",
      "You believe in second chances, for yourself and everyone else. It is your best quality and the Service never deserved it.",
    ],
  },
  roddy: {
    body: [
      "A genius, by your own account, and frankly the account is not entirely wrong. There is no database you can't get into and no social situation you can't make worse.",
      "Your confidence is unshakeable, your hair is a different colour every season, and your romantic judgement should be reviewed by the Dogs.",
    ],
  },
  shirley: {
    body: [
      "Short fuse, quick hands and no patience for anyone who talks down to you. Most problems, in your experience, can be solved by hitting them.",
      "Underneath it you are fiercely loyal, and when a colleague is in trouble you're already out of the door.",
    ],
  },
  marcus: {
    body: [
      "Cool, capable and the person anyone would want beside them when it kicks off. You'd be running operations at the Park if you could stop placing bets.",
      "You take risks for a living and for fun, and you're usually good enough to cover the difference.",
    ],
  },
  coe: {
    body: [
      "Quiet, watchful and deeply unsettling to sit next to. You notice patterns that everyone else misses, mostly because you are not distracted by talking to people.",
      "There is a lot going on behind your eyes, and very little of it is good news for whoever is trying to hurt your colleagues.",
    ],
  },
  sid: {
    body: [
      "Bright, likeable and far too good for Slough House, which ought to make everyone wonder why you're there. You're the competent one on every job.",
      "You keep your own counsel and some of your own secrets. People trust you, and you are careful with that.",
    ],
  },
  moira: {
    body: [
      "Procedure is not a suggestion. You arrive with a ring binder, a laminator and opinions about how a proper office is run.",
      "Slough House will test you. You'll leave notes about it.",
    ],
  },
  moody: {
    body: [
      "Hard, bitter and certain the Service owes you. You came from the Dogs, you never stopped thinking like one, and you'll take any job that promises a way back.",
      "That kind of offer always comes with strings. Watch your step, especially on the stairs.",
    ],
  },
  taverner: {
    body: [
      "Strictly speaking you are not a slow horse. You'd simply be running them, from a corner office at the Park, three moves ahead of anyone who notices.",
      "Charming, ruthless and immaculately turned out. Your loyalty is to the Service, which you have quietly come to regard as yourself.",
    ],
  },
};

const results = Object.fromEntries(
  Object.entries(people).map(([id, p]) => {
    const c = card(id);
    return [id, { ...p, name: c.name, sub: c.role, colour: FACTIONS[c.faction].color }];
  })
);

export default {
  id: "character",
  title: "Which Slow Horse are you?",
  kicker: "Personnel assessment",
  form: "Form SH/13",
  intro: "Sixteen questions to establish which of Slough House's disgraced officers you most resemble. Lamb will read the results. He will not be kind about them.",
  verdict: "Your file matches",
  stampWord: "Identified",
  secondLabel: "Also bears a resemblance to",
  titleArt: () => `<div class="mug-stack">${["shirley", "lamb", "river"].map((id) => `<div>${portrait(card(id))}</div>`).join("")}</div>`,
  art: (id) => portrait(card(id)),
  shareText: (d) => `My Slough House file matches ${d.name}. Which slow horse are you?`,

  axes: [
    { key: "nerve", label: "Nerve", lo: "Happier behind a desk than on the street", hi: "Calm when the shooting starts" },
    { key: "guile", label: "Guile", lo: "Says what they mean", hi: "Never quite says what they mean" },
    { key: "loyalty", label: "Loyalty", lo: "Out for themselves", hi: "Would go back for a colleague" },
    { key: "ambition", label: "Ambition", lo: "Content to be left alone", hi: "Still wants the Park back" },
    { key: "squalor", label: "Squalor", lo: "Clean mug, clear desk", hi: "Has eaten something found in a drawer" },
  ],

  questions: [
    {
      where: "Slough House, first day",
      text: "Your new boss asks what you did to end up here.",
      options: [
        { text: "Lost a target on a tail. It happens.", results: { louisa: 2, min: 1, sid: 2 }, axes: { guile: -1 } },
        { text: "I was set up, and I'm going to prove it.", results: { river: 1, moody: 2 }, axes: { ambition: 2, nerve: 1 } },
        { text: "Placed a few bets on the job. Mostly won.", results: { marcus: 2, shirley: 1 }, axes: { nerve: 1, guile: 1 } },
        { text: "None of your business.", results: { coe: 2, lamb: 1 }, axes: { guile: 2, loyalty: -1 } },
      ],
    },
    {
      where: "Slough House",
      text: "Lamb, in front of everyone, calls you a disappointment on legs.",
      options: [
        { text: "Laugh. He's not entirely wrong.", results: { min: 2, louisa: 1 }, axes: { loyalty: 1 } },
        { text: "Tell him where to go, at volume.", results: { shirley: 2, river: 1 }, axes: { nerve: 2, guile: -1 } },
        { text: "Insult him back, and better.", results: { lamb: 2, marcus: 1 }, axes: { nerve: 1, squalor: 1 } },
        { text: "Write it down. Everything goes in the file.", results: { moira: 2, taverner: 1 }, axes: { guile: 1, squalor: -1 } },
      ],
    },
    {
      where: "A parked car, Sunday",
      text: "A stake-out in the rain. Six hours in, nothing has moved.",
      options: [
        { text: "Talk. The whole time. About anything.", results: { min: 2, roddy: 1 }, axes: { loyalty: 1 } },
        { text: "Sleep. Somebody will wake you.", results: { lamb: 1, shirley: 1, marcus: 1 }, axes: { squalor: 2 } },
        { text: "Watch. Just watch.", results: { coe: 2, louisa: 1 }, axes: { guile: 1 } },
        { text: "Get out and go closer. Nothing will happen otherwise.", results: { river: 2, sid: 1 }, axes: { nerve: 2, ambition: 1 } },
      ],
    },
    {
      where: "The biscuit tin",
      text: "The office biscuits have gone missing again.",
      options: [
        { text: "Pull the corridor camera footage. It takes four minutes.", results: { roddy: 2, sid: 1 }, axes: { guile: 1 } },
        { text: "Restock the tin tomorrow with something nasty in the bottom layer.", results: { shirley: 2, lamb: 1 }, axes: { nerve: 1, loyalty: -1 } },
        { text: "Find out who, and make them pay for it for months.", results: { taverner: 2, moody: 1 }, axes: { guile: 2, loyalty: -1 } },
        { text: "Buy more. Whoever it was must have needed them.", results: { min: 2, standish: 1 }, axes: { loyalty: 2 } },
      ],
    },
    {
      where: "The office kitchen",
      text: "The kettle has broken.",
      options: [
        { text: "Get it repaired, label it, and draw up a rota.", results: { moira: 1, standish: 2 }, axes: { squalor: -3 } },
        { text: "Get into the procurement system and order a much better one.", results: { roddy: 2, sid: 1 }, axes: { guile: 1, ambition: 1 } },
        { text: "Hit it until it works.", results: { shirley: 1, moody: 1 }, axes: { nerve: 1, squalor: 1 } },
        { text: "Drink the whisky neat instead.", results: { lamb: 2, min: 1 }, axes: { squalor: 3 } },
      ],
    },
    {
      where: "The second floor",
      text: "There is a smell in the office. Nobody will say what it is.",
      options: [
        { text: "Find the source and deal with it, whatever it is.", results: { standish: 2, louisa: 1 }, axes: { loyalty: 1, squalor: -1 } },
        { text: "Put up a notice about shared responsibility.", results: { moira: 2, standish: 1 }, axes: { squalor: -2 } },
        { text: "Work from the café downstairs and put it on expenses.", results: { marcus: 2, taverner: 1 }, axes: { guile: 1 } },
        { text: "Hadn't noticed.", results: { coe: 1, lamb: 1, roddy: 1 }, axes: { squalor: 2 } },
      ],
    },
    {
      where: "Personnel",
      text: "Lamb has to sign your leave form. What do you put as the reason?",
      options: [
        { text: "\"Gaming tournament (competitive).\" He'll be impressed.", results: { roddy: 2, coe: 1 }, axes: { ambition: 1 } },
        { text: "\"Personal.\" That's all he's getting.", results: { river: 1, louisa: 2 }, axes: { nerve: 1, squalor: -1 } },
        { text: "\"Family matter.\" It's a card game, but he needn't know.", results: { marcus: 1, sid: 1 }, axes: { nerve: 1, guile: 1 } },
        { text: "The real reason, neatly, with dates and cover arranged.", results: { standish: 2, moira: 1 }, axes: { guile: 1, nerve: -1 } },
      ],
    },
    {
      where: "Slough House",
      text: "A colleague is in danger, and you've been told to stand down.",
      options: [
        { text: "You're already in the car.", results: { river: 2, shirley: 1 }, axes: { nerve: 2, loyalty: 2 } },
        { text: "Work out who gave the order, and why, before you move.", results: { lamb: 1, louisa: 2 }, axes: { guile: 2, loyalty: 1 } },
        { text: "Stand down, then quietly arrange for someone else not to.", results: { taverner: 2, standish: 1 }, axes: { guile: 3 } },
        { text: "Take the gun from the drawer and go.", results: { marcus: 1, coe: 1 }, axes: { nerve: 2, loyalty: 1 } },
      ],
    },
    {
      where: "Operations",
      text: "You get to choose your own code name.",
      options: [
        { text: "Something forgettable. That's the point of it.", results: { sid: 1, coe: 2 }, axes: { guile: 1 } },
        { text: "Something with 'Shadow' in it.", results: { roddy: 2, river: 1 }, axes: { ambition: 1, guile: -1 } },
        { text: "The name of a horse that once came in at 40 to 1.", results: { marcus: 1, moody: 1, shirley: 1 }, axes: { nerve: 1 } },
        { text: "Whatever's next on the list. Who cares?", results: { lamb: 1, min: 2, taverner: 1 }, axes: { squalor: 1 } },
      ],
    },
    {
      where: "A recruitment fair",
      text: "A private security firm offers you double your salary.",
      options: [
        { text: "Take it. The Service owes you nothing.", results: { moody: 2, marcus: 1 }, axes: { loyalty: -2, ambition: 1 } },
        { text: "Refuse. You're getting back to the Park, properly.", results: { river: 2, sid: 1 }, axes: { ambition: 2, loyalty: 1 } },
        { text: "Take the meeting, and keep notes on who sent them.", results: { taverner: 2, coe: 1 }, axes: { guile: 2 } },
        { text: "Refuse. Somebody has to stay and keep an eye on this lot.", results: { standish: 1, louisa: 1, shirley: 1 }, axes: { loyalty: 2 } },
      ],
    },
    {
      where: "Interview room",
      text: "Your preferred way of getting the truth out of someone?",
      options: [
        { text: "Silence, until they fill it.", results: { coe: 2, lamb: 1 }, axes: { guile: 2 } },
        { text: "Charm. Most people want to be liked.", results: { sid: 1, min: 2 }, axes: { guile: 1 } },
        { text: "Threats, delivered with a smile.", results: { taverner: 2, louisa: 1 }, axes: { guile: 2, loyalty: -1 } },
        { text: "Thump them until they talk.", results: { moody: 2, shirley: 1 }, axes: { nerve: 1, loyalty: -1 } },
      ],
    },
    {
      where: "Your bank statement",
      text: "£10,000 has appeared in your account with no explanation. The Dogs will ask.",
      options: [
        { text: "Put it on a horse before they can freeze it.", results: { marcus: 2, roddy: 1 }, axes: { nerve: 1 } },
        { text: "Report it yourself, in writing, before they come asking.", results: { moira: 2, standish: 1 }, axes: { squalor: -1, nerve: -1 } },
        { text: "Give it to someone who needs it, and let the Dogs make sense of that.", results: { min: 2, louisa: 1 }, axes: { loyalty: 2 } },
        { text: "Find out who sent it, and what they think they've bought.", results: { taverner: 1, sid: 2, lamb: 1 }, axes: { guile: 2 } },
      ],
    },
    {
      where: "Annual leave",
      text: "Lamb has, astonishingly, approved a week's leave. Where do you go?",
      options: [
        { text: "A residential course on records management in Harrogate.", results: { moira: 2, standish: 1, sid: 1 }, axes: { squalor: -1 } },
        { text: "Nowhere. You stay and watch who uses your desk.", results: { river: 1, coe: 1, moody: 2 }, axes: { ambition: 1 } },
        { text: "Somewhere with a card room and a late bar.", results: { marcus: 2, roddy: 1 }, axes: { nerve: 1 } },
        { text: "Your sofa, curtains drawn, phone in a drawer.", results: { lamb: 1, coe: 1, shirley: 2 }, axes: { squalor: 2, ambition: -1 } },
      ],
    },
    {
      where: "Personnel file",
      text: "How did you come to join the Service?",
      options: [
        { text: "Family tradition. Your grandfather was a legend.", results: { river: 2, sid: 1 }, axes: { ambition: 2 } },
        { text: "You were recruited after hacking something you shouldn't have.", results: { roddy: 2, shirley: 1 }, axes: { guile: 1 } },
        { text: "From the forces, then into the Dogs.", results: { moody: 2, marcus: 1 }, axes: { nerve: 2 } },
        { text: "Rose through the ranks, keeping other people's secrets.", results: { taverner: 2, moira: 1, standish: 1 }, axes: { guile: 1, squalor: -1 } },
      ],
    },
    {
      where: "The new starter",
      text: "Someone on their first day asks what you actually do here.",
      options: [
        { text: "\"Keeping this building from falling down.\"", results: { standish: 2, moira: 1 }, axes: { loyalty: 1 } },
        { text: "\"Waiting.\"", results: { louisa: 2, coe: 1, lamb: 1 }, axes: { guile: 1 } },
        { text: "\"Everything. Nobody else here could.\"", results: { roddy: 2, taverner: 1 }, axes: { ambition: 2 } },
        { text: "\"Mind your own business.\"", results: { moody: 1, shirley: 1 }, axes: { loyalty: -1, nerve: 1 } },
      ],
    },
    {
      where: "Your file, closed",
      text: "The Park's only obituary is a file note, mostly redacted. Which line survives?",
      options: [
        { text: "Never left a joe behind.", results: { lamb: 2, louisa: 1 }, axes: { loyalty: 3 } },
        { text: "Paperwork in good order throughout.", results: { moira: 2, standish: 1 }, axes: { squalor: -2, nerve: -1 } },
        { text: "Was right. [REDACTED] chose to ignore this.", results: { coe: 1, sid: 2, moody: 1 }, axes: { guile: 1 } },
        { text: "Considered for return to Regent's Park. Not returned.", results: { sid: 1, river: 1, marcus: 1 }, axes: { ambition: 2 } },
      ],
    },
  ],

  results,
};
