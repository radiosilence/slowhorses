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
  intro: "Twelve questions to establish which of Slough House's disgraced officers you most resemble. Lamb will read the results. He will not be kind about them.",
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
      text: "Lamb asks what you did to end up here.",
      options: [
        { text: "Lost a target on a tail. It happens.", results: { louisa: 3, min: 1 }, axes: { guile: -1 } },
        { text: "I was set up, and I'm going to prove it.", results: { river: 3, sid: 1 }, axes: { ambition: 2, nerve: 1 } },
        { text: "Placed a few bets on the job. Mostly won.", results: { marcus: 3, shirley: 1 }, axes: { nerve: 1, guile: 1 } },
        { text: "None of your business.", results: { coe: 2, moody: 2, lamb: 1 }, axes: { guile: 2, loyalty: -1 } },
      ],
    },
    {
      where: "The kitchen",
      text: "The office kettle has broken.",
      options: [
        { text: "Get it repaired, label it, and draw up a rota.", results: { standish: 2, moira: 3 }, axes: { squalor: -3 } },
        { text: "Get into the building's procurement system and order a better one.", results: { roddy: 3 }, axes: { guile: 1, ambition: 1 } },
        { text: "Hit it until it works.", results: { shirley: 3, marcus: 1 }, axes: { nerve: 1, squalor: 1 } },
        { text: "Drink the whisky neat instead.", results: { lamb: 2, moody: 1 }, axes: { squalor: 3 } },
      ],
    },
    {
      where: "A street in the City",
      text: "The man you're watching realises, and runs.",
      options: [
        { text: "Chase him, through traffic if necessary.", results: { river: 2, shirley: 2, sid: 1 }, axes: { nerve: 2 } },
        { text: "Let him go, and follow him to wherever he's running to.", results: { louisa: 2, sid: 2, lamb: 1 }, axes: { guile: 2 } },
        { text: "Stick a foot out as he passes, without getting up.", results: { lamb: 2, coe: 1 }, axes: { squalor: 1, guile: 1 } },
        { text: "Track his phone from your desk and tell everyone how easy it was.", results: { roddy: 2, min: 1 }, axes: { nerve: -2 } },
      ],
    },
    {
      where: "The pub",
      text: "A stranger insults one of your colleagues.",
      options: [
        { text: "Headbutt.", results: { shirley: 3, moody: 1 }, axes: { nerve: 2, loyalty: 1 } },
        { text: "Calm everybody down and get them out before it turns.", results: { min: 3, standish: 2 }, axes: { loyalty: 1, nerve: -1 } },
        { text: "Remember his face. Deal with it later.", results: { coe: 3, taverner: 2, louisa: 1 }, axes: { guile: 2 } },
        { text: "Agree with him loudly, then insult him worse.", results: { lamb: 2, roddy: 1 }, axes: { squalor: 1, loyalty: -1 } },
      ],
    },
    {
      where: "Your desk",
      text: "What's in your top drawer?",
      options: [
        { text: "A pistol, wrapped in a cloth, under the stationery.", results: { standish: 3, marcus: 1 }, axes: { nerve: 1, squalor: -1 } },
        { text: "Betting slips, some of them winners.", results: { marcus: 3, sid: 1 }, axes: { nerve: 1 } },
        { text: "Energy drinks and a framed photo of yourself.", results: { roddy: 3, moira: 1 }, axes: { ambition: 1, squalor: 1 } },
        { text: "A knife and a textbook on trauma.", results: { coe: 3, louisa: 1 }, axes: { guile: 1 } },
      ],
    },
    {
      where: "A park bench",
      text: "Someone from Regent's Park offers you a way back in, if you report on your colleagues.",
      options: [
        { text: "Take it. This is what you've been waiting for.", results: { moody: 3, sid: 1 }, axes: { ambition: 2, loyalty: -3 } },
        { text: "Say no, and spend a week wishing you'd said yes.", results: { river: 3, louisa: 1 }, axes: { ambition: 2, loyalty: 1 } },
        { text: "Tell Lamb straight away.", results: { standish: 2, min: 3 }, axes: { loyalty: 2, guile: -1 } },
        { text: "You're the one making the offer.", results: { taverner: 3 }, axes: { guile: 3, ambition: 2 } },
      ],
    },
    {
      where: "Friday night",
      text: "How do you spend it?",
      options: [
        { text: "A meeting, then an early night.", results: { standish: 3, moira: 1 }, axes: { squalor: -2, nerve: -1 } },
        { text: "Online, winning, telling people about it.", results: { roddy: 2, marcus: 1 }, axes: { ambition: 1, squalor: 1 } },
        { text: "A quiet drink with your partner from work.", results: { min: 3, louisa: 2 }, axes: { loyalty: 2 } },
        { text: "Alone, with the curtains shut.", results: { coe: 3, lamb: 1 }, axes: { squalor: 1, loyalty: -1 } },
      ],
    },
    {
      where: "Slough House",
      text: "A colleague is in danger, and you've been told to stand down.",
      options: [
        { text: "You're already in the car.", results: { river: 3, shirley: 1, marcus: 1 }, axes: { nerve: 2, loyalty: 2 } },
        { text: "Work out who gave the order, and why, before you move.", results: { lamb: 2, louisa: 2 }, axes: { guile: 2, loyalty: 1 } },
        { text: "Stand down, then quietly arrange for someone else not to.", results: { taverner: 3, standish: 1 }, axes: { guile: 3 } },
        { text: "Take the gun from the drawer and go.", results: { marcus: 3, shirley: 2 }, axes: { nerve: 2, loyalty: 1 } },
      ],
    },
    {
      where: "The bathroom mirror",
      text: "Your approach to personal grooming?",
      options: [
        { text: "Immaculate, every day.", results: { taverner: 3, sid: 1, moira: 1 }, axes: { squalor: -3, ambition: 1 } },
        { text: "Clean enough to pass.", results: { min: 2, louisa: 1, sid: 2 }, axes: { squalor: -1 } },
        { text: "Optional.", results: { lamb: 2, coe: 1 }, axes: { squalor: 3 } },
        { text: "Hair dyed a new colour whenever the mood strikes.", results: { roddy: 2, shirley: 1 }, axes: { ambition: 1 } },
      ],
    },
    {
      where: "Interview room",
      text: "Your preferred interrogation technique?",
      options: [
        { text: "Silence, until they fill it.", results: { coe: 2, lamb: 1, louisa: 1 }, axes: { guile: 2 } },
        { text: "Charm. Most people want to be liked.", results: { sid: 3, river: 1, min: 1 }, axes: { guile: 1 } },
        { text: "Threats, delivered with a smile.", results: { taverner: 3 }, axes: { guile: 2, loyalty: -1 } },
        { text: "Thump them until they talk.", results: { moody: 3, shirley: 2 }, axes: { nerve: 1, loyalty: -1 } },
      ],
    },
    {
      where: "Personnel file",
      text: "How did you come to join the Service?",
      options: [
        { text: "Family tradition. Your grandfather was a legend.", results: { river: 3 }, axes: { ambition: 2 } },
        { text: "You were recruited after hacking something you shouldn't have.", results: { roddy: 3 }, axes: { guile: 1 } },
        { text: "From the forces, then into the Dogs.", results: { moody: 3, marcus: 1 }, axes: { nerve: 2 } },
        { text: "Rose through the ranks, keeping other people's secrets.", results: { taverner: 2, moira: 3, standish: 1 }, axes: { guile: 1, squalor: -1 } },
      ],
    },
    {
      where: "Your obituary",
      text: "What do you want it to say?",
      options: [
        { text: "Never left a joe behind.", results: { lamb: 3, shirley: 1 }, axes: { loyalty: 3 } },
        { text: "Kept the paperwork straight.", results: { moira: 3, standish: 1 }, axes: { squalor: -2, nerve: -1 } },
        { text: "Was right, and nobody listened.", results: { coe: 1, sid: 2, louisa: 2 }, axes: { guile: 1 } },
        { text: "Too good for that place.", results: { sid: 2, river: 1, marcus: 2, taverner: 1 }, axes: { ambition: 2 } },
      ],
    },
  ],

  results,
};
