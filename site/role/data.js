import { insignia, pass } from "../shared/insignia.js";

export default {
  id: "role",
  title: "Where would the Service post you?",
  kicker: "Positive vetting",
  form: "Form PV/12",
  intro: "Twenty questions from the Service's vetting officers. Answer honestly; they will know if you don't. Your posting is decided at the end and is not open to appeal.",
  verdict: "Your posting",
  stampWord: "Posted",
  secondLabel: "If that falls through",
  titleArt: pass,
  art: insignia,
  shareText: (d) => `The Service has posted me to ${d.name}. Where would it post you?`,

  axes: [
    { key: "nerve", label: "Nerve", lo: "Happier behind a desk than on the street", hi: "Calm when the shooting starts" },
    { key: "guile", label: "Guile", lo: "Says what they mean", hi: "Never quite says what they mean" },
    { key: "loyalty", label: "Loyalty", lo: "Loyal to the job, whoever holds it", hi: "Would go back for a colleague" },
    { key: "ambition", label: "Ambition", lo: "Content to be left alone", hi: "Wants a desk with a number on it" },
    { key: "squalor", label: "Squalor", lo: "Clean mug, clear desk", hi: "Has eaten something found in a drawer" },
  ],

  questions: [
    {
      where: "Slough House, 9.04 a.m.",
      text: "You arrive to find your boss asleep at his desk with his shoes off. What do you do?",
      options: [
        { text: "Open a window and get on with your own work.", results: { records: 2, hub: 1 }, axes: { squalor: -2 } },
        { text: "Wake him. There's a lead nobody is chasing.", results: { joe: 2, dogs: 1 }, axes: { nerve: 1, ambition: 1 } },
        { text: "Read the papers on his desk while he snores.", results: { seconddesk: 2, station: 1, chieftain: 1 }, axes: { guile: 2 } },
        { text: "Pull up a chair and finish his whisky.", results: { slough: 2, retired: 1 }, axes: { squalor: 2, loyalty: 1 } },
      ],
    },
    {
      where: "A crowded street",
      text: "A stranger asks you to keep an eye on their bag for five minutes.",
      options: [
        { text: "Of course. You'll still be standing there in an hour if needed.", results: { slough: 1, records: 2 }, axes: { loyalty: 2 } },
        { text: "Agree, then quietly look inside.", results: { dogs: 2, seconddesk: 1 }, axes: { guile: 2, loyalty: -1 } },
        { text: "Ask where they're going, and watch which way they actually go.", results: { joe: 2, hub: 1 }, axes: { nerve: 1, guile: 1 } },
        { text: "Politely decline. You don't take on liabilities for free.", results: { chieftain: 2, firstdesk: 1 }, axes: { loyalty: -2 } },
      ],
    },
    {
      where: "A dull Tuesday afternoon",
      text: "Nothing is happening and nothing will. How do you pass the time?",
      options: [
        { text: "Reorganise something that didn't need reorganising.", results: { records: 1, hub: 1, dogs: 1 }, axes: { squalor: -2 } },
        { text: "Go for a long walk and see who's about.", results: { joe: 2, station: 1 }, axes: { nerve: 1 } },
        { text: "Draft a memo that will matter in six months.", results: { firstdesk: 2, seconddesk: 1 }, axes: { ambition: 2, guile: 1 } },
        { text: "Nap. Somebody will wake you if it's important.", results: { slough: 1, retired: 2 }, axes: { squalor: 2, ambition: -2 } },
      ],
    },
    {
      where: "Regent's Park",
      text: "The screens light up: a surveillance target has dropped off the grid in central London.",
      options: [
        { text: "Already on the cameras, three streets ahead of him.", results: { hub: 2, records: 1 }, axes: { ambition: 1, squalor: -1 } },
        { text: "Grab a coat. Someone has to go and look.", results: { joe: 2, dogs: 1, slough: 1 }, axes: { nerve: 2 } },
        { text: "Find out whose fault it is before anyone else does.", results: { seconddesk: 2, firstdesk: 1 }, axes: { guile: 2, ambition: 2, loyalty: -1 } },
        { text: "Make sure the minutes show you advised caution.", results: { firstdesk: 2, chieftain: 1 }, axes: { guile: 1, nerve: -1 } },
      ],
    },
    {
      where: "A friend's kitchen",
      text: "A close friend tells you a lie. A small one, but you know it's a lie.",
      options: [
        { text: "Say nothing and remember it.", results: { seconddesk: 2, records: 1 }, axes: { guile: 2 } },
        { text: "Call it out there and then. Friends don't do that.", results: { dogs: 2, station: 2 }, axes: { guile: -2 } },
        { text: "Assume they had a reason, and let it go.", results: { slough: 2, retired: 1 }, axes: { loyalty: 2 } },
        { text: "Work out quietly what they're hiding.", results: { joe: 1, hub: 2 }, axes: { guile: 1, nerve: 1 } },
      ],
    },
    {
      where: "Any hour",
      text: "Which hour of the day is yours?",
      options: [
        { text: "Six in the morning, before anyone else is up.", results: { hub: 1, dogs: 2, firstdesk: 1 }, axes: { ambition: 1, squalor: -1 } },
        { text: "Mid-afternoon, with a pot of tea and the crossword.", results: { retired: 2, records: 2 }, axes: { nerve: -1 } },
        { text: "Last orders.", results: { slough: 1, chieftain: 1 }, axes: { squalor: 2 } },
        { text: "Three in the morning, somewhere you shouldn't be.", results: { joe: 2, station: 2 }, axes: { nerve: 2 } },
      ],
    },
    {
      where: "A rail replacement bus",
      text: "An old man across the aisle looks very like someone from a Cold War file.",
      options: [
        { text: "Follow him when he gets off. Quietly.", results: { joe: 2, retired: 2 }, axes: { nerve: 1 } },
        { text: "Photograph him and run the face through every database you can reach.", results: { hub: 2, records: 1 }, axes: { nerve: -1 } },
        { text: "Call it in and let the proper people deal with it.", results: { dogs: 1, firstdesk: 2 }, axes: { loyalty: -1 } },
        { text: "Get off at the next stop. Not your problem, not your pay grade.", results: { slough: 1, chieftain: 1 }, axes: { ambition: -1, nerve: -1, squalor: 1 } },
      ],
    },
    {
      where: "Your house, 2 a.m.",
      text: "There's a fire. Everyone is safe. You have time to grab one thing.",
      options: [
        { text: "The box of old letters nobody else has read.", results: { retired: 2, records: 2 }, axes: { loyalty: 1 } },
        { text: "Your passport. You can start again anywhere.", results: { station: 2, joe: 2 }, axes: { ambition: 1 } },
        { text: "The laptop. Everything worth having is on it.", results: { hub: 2, chieftain: 1 }, axes: { ambition: 1 } },
        { text: "The half-full bottle on the side table.", results: { slough: 1, retired: 1 }, axes: { squalor: 2 } },
      ],
    },
    {
      where: "An office corridor",
      text: "Through a half-open door, you see a document you were plainly not meant to see.",
      options: [
        { text: "Read as much as you can without slowing down.", results: { joe: 1, seconddesk: 2 }, axes: { guile: 2, nerve: 1 } },
        { text: "Keep walking. Not knowing is a kind of protection.", results: { firstdesk: 1, retired: 2 }, axes: { nerve: -1 } },
        { text: "Report the open door. That's a breach.", results: { dogs: 2, records: 1 }, axes: { guile: -1 } },
        { text: "Make a mental note of who left it there.", results: { station: 1, hub: 1, chieftain: 1 }, axes: { guile: 1 } },
      ],
    },
    {
      where: "Westminster",
      text: "A minister asks for a favour that isn't strictly legal.",
      options: [
        { text: "Agree, and keep a recording of the conversation.", results: { seconddesk: 2, chieftain: 1 }, axes: { guile: 2, ambition: 1 } },
        { text: "Decline, in writing, copied to everyone.", results: { firstdesk: 1, records: 2 }, axes: { guile: -2, loyalty: 1 } },
        { text: "Agree, as long as the invoice goes somewhere discreet.", results: { chieftain: 2, joe: 1 }, axes: { loyalty: -2 } },
        { text: "Make sure a journalist hears about it.", results: { station: 2, slough: 1 }, axes: { nerve: 1, loyalty: 1, ambition: -1 } },
      ],
    },
    {
      where: "The post office",
      text: "The queue hasn't moved in ten minutes. What gets to you?",
      options: [
        { text: "Nobody is in charge.", results: { firstdesk: 2, dogs: 1 }, axes: { ambition: 1 } },
        { text: "The man in front has filled in the wrong form, and you could tell him how to fix it.", results: { records: 1, hub: 1, dogs: 1 }, axes: { squalor: -1 } },
        { text: "Nothing. You're watching the other people in the queue.", results: { joe: 1, station: 2, seconddesk: 1 }, axes: { guile: 1, nerve: 1 } },
        { text: "You left ten minutes ago. Whatever it was can wait.", results: { slough: 1, retired: 1, chieftain: 1 }, axes: { ambition: -1 } },
      ],
    },
    {
      where: "A safe house in the suburbs",
      text: "Someone you work with has been taken. You're told to leave it alone.",
      options: [
        { text: "Go anyway, and bring whoever will come.", results: { slough: 2, joe: 1 }, axes: { loyalty: 3, nerve: 1 } },
        { text: "Go, with a proper team and the paperwork signed.", results: { dogs: 2, hub: 1 }, axes: { nerve: 1, ambition: 1 } },
        { text: "Find out what the kidnappers want and arrange a trade.", results: { station: 2, seconddesk: 1 }, axes: { guile: 2 } },
        { text: "Leave it. Those are the rules, and you didn't make them.", results: { firstdesk: 1, chieftain: 2 }, axes: { loyalty: -2, ambition: 1 } },
      ],
    },
    {
      where: "A dinner party",
      text: "You're seated next to a stranger. What do you do?",
      options: [
        { text: "Find out everything about them while telling them nothing.", results: { joe: 1, seconddesk: 1, station: 2 }, axes: { guile: 2 } },
        { text: "Work out within five minutes whether they could be useful.", results: { chieftain: 2, firstdesk: 1 }, axes: { ambition: 2 } },
        { text: "Tell a long story about something that happened in 1987.", results: { retired: 2, slough: 1 }, axes: { squalor: 1 } },
        { text: "Talk to them properly. Most people are interesting.", results: { records: 1, hub: 1, dogs: 1 }, axes: { loyalty: 1, guile: -1 } },
      ],
    },
    {
      where: "Work",
      text: "A new rule is announced. It is plainly unfair to the people below you.",
      options: [
        { text: "Follow it to the letter, and keep a record of the harm it does.", results: { records: 2, dogs: 1 }, axes: { guile: 1 } },
        { text: "Ignore it. Rules like that collapse on their own.", results: { slough: 1, joe: 1 }, axes: { squalor: 1, loyalty: 1 } },
        { text: "Lobby whoever wrote it, quietly, over lunch.", results: { seconddesk: 1, firstdesk: 2 }, axes: { guile: 1, ambition: 1 } },
        { text: "Make enough noise that it gets reversed, whatever it costs you.", results: { station: 2, slough: 1 }, axes: { nerve: 2, ambition: -1 } },
      ],
    },
    {
      where: "Your desk",
      text: "Describe your desk.",
      options: [
        { text: "Clear, labelled, pens in a pot sorted by colour.", results: { records: 2, firstdesk: 1 }, axes: { squalor: -3 } },
        { text: "Three screens and a coffee that went cold at ten.", results: { hub: 2, seconddesk: 1 }, axes: { ambition: 1 } },
        { text: "You don't have a desk. You have a car and a phone.", results: { joe: 2, chieftain: 1 }, axes: { nerve: 1 } },
        { text: "Buried. There may be a sandwich under there from last spring.", results: { slough: 2, retired: 1 }, axes: { squalor: 3 } },
      ],
    },
    {
      where: "The bank",
      text: "An unexpected £10,000 lands in your account. It's genuinely yours.",
      options: [
        { text: "A one-way ticket somewhere warm, and you'll decide the rest there.", results: { station: 2, joe: 1 }, axes: { nerve: 1 } },
        { text: "Invest it. Money is leverage.", results: { chieftain: 2, seconddesk: 1 }, axes: { ambition: 2 } },
        { text: "A new greenhouse.", results: { retired: 2, records: 1 }, axes: { ambition: -2 } },
        { text: "Pay off your colleagues' bar tab, and most of your own.", results: { slough: 1, dogs: 1 }, axes: { loyalty: 2, squalor: 1 } },
      ],
    },
    {
      where: "The archive",
      text: "You find a file that would end a former Director General.",
      options: [
        { text: "Put it back exactly where it was, and log that you saw it.", results: { records: 2, dogs: 1 }, axes: { guile: -1, squalor: -1 } },
        { text: "Copy it and keep the copy somewhere safe. Leverage keeps.", results: { seconddesk: 2, retired: 1 }, axes: { guile: 3, ambition: 1 } },
        { text: "Take it straight to the top floor.", results: { firstdesk: 2, hub: 1 }, axes: { ambition: 1, loyalty: -1 } },
        { text: "Get it to someone who will publish it.", results: { station: 2, slough: 1 }, axes: { nerve: 2, loyalty: 1, ambition: -1 } },
      ],
    },
    {
      where: "A board game",
      text: "Which game do you actually enjoy?",
      options: [
        { text: "Chess. Slowly.", results: { seconddesk: 2, retired: 1 }, axes: { guile: 1, nerve: -1 } },
        { text: "Poker, for money.", results: { chieftain: 2, joe: 1 }, axes: { nerve: 1, guile: 1 } },
        { text: "Something with a lot of rules that you know better than anyone.", results: { records: 1, dogs: 2, firstdesk: 1 }, axes: { squalor: -1 } },
        { text: "Whatever's on the pub quiz machine.", results: { slough: 1, hub: 2 }, axes: { squalor: 1 } },
      ],
    },
    {
      where: "The pub, after work",
      text: "It's your round. What are you drinking?",
      options: [
        { text: "Sparkling water. Somebody has to stay sharp.", results: { hub: 1, joe: 1, dogs: 1 }, axes: { squalor: -1, nerve: 1 } },
        { text: "Whisky, and the bottle stays on the table.", results: { slough: 1, retired: 1 }, axes: { squalor: 2, loyalty: 1 } },
        { text: "Whatever the client is paying for.", results: { chieftain: 2, station: 1 }, axes: { loyalty: -1, ambition: 1 } },
        { text: "You don't drink with colleagues.", results: { firstdesk: 1, seconddesk: 2 }, axes: { loyalty: -2, ambition: 1 } },
      ],
    },
    {
      where: "Exit interview",
      text: "How do you see yourself leaving the Service?",
      options: [
        { text: "From the top floor, with a knighthood and a memoir.", results: { firstdesk: 2, seconddesk: 1 }, axes: { ambition: 3 } },
        { text: "You won't. They'll have to carry you out.", results: { slough: 1, records: 1, hub: 1 }, axes: { loyalty: 2, ambition: -1 } },
        { text: "Quietly, with a pension and a garden.", results: { retired: 2, dogs: 1 }, axes: { ambition: -2, nerve: -1 } },
        { text: "For a private firm that pays four times as much.", results: { chieftain: 2, station: 1 }, axes: { ambition: 1, loyalty: -2 } },
      ],
    },
  ],

  results: {
    slough: {
      name: "Slough House", sub: "A damp office for officers the Service can't quite sack", colour: "#7a5f1c",
      ring: "SLOUGH HOUSE", code: "SLOW", icon: "horseshoe",
      body: [
        "You made a mistake, or somebody made sure it looked like you did. Either way the Park has sent you to Slough House, where the stairs creak, the walls are the colour of old smoke and the work is paperwork designed to make you resign.",
        "Don't. The slow horses are hopeless at being spies right up to the moment it matters, and Jackson Lamb looks after his own. He will deny this loudly, with his feet on the desk.",
      ],
      people: [["Jackson Lamb", "in charge, in the sense that nobody else is"], ["River Cartwright", "still thinks he's going back to the Park"], ["Catherine Standish", "keeps the building running"], ["Louisa Guy", "and Shirley Dander, Roddy Ho and the rest"]],
    },
    hub: {
      name: "Operations", sub: "The screens and swivel chairs at Regent's Park", colour: "#1f6a8f",
      ring: "OPERATIONS", code: "REGENT'S PARK", icon: "screen",
      body: [
        "Glass walls, blue screens and a feed from every camera in London. You run operations from a swivel chair, and when an officer on the ground goes quiet you are the first to know and the last to be blamed.",
        "You are calm, quick and a little too fond of a dashboard. Slough House thinks you're a snob. It's mutual, but you do read their files.",
      ],
      people: [["Diana Taverner", "head of operations for years, and it showed"], ["James Webb", "liked to be seen near the big screens"]],
    },
    dogs: {
      name: "The Dogs", sub: "The Service's internal security", colour: "#3d4a36",
      ring: "THE DOGS", code: "INTERNAL", icon: "collar",
      body: [
        "You police the police. When an officer goes off-book, leaks or simply annoys First Desk, you are the one who arrives at their door with a team dressed in black.",
        "Physical, procedural and very hard to embarrass. Nobody at the Park asks you to drinks, which suits you.",
      ],
      people: [["Nick Duffy", "ran them, and did Taverner's dirty work"], ["Emma Flyte", "his successor, and a straighter one"]],
    },
    joe: {
      name: "A joe in the field", sub: "Field officer, usually under someone else's name", colour: "#5a4632",
      ring: "FIELD OFFICER", code: "JOE", icon: "binoculars",
      body: [
        "You work on the street, under a name that isn't yours, with a phone you'll throw in a river by the weekend. Your best days are the ones nobody will ever hear about.",
        "You have good instincts and poor sleep. When it goes wrong, the Park's first question will be whether it can deny you, so learn who your friends are.",
      ],
      people: [["River Cartwright", "went to France as a dead man's double"], ["Sam Chapman", "did David Cartwright's work abroad, years ago"]],
    },
    firstdesk: {
      name: "First Desk", sub: "Director General of the Service", colour: "#1f2f4f",
      ring: "FIRST DESK", code: "DIRECTOR GENERAL", icon: "one",
      body: [
        "The top floor. You answer to ministers and committees, and everyone below you is quietly drafting the memo that will replace you.",
        "You are cool, careful and political to the bone. The job is less about catching spies than about surviving your own deputy, and few people manage it for long.",
      ],
      people: [["Ingrid Tearney", "until the Footprint file came out"], ["Claude Whelan", "until Lamb produced a tape"], ["Diana Taverner", "at last, by the end of season 5"]],
    },
    seconddesk: {
      name: "Second Desk", sub: "Deputy Director General", colour: "#2f4f6f",
      ring: "SECOND DESK", code: "DEPUTY", icon: "two",
      body: [
        "Close enough to the top to see the view, close enough to the operations to have your fingerprints on all of them, and careful enough that nobody can prove it.",
        "You keep recordings, owe nobody and are owed by everybody. Your loyalty is to the Service, by which you mean yourself.",
      ],
      people: [["Diana Taverner", "held it for four seasons and used every minute"]],
    },
    records: {
      name: "Records", sub: "Keeper of the Service's files", colour: "#5b4a2a",
      ring: "RECORDS", code: "REGISTRY", icon: "cabinet",
      body: [
        "Every operation, every mistake and every name the Service would rather forget passes through your hands eventually. You know where it is all filed, and you decide who gets to see it.",
        "Meticulous, unhurried and very difficult to bully. Slough House officers who try their luck at your counter tend to leave empty-handed.",
      ],
      people: [["Molly Doran", "knows where every secret in the building is kept"], ["Moira Tregorian", "one of the Queens of the Database, until she was banished"]],
    },
    retired: {
      name: "Retired", sub: "An old hand, officially out of the game", colour: "#5b5348",
      ring: "RETIRED", code: "PENSIONED", icon: "chair",
      body: [
        "You did your time in the Cold War, and you have the pension, the garden and the nightmares to show for it. Officially you are out of the game.",
        "Unofficially you still check the street before you open the front door, and the past has a habit of coming back to find you.",
      ],
      people: [["David Cartwright", "the O.B., with more buried than anyone knew"], ["Dickie Bough", "who recognised a face on a bus"], ["Sam Chapman", "who kept an old secret to the end"]],
    },
    chieftain: {
      name: "Chieftain", sub: "Private security contractor", colour: "#6b2f2f",
      ring: "CHIEFTAIN", code: "CONTRACTOR", icon: "pound",
      body: [
        "Why serve your country for a civil service salary when you could do roughly the same work for a firm with friends in government? Chieftain tests the Service's security and bills it for the privilege.",
        "You are pragmatic, well paid and not burdened by loyalty. When a job goes wrong, the contract says it was somebody else's fault.",
      ],
      people: [["Sly Monteith", "runs it, and went to school with the Home Secretary"], ["James Webb", "took their money on the side"], ["Sean Donovan", "worked their kidnapping job, then went his own way"]],
    },
    station: {
      name: "Overseas station", sub: "Officer at an embassy abroad", colour: "#2f5a4f",
      ring: "OVERSEAS STATION", code: "ABROAD", icon: "globe",
      body: [
        "A long way from Regent's Park, in an embassy where everyone knows which second secretary is really a spy. The work is slow until suddenly it isn't.",
        "You have a conscience and the nerve to act on it, which is admirable and dangerous in equal measure. Be careful whom you trust with what you find.",
      ],
      people: [["Alison Dunn", "Istanbul, where she found the Footprint file"], ["Sean Donovan", "ran embassy security, then went looking for her killers"]],
    },
  },
};
