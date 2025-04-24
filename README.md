**Project Title**: CampusVerse 

**Objective**: 
To develop a social networking website exclusively for students within a particular university or 
college, facilitating meaningful connections, collaboration, and assistance. 

**Abstract**: 
The major problems addressed will be: 
* **Finding Friends**: Many students struggle to meet like-minded peers, especially during the 
early days, leading to isolation. 

* **Same-minded Friends**: Students often wish to connect with others who share their interests 
(e.g., anime lovers, programming enthusiasts, gamers). 
* **Help**: Students often need help with assignments, notes, or other tasks and can seek 
assistance from others. 
* **Recreation**: Students often suffer from boredom on campus, so integrating in-built games 
with leaderboards encourages engagement and fun during leisure time. 
* **News**: A section where students can stay updated with campus events, announcements, and 
activities, reducing reliance on scattered sources of information. 
* **Microblogging**: A dedicated microblogging space exclusive to students of an institution, 
allowing them to share thoughts, updates, and opinion. 
Key features include an Aura reputation system, which reflects a student’s respect and engagement 
within the community. Aura can be gained automatically by helping someone or through other 
positive acts in the campus or in the website. 

**Technical Aspect**: 
1. **System Architecture Components** 

**User Interface**: 
* Profile creation with profile and cover photos, bio, hobbies, likes, and dislikes. 

* Authentication managed through pre-generated student accounts. The admin team will 
create accounts for all students using their roll numbers and assign temporary passwords. 
Students must change their password upon first login to ensure security. This prevents fake 
accounts and ensures only verified students can join. 
* Search feature to find students based on interests. 
* HelpSquare: Posts for offering/requesting assistance. 
* Aura-based reputation display. 
* Chat Feature: Allows socialization among students. 
* In-built games: Provides recreation, with leaderboards displaying the top scorers each week. 
* Events and News Section: Displays various happenings in the college. Students can register 
through the website itself, reducing fake registrations and easing the organizers' workload. 
* Microblogging Section: A microblogging platform for students to share their thoughts, 
opinions, and suggestions in a positive and engaging manner. 

**Aura System** 
* Aura starts at a base value of 100. 

* Ways to Earn Aura: 
* Automatically awarded upon helping someone. 
* Ranking in the top 10 of weekly game leaderboards. 
* Receiving more than 500 likes for a blog. 
* Winning college events via a code-based reward system, where winners receive a 
unique one-time usable code to claim extra Aura. 

2. **Technology/Tools** 
* Frontend: React.js 

* Backend: Node.js with Express.js 
* Database: MySQL or PostgreSQL 
* Security: JWT-based authentication and role-based access control 

3. **Working Mechanism** 
* Students log in using their roll number and a temporary password provided by the admin. 
They must change their password upon first login and set up their profile. 

* They can browse batchmates’ profiles and search for like-minded peers based on shared 
interests. 
* Students can post barter-based help requests (e.g., “Will write your notes for a burger”) on 
HelpSquare. 
* Aura impacts visibility and credibility, encouraging meaningful contributions. 
* Students can chat with their new friends before actually meeting in real life. 
* Students can play various games during their leisure time and try to appear in the weekly 
leaderboards. 
* Event organizers can post event details, and interested students can register directly through 
the website, eliminating fake registrations and reducing organizers' workload. 
* Students may share their views on various aspects of the college, suggesting improvements 
or proposing new initiatives to enhance the institution's reputation. 

**Innovative Aspect**: 
* Fair & Dynamic Aura System: Unlike traditional “likes” or “followers,” Aura is earned through
real-world actions, such as helping others. 

* Closed Network: Only students from the same college/university can join, ensuring a safe 
and relevant social space. 
* Gamification Elements: Integration of in-app games with leaderboards that reward students 
with visibility and Aura, enhancing engagement. 
* Enhanced Campus Interaction: The app provides a platform for students to interact beyond 
academics, from finding friends to participating in campus-wide discussions and events. 
* Efficient Help System: Encourages real-world interaction and provides quick assistance to 
students in need. 
* Microblogging Platform: The microblogging section offers a controlled space for students to 
share their thoughts and ideas. 

**Practical Applications**: 
* Find Like-Minded Friends: Connect with students who share interests and hobbies.

* Request & Offer Help: Easily find help for assignments, projects, or any other kind of 
assistance. 
* Encourage Campus Engagement: Event winners can be rewarded with increased Aura, 
boosting their recognition. 
* Strengthen Student Community: Promotes interaction and collaboration among students. 
* Stay Informed: Students can receive real-time updates about campus news, announcements, 
and upcoming events. 
* Promote Innovation & Discussion: The microblogging section enables students to express 
opinions, share insights, and propose initiatives in a constructive and meaningful way.