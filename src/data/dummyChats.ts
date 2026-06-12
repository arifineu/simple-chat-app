export interface Message {
  id: number
  content: string
  time: Date
  isMine: boolean
}

export interface Chat {
  id: number
  name: string
  avatar: string
  messages: Message[]
}

let _id = 0
function msg(content: string, minsAgo: number, isMine: boolean): Message {
  return { id: _id++, content, time: new Date(Date.now() - minsAgo * 60000), isMine }
}

export const dummyChats: Chat[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    messages: [
      msg('Hey, how are you?', 45, false),
      msg("I'm good! Just finished a meeting.", 40, true),
      msg('Nice! Want to grab coffee later?', 35, false),
      msg('Sure, how about 3pm?', 30, true),
      msg('Perfect, see you then!', 25, false),
    ],
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    messages: [
      msg('Did you see the game last night?', 180, false),
      msg('Yeah, that last quarter was insane!', 175, true),
      msg('Right?! I could not believe that comeback', 170, false),
      msg('We should watch the next one together', 165, true),
    ],
  },
  {
    id: 3,
    name: 'Emma Williams',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    messages: [
      msg('Have you tried that new restaurant on 5th?', 20, false),
      msg('Not yet, is it any good?', 18, true),
      msg('Amazing pasta! You have to go.', 15, false),
      msg("Let's go this weekend then!", 12, true),
      msg("I'll make a reservation.", 10, false),
      msg('Sounds like a plan!', 8, true),
      msg('How about Saturday at 7?', 5, false),
      msg("Saturday works for me, see you there!", 3, true),
      msg("Can't wait!", 2, false),
    ],
  },
  {
    id: 4,
    name: 'James Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    messages: [
      msg('Did you finish the report?', 1500, false),
      msg("Almost done, just reviewing the numbers.", 1490, true),
      msg('Great, the client meeting is tomorrow at 10.', 1485, false),
    ],
  },
  {
    id: 5,
    name: 'Olivia Brown',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    messages: [
      msg('Happy birthday! Hope you have an amazing day!', 60, true),
      msg('Thank you so much! 🎉', 55, false),
      msg('Are you doing anything special?', 50, true),
      msg('Just a small dinner with family tonight.', 45, false),
      msg("That sounds lovely, enjoy every moment!", 40, true),
      msg("I will, thanks again for remembering!", 35, false),
    ],
  },
  {
    id: 6,
    name: 'William Taylor',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    messages: [
      msg('Can you review the PR when you get a chance?', 2880, true),
      msg('Sure, I will take a look this afternoon.', 2860, false),
    ],
  },
  {
    id: 7,
    name: 'Sophia Martinez',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    messages: [
      msg('I found a really good book recommendation.', 90, false),
      msg("Oh what's it about?", 85, true),
      msg("It's about design thinking and innovation.", 80, false),
      msg("Sounds interesting, what's the title?", 75, true),
      msg('"The Design of Everyday Things". A classic!', 70, false),
      msg("I've heard of it! Adding it to my list.", 65, true),
      msg('You will love it, trust me.', 60, false),
    ],
  },
  {
    id: 8,
    name: 'Daniel Kim',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    messages: [
      msg('The deployment went smoothly last night.', 300, true),
      msg('Awesome, no issues at all?', 295, false),
      msg('Just a minor config tweak needed, all good now.', 290, true),
      msg("Great work, I'll update the docs.", 285, false),
    ],
  },
  {
    id: 9,
    name: 'Isabella Davis',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    messages: [
      msg('Are you coming to the team lunch tomorrow?', 1440, false),
      msg("Yes, wouldn't miss it!", 1435, true),
      msg('Italian or Japanese?', 1430, false),
      msg('Japanese for sure!', 1425, true),
      msg('Done, I will book the Japanese place.', 1420, false),
    ],
  },
  {
    id: 10,
    name: 'Alexander Wilson',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    messages: [
      msg('Hey, quick question about the API.', 15, false),
      msg('Sure, what do you need?', 12, true),
      msg('What is the rate limit on the endpoint?', 10, false),
      msg('100 requests per minute per key.', 8, true),
      msg('Got it, thanks!', 6, false),
      msg('No problem!', 5, true),
      msg('Also, is there a sandbox environment?', 4, false),
      msg('Yes, use sandbox.api.example.com', 3, true),
      msg('Perfect, that helps a lot.', 2, false),
      msg('Anytime!', 1, true),
    ],
  },
  {
    id: 11,
    name: 'Mia Thompson',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    messages: [
      msg('Just got back from vacation!', 4320, false),
      msg("How was it? Where did you go?", 4315, true),
      msg('Bali was incredible, the beaches were amazing.', 4310, false),
    ],
  },
  {
    id: 12,
    name: 'Benjamin Garcia',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    messages: [
      msg('Can we reschedule our meeting?', 240, true),
      msg('Sure, when works for you?', 235, false),
      msg('How about Thursday instead?', 230, true),
      msg('Thursday at 2pm works.', 225, false),
      msg('Booked! See you then.', 220, true),
      msg('See you Thursday.', 215, false),
    ],
  },
  {
    id: 13,
    name: 'Charlotte Moore',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    messages: [
      msg('Check your email, I sent the designs.', 70, false),
      msg('Looking at them now, these look great!', 65, true),
      msg('Thanks! Let me know if you want any changes.', 60, false),
      msg('Maybe darken the header color a bit?', 55, true),
      msg('Good call, I will update and resend.', 50, false),
    ],
  },
  {
    id: 14,
    name: 'Ethan Lee',
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    messages: [
      msg('The weather is amazing today!', 1560, false),
      msg("Right? Perfect for a walk.", 1555, true),
      msg("I'm thinking of going to the park.", 1550, false),
      msg('Which park? I might join you.', 1545, true),
      msg('Central Park, near the fountain.', 1540, false),
      msg("I know that spot, I'll be there in 20.", 1535, true),
      msg('See you there!', 1530, false),
      msg('On my way now.', 1525, true),
    ],
  },
  {
    id: 15,
    name: 'Amelia White',
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    messages: [
      msg('Running a bit late, sorry!', 360, false),
      msg('No worries, take your time.', 355, true),
    ],
  },
  {
    id: 16,
    name: 'Lucas Anderson',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    messages: [
      msg('Did you see the announcement?', 50, true),
      msg('Yes! Very exciting news.', 45, false),
      msg("I didn't expect it this quarter.", 40, true),
      msg('Neither did I, but great surprise!', 35, false),
      msg('Drinks to celebrate after work?', 30, true),
    ],
  },
  {
    id: 17,
    name: 'Harper Thomas',
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    messages: [
      msg('I updated the project board, take a look.', 2000, false),
      msg("Looks good, I'll move my tasks to in-progress.", 1995, true),
      msg('Perfect, sprint review is Friday.', 1990, false),
      msg("I'll have everything ready by then.", 1985, true),
      msg("Don't forget to update the docs too.", 1980, false),
      msg('Already on it!', 1975, true),
      msg('You rock!', 1970, false),
    ],
  },
  {
    id: 18,
    name: 'Matthew Jackson',
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    messages: [
      msg('Need help with the migration script?', 95, true),
      msg('That would be great, yes please.', 90, false),
      msg('I will send you what I have so far.', 85, true),
      msg('Thanks, I really appreciate it.', 80, false),
    ],
  },
  {
    id: 19,
    name: 'Ava Robinson',
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    messages: [
      msg('Have a good weekend!', 1600, true),
      msg('You too! Any fun plans?', 1595, false),
      msg('Thinking of going hiking.', 1590, true),
      msg('Nice! Which trail?', 1585, false),
      msg('The one by the lake, wish me luck!', 1580, true),
      msg('Have fun and stay safe!', 1575, false),
    ],
  },
  {
    id: 20,
    name: 'David Harris',
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    messages: [
      msg('The client loved the presentation!', 400, false),
      msg('That is great news!', 395, true),
      msg('They want to move forward with phase 2.', 390, false),
    ],
  },
]
