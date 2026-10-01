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
      where: "A crowded street",
      text: "A stranger asks you to watch their bag for five minutes.",
      options: [
        { text: "Of course, and nobody will get near it.", results: { min: 2, standish: 1 }, axes: { loyalty: 2 } },
        { text: "Agree, then have a quiet look inside.", results: { sid: 1, taverner: 1, moody: 2 }, axes: { guile: 2 } },
        { text: "Say no and keep walking. Unattended bags are someone else's problem.", results: { coe: 1, lamb: 1, louisa: 2 }, axes: { loyalty: -1 } },
        { text: "Agree, and photograph them in case they don't come back.", results: { roddy: 2, moira: 1 }, axes: { nerve: -1 } },
      ],
    },
    {
      where: "Any hour",
      text: "Which hour of the day is yours?",
      options: [
        { text: "Six in the morning, already out running.", results: { river: 2, marcus: 1 }, axes: { ambition: 1, squalor: -1 } },
        { text: "Three in the afternoon, with tea and a tidy in-tray.", results: { standish: 2, moira: 2 }, axes: { squalor: -2, nerve: -1 } },
        { text: "Midnight, curtains shut, screens on.", results: { coe: 2, roddy: 1 }, axes: { squalor: 1 } },
        { text: "Whenever the pub opens.", results: { lamb: 1, shirley: 1, min: 2 }, axes: { squalor: 2, loyalty: 1 } },
      ],
    },
    {
      where: "A friend's kitchen",
      text: "A close friend tells you a small lie, and you know it.",
      options: [
        { text: "Say nothing, and remember it for later.", results: { taverner: 2, sid: 1 }, axes: { guile: 2 } },
        { text: "Call it out there and then.", results: { shirley: 2, river: 1 }, axes: { guile: -2, nerve: 1 } },
        { text: "Let it go. They must have had a reason.", results: { min: 2, standish: 1 }, axes: { loyalty: 2 } },
        { text: "Everyone lies. You'd just like to know what about.", results: { lamb: 1, coe: 1, louisa: 2 }, axes: { guile: 1 } },
      ],
    },
    {
      where: "The office kitchen",
      text: "The kettle has broken.",
      options: [
        { text: "Get it repaired, label it, and draw up a rota.", results: { moira: 1, standish: 2 }, axes: { squalor: -3 } },
        { text: "Get into the procurement system and order a much better one.", results: { roddy: 2, sid: 1 }, axes: { guile: 1, ambition: 1 } },
        { text: "Hit it until it works.", results: { shirley: 2, moody: 1 }, axes: { nerve: 1, squalor: 1 } },
        { text: "Drink the whisky neat instead.", results: { lamb: 2, min: 1 }, axes: { squalor: 3 } },
      ],
    },
    {
      where: "Your flat, 2 a.m.",
      text: "There's a fire. Everyone is safe. You have time to grab one thing.",
      options: [
        { text: "A photograph of someone you lost.", results: { louisa: 2, standish: 1 }, axes: { loyalty: 2 } },
        { text: "The laptop. Your whole life is on it.", results: { roddy: 2, taverner: 1 }, axes: { ambition: 1 } },
        { text: "Nothing. You're already back inside checking the neighbours.", results: { river: 2, marcus: 1 }, axes: { nerve: 2, loyalty: 1 } },
        { text: "The takeaway that has just been delivered.", results: { lamb: 1, roddy: 1, shirley: 2 }, axes: { squalor: 2 } },
      ],
    },
    {
      where: "Work",
      text: "A new rule is announced. It is plainly unfair.",
      options: [
        { text: "Follow it to the letter, and keep a record of the harm it does.", results: { moira: 2, standish: 1 }, axes: { guile: 1, squalor: -1 } },
        { text: "Ignore it. It won't survive the month.", results: { lamb: 1, shirley: 1, marcus: 1 }, axes: { squalor: 1 } },
        { text: "Have a word with whoever wrote it, and make it your rule instead.", results: { taverner: 2, sid: 1 }, axes: { guile: 2, ambition: 2 } },
        { text: "Resent it, and add it to the list.", results: { moody: 2, coe: 1 }, axes: { loyalty: -1 } },
      ],
    },
    {
      where: "Slough House",
      text: "A colleague is in danger, and you've been told to stand down.",
      options: [
        { text: "You're already in the car.", results: { river: 2, shirley: 1 }, axes: { nerve: 2, loyalty: 2 } },
        { text: "Work out who gave the order, and why, before you move.", results: { lamb: 1, louisa: 2 }, axes: { guile: 2, loyalty: 1 } },
        { text: "Stand down, then quietly arrange for someone else not to.", results: { taverner: 2, standish: 1 }, axes: { guile: 3 } },
        { text: "Take the gun from the drawer and go.", results: { marcus: 2, coe: 1 }, axes: { nerve: 2, loyalty: 1 } },
      ],
    },
    {
      where: "A dinner party",
      text: "You're seated next to a stranger.",
      options: [
        { text: "Charm them. It costs nothing.", results: { sid: 1, min: 2 }, axes: { guile: 1 } },
        { text: "Tell them about yourself. They'll be interested.", results: { roddy: 2, river: 1 }, axes: { ambition: 1, guile: -1 } },
        { text: "Listen, and let them fill the silence.", results: { coe: 2, louisa: 1 }, axes: { guile: 2 } },
        { text: "Find out what they can do for you.", results: { taverner: 2, moody: 1 }, axes: { ambition: 2, loyalty: -1 } },
      ],
    },
    {
      where: "The post office",
      text: "The queue hasn't moved in ten minutes. What gets to you?",
      options: [
        { text: "People who haven't filled in the form properly.", results: { moira: 2, standish: 1 }, axes: { squalor: -1 } },
        { text: "You don't queue. You find another way in.", results: { lamb: 1, taverner: 1, roddy: 1 }, axes: { guile: 1 } },
        { text: "The man in front is rude to the cashier, and you're about to say something.", results: { shirley: 2, min: 1 }, axes: { nerve: 1, loyalty: 1 } },
        { text: "Nothing. You've been counting the exits.", results: { coe: 1, sid: 1, marcus: 1 }, axes: { nerve: 1 } },
      ],
    },
    {
      where: "Interview room",
      text: "Your preferred way of getting the truth out of someone?",
      options: [
        { text: "Silence, until they fill it.", results: { coe: 2, lamb: 1 }, axes: { guile: 2 } },
        { text: "Charm. Most people want to be liked.", results: { sid: 2, min: 1 }, axes: { guile: 1 } },
        { text: "Threats, delivered with a smile.", results: { taverner: 1, louisa: 2 }, axes: { guile: 2, loyalty: -1 } },
        { text: "Thump them until they talk.", results: { moody: 2, shirley: 1 }, axes: { nerve: 1, loyalty: -1 } },
      ],
    },
    {
      where: "The bank",
      text: "An unexpected £10,000 lands in your account.",
      options: [
        { text: "A long weekend somewhere with a casino.", results: { marcus: 2, roddy: 1 }, axes: { nerve: 1 } },
        { text: "Into savings, properly, with a spreadsheet.", results: { moira: 1, standish: 2 }, axes: { squalor: -1, nerve: -1 } },
        { text: "Pay for something a friend needs and won't ask for.", results: { min: 2, louisa: 1 }, axes: { loyalty: 2 } },
        { text: "Tell nobody. It might be useful later.", results: { taverner: 1, sid: 1, lamb: 1 }, axes: { guile: 2 } },
      ],
    },
    {
      where: "Annual leave",
      text: "How do you spend a week off?",
      options: [
        { text: "A city break with a museum itinerary.", results: { moira: 1, standish: 1, sid: 2 }, axes: { squalor: -1 } },
        { text: "You don't take leave. Who knows what they'd do while you were gone.", results: { river: 1, coe: 1, moody: 2 }, axes: { ambition: 1 } },
        { text: "Somewhere warm with a casino.", results: { marcus: 2, roddy: 1 }, axes: { nerve: 1 } },
        { text: "On the sofa, curtains drawn, phone off.", results: { lamb: 1, coe: 1, shirley: 2 }, axes: { squalor: 2, ambition: -1 } },
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
      where: "A doorway",
      text: "What do you notice first when you walk into a room?",
      options: [
        { text: "Who is in charge.", results: { taverner: 2, river: 1 }, axes: { ambition: 1 } },
        { text: "The exits.", results: { coe: 1, marcus: 1, louisa: 1 }, axes: { nerve: 1 } },
        { text: "The mess.", results: { standish: 1, moira: 2 }, axes: { squalor: -2 } },
        { text: "Whether there's any food.", results: { lamb: 1, roddy: 1, min: 1 }, axes: { squalor: 1 } },
      ],
    },
    {
      where: "Your obituary",
      text: "What do you want it to say?",
      options: [
        { text: "Never left a joe behind.", results: { lamb: 2, louisa: 1 }, axes: { loyalty: 3 } },
        { text: "Kept the paperwork straight.", results: { moira: 2, standish: 1 }, axes: { squalor: -2, nerve: -1 } },
        { text: "Was right, and nobody listened.", results: { coe: 1, sid: 2, moody: 1 }, axes: { guile: 1 } },
        { text: "Too good for that place.", results: { sid: 1, river: 1, marcus: 1 }, axes: { ambition: 2 } },
      ],
    },
  ],

  results,
};
