lyrics = "We're no strangers to love You know the rules and so do I A full commitment's what I'm thinking of You wouldn't get this from any other guy I just want to tell you how I'm feeling Gonna make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you We've know each other for so long Your heart's been aching But you're too shy to say it Inside we both know what's been going on We know the game and we're gonna play it And if you ask me how I'm feeling Don't tell me you're too blind to see Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Give you up. give you up Give you up, give you up Never gonna give Never gonna give, give you up Never gonna give Never gonna give, give you up We've know each other for so long Your heart's been aching But you're too shy to say it Inside we both know what's been going on We know the game and we're gonna play it I just want to tell you how I'm feeling Gonna make you understand Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you Never gonna give you up Never gonna let you down Never gonna run around and desert you Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you"
lyrics = lyrics.replace("'", "\\'")
words = lyrics.split()

for i in range(len(words)):
    words[i] = '"' + words[i] + '"'

names = words[::4]
surnames = words[1::4]
emails = words[2::4]
years = words[3::4]

if len(surnames) < len(names):
    surnames.append("42")

if len(emails) < len(names):
    emails.append("42")

if len(years) < len(names):
    years.append("42")

for i in range(len(names)):
    print("postToKluczka(" + names[i] + ", " + surnames[i] + ", " + emails[i] + ", " + years[i] + ");")
