/* Real client testimonials only — never fabricate names, credits or quotes.
   All names are confirmed by Tommera.

   HOME_TESTIMONIALS is the shorter set shown on the home page; TESTIMONIALS is
   the full wall shown on the Results page. New client submissions are reviewed
   by Tommera and added here once approved (see TestimonialForm). */

const FEATURED = [
  {
    name: 'Kim',
    quote: "The best PT ever!! Thank you for getting me across the finish line of my first half marathon and rehabbing me through injury. I'm very excited for this next phase of our training and the PBs I'll collect along the way!",
  },
  {
    name: 'Ayshu',
    quote: "Hi Tommera, I've really appreciated all of our sessions. I finally feel happy and see progress. I owe it all to you, thank you so much!",
  },
  {
    name: 'Shannon',
    quote: "I just wanted to say a huge thank you for everything you've done for me. I wanted you to know how much I appreciate all your support. Thank you for pushing me, believing in me, and helping me work towards my goals. You've helped me improve my strength, speed, endurance, balance, and overall fitness. I also really appreciated how you took the time to understand my strengths and weaknesses and tailored each session to help me improve.",
  },
]

const MORE = [
  {
    name: 'Tianna',
    quote: "Honestly Tommera, having you as my personal trainer has been such a beautiful experience. You create such a supportive and motivating environment that makes learning feel easy. Your clear guidance has helped me improve my form, build confidence, and see real progress in my strength and control. You encourage me in a way that keeps me moving forward and I'm excited to continue working with you to see how far I can go.",
  },
  {
    name: 'Gabi',
    quote: "I have really enjoyed my sessions with you. You listened very carefully to my issues that were holding me back from exercising and worked around them. You've been very patient and supportive in my progress. Over the last 3 months I have noticed improvements in my body and my abilities, which has proven to me that I'm on a path to reaching my goal of being in better shape and fitness.",
  },
  {
    name: 'Amira',
    quote: "My first time having a personal trainer. It was informative and also fun. Cracked down on what I wanted and needed and the plan was made! I learnt so much and gained valuable experience by asking questions and being told information I didn't know about. Friendly and so kind! We got along so well it's like working out with your friend. Overall I got better with my form and did different exercises that I didn't know I needed. She answered any questions I had about the workouts and offered to adjust anything based off my needs. Just incredible!!",
  },
]

/* Home shows the featured few; Results shows everyone. */
export const HOME_TESTIMONIALS = FEATURED
export const TESTIMONIALS = [...FEATURED, ...MORE]
