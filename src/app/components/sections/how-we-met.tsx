
// ─── Story ───────────────────────────────────────────────────────────────────
 import { COLORS, styles } from "../utils/consts";
export function Story() {
    const stories = [
      {
        who: "From the bride",
        name: "Chinwendu's POV",
        text: [
          "It might sound a little funny, but I genuinely cannot remember how Eguakhide and I started talking. I mean, of course we met each other in church and I remember the first time I ever spoke to him, circa 2020, but after that day we never spoke to each other until 2022.",
          "Actually, the first time I ever heard about him was in 2013 😂 yes. I had a best friend in secondary school and she used to tell me all about her cousins scattered all over the world, he was one of them. I had no idea that I would ever meet any one of them. What's interesting is that, even back then I silently wished to be married to one her cousins, just because I wanted us to remain best friend forever 😂 I even wrote down the names of my Edo children, but I digress.",
          "The first time I met Eguakhide was on a warm Sunday morning in 2019. I came to church very early that morning because I needed to see Reverend, his niece (my secondary school best friend) had given me a message for him and I was so excited to pass it across. Without thinking twice, the moment I got to church, I stormed off straight away towards the direction of his office and I would've gone straight there until this handsome looking man stopped me midway.",
          "Yes he was good looking, but I was too focused to even notice. I was even a bit upset  because I wasn't expecting anyone to stop me, I had no idea that there were protocols to follow before seeing reverend.",
          "I was barely listening to anything he was saying because I believed once he knew my intentions for seeing reverend he would let me go to his office, I mean, this is family! I brought word from his niece.",
          "Little did I know that he was reverend's own son. Anyway, that back and forth happened and he eventually let me into his office, but after that day I never spoke to him again. To me he was the rude pastor who didn't want me to see Reverend. 😂",
          "Fast forward to 2022, at this time I had become a more committed member of the church. This is where it gets tricky because I cannot remember how exactly we started talking again. All I can remember is that on a random Wednesday, I was studying the Bible and Romans 8:11 jumped at me. I had so much revelation from just that verse and being the ready writer that I am, I wrote an entire excerpt. I couldn't think of any other pastor to share what I had just learnt with, so I sent it to him. I believe that was what sparked the friendship between us. We would share scriptures with each other every single day, it was one of the most exciting periods of my life.",
          "Then on one fateful morning, I reached out to him because I wasn't understanding a portion of the book of Ephesians. He sent a text explaining the scripture and I thanked him. Less than ten minutes after, he sent a voice note further explaining the scripture 🌚 in my head I was like “It's ok nau, I understand it now”. Before I could even finish listening to the voice note, he called me, and that was the first time he would ever call me. Let's just say that the phone call had absolutely nothing to do with scripture, and the rest they say is history. ❤️"
        ],
      },
      {
        who: "From the groom",
        name: "Eguakhide's POV",
        text: [
          "Meeting Chinwendu wasn't as typical as most love stories, I believe our relationship was ordained and planned by God himself because it has him written all over it.",
          "We met on a random Sunday morning in church at Enugu.",
          "Apparently she wanted to see my dad and just waltz her way into the office but I wasn't having it 🤣. Not because of any prejudice but because her face was unfamiliar & I was being protective of my dad. But when she mentioned that she went to the same secondary school with my cousin, and had a message for my dad, I went soft and granted her access.",
          "After that initial contact we didn't really talk much in church, I just knew her as that lady that knows my cousin, and that was it. lol, Ngl, I noticed her a lot. I watched her evolve spiritually and she seemed to look more beautiful with each meeting, but we never really talked except from exchanging little pleasantries here and there.",
          "Then in 2022, a random number would message me and briefly introduce herself (although I already had her number saved 😜). She started asking me some deep questions about the scriptures and tbh, I was intrigued that such a young lady who could be anything was this interested in God's word. Trust me, I went all in and explained every question in great detail. This exchange went on for several months and we kinda just bonded over scriptures & I was going through a rough patch at the time, iykyk, so it was a much needed distraction.",
          "Now, I remember praying one day on my bed. Lying down on the left side of my bed with my face upwards, deeply puzzled about my love life and asking the Lord what next or rather who I was to date, because I wasn't making any headway in my love life. And I heard God clearly tell me, “Why do you think I brought Chinwendu into your life?”",
          "Ah, this is so unlike me because I am not the kind of person to impose “the Lord said” on anyone. So, I just went about my life and let things play out naturally and never told her what I heard. We kept on texting, then sending Vns, and then talking briefly to having very long conversations, majorly about the Bible tbh. But I don't know how exactly it happened, one week we were talking about Ephesians, the next week I was professing my love to her. And here we are, planning our wedding after 3-plus years. God is a master strategist after all!"        
        ],
      },
    ];
   
    return (
      <section id="story" style={{ background: COLORS.cream, padding: "6rem 2rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ ...styles.eyebrow, textAlign: "center" }}>How we met</p>
          {/* <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Two hearts, one story</h2> */}
          <h2 className="font-bold" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: "#1A4731", textAlign: "center" }}>
            Two hearts, One story
          </h2>
          <div style={styles.goldRule} />
   
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "4rem" }}>
            {stories.map((s) => (
              <div key={s.who} style={{ position: "relative" }}>
                <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: `linear-gradient(to bottom,${COLORS.gold},transparent)` }} />
                <div style={{ paddingLeft: "1.5rem" }}>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.gold, marginBottom: "0.75rem", fontWeight: 500 }}>{s.who}</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.8rem", fontStyle: "italic", color: COLORS.deep, marginBottom: "1.2rem", lineHeight: 1 }}>{s.name}</h3>
                  {s.text.map((p, i) => (
                    <p key={i} style={{ color: COLORS.muted, fontSize: "0.95rem", lineHeight: 1.9, marginTop: i > 0 ? "1rem" : 0 }}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }