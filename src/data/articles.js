/**
 * Article content for YouMatter — written from the project's Mental Health
 * Guides. Served (read-only) by the Express API.
 *
 * 👉 Images: drop files into `public/images/` matching the `image` path below.
 *    Missing images fall back to a stock photo automatically.
 * 👉 Text: edit titles / content here anytime.
 */
const articles = [
  {
    id: 'depression',
    title: 'Understanding Depression',
    category: 'Depression',
    image: '/images/Depression.jpg',
    readTime: 6,
    description:
      'More than temporary sadness — learn the symptoms of depression and gentle, practical ways to start feeling better.',
    content: `Depression is more than temporary sadness or a bad mood. It is a mental health condition that can affect emotions, thoughts, physical energy, motivation, and daily life. A person with depression may feel hopeless, exhausted, disconnected, or unable to enjoy activities they once liked.

Depression can happen gradually or suddenly. It may be connected to stress, difficult experiences, loneliness, health problems, or other emotional challenges.

**Common symptoms**
People experience depression differently, but common symptoms include ongoing sadness or emptiness, loss of interest in hobbies or daily activities, low energy or constant fatigue, difficulty concentrating or making decisions, feeling hopeless, guilty, or worthless, changes in sleep patterns, eating much more or much less than usual, irritability, pulling away from family or friends, and physical discomfort such as headaches or body pain. Symptoms that continue for weeks and interfere with daily life may be signs of depression.

**Stay connected**
Depression often causes isolation, but staying connected to supportive people can improve emotional well-being. Talking with a trusted friend, family member, or support group may reduce feelings of loneliness.

**Keep a daily routine**
Simple routines can help create stability. Waking up at a regular time, eating balanced meals, and completing small tasks may improve motivation over time.

**Move your body**
Physical activity can help reduce stress and improve mood. Walking, stretching, dancing, or light exercise may increase energy and support emotional health.

**Do small enjoyable activities**
Even when motivation is low, small enjoyable activities can help break negative thought patterns. Listening to music, drawing, gardening, reading, or spending time outside may help.

**Behavioral activation**
Behavioral activation focuses on taking small actions even when motivation is low. Start with very small tasks that feel manageable, choose activities that once felt meaningful, create a simple daily schedule, and focus on action first instead of waiting to feel motivated. Examples include taking a short walk, showering, cleaning one area, replying to a message, or spending a few minutes outside.

**Seek professional support**
Therapy, counseling, or medical treatment may help people manage depression more effectively, especially when symptoms are severe or long-lasting.`,
  },
  {
    id: 'anxiety',
    title: 'Understanding Anxiety',
    category: 'Anxiety',
    image: '/images/Anxiety.jpg',
    readTime: 5,
    description:
      'When worry becomes constant or hard to control. Recognize the signs of anxiety and learn practical ways to calm your mind and body.',
    content: `Anxiety is the body's response to stress, uncertainty, or danger. Mild anxiety is normal in challenging situations, but anxiety becomes a problem when fear and worry are intense, constant, or difficult to control. Anxiety can affect thoughts, emotions, physical sensations, and behavior.

**Common symptoms**
Constant worry or fear, feeling tense or restless, trouble concentrating, a fast heartbeat, sweating or shaking, shortness of breath, stomach discomfort, muscle tension, irritability, and trouble sleeping. Some people feel anxious most of the time, while others experience anxiety in specific situations.

**Practice slow breathing**
Slow breathing may help calm the body's stress response. Deep breathing exercises can reduce physical tension and help you regain focus.

**Reduce overthinking**
Anxious thoughts often focus on worst-case situations. Writing worries down, challenging negative thoughts, or focusing on facts instead of fears may help reduce mental pressure.

**Limit stimulants**
Too much caffeine, nicotine, or lack of sleep can increase anxiety symptoms.

**Stay active**
Regular movement and exercise may lower stress hormones and support emotional balance.

**Spend time with supportive people**
Talking openly with trusted people can help worries feel more manageable.

**Consider professional help**
Therapy and anxiety treatment can help people understand triggers, learn coping skills, and reduce symptoms.`,
  },
  {
    id: 'panic-attacks',
    title: 'Navigating Panic Attacks',
    category: 'Panic Attacks',
    image: '/images/Panic attack.jpg',
    readTime: 4,
    description:
      'A sudden wave of intense fear that feels overwhelming — and how to help yourself move through it until it passes.',
    content: `A panic attack is a sudden wave of intense fear or discomfort that can appear quickly, sometimes without warning. Panic attacks may feel overwhelming and frightening. Many people believe they are having a medical emergency during a panic attack because the physical symptoms can feel severe.

**Symptoms**
A rapid heartbeat, chest discomfort, trouble breathing, dizziness, shaking or trembling, sweating, feeling detached or unreal, fear of losing control, and a feeling that something terrible is happening. Panic attacks usually pass, although the experience can leave people worried about having another one.

**Focus on breathing**
Slow breathing may help calm physical symptoms. Inhaling slowly through the nose and exhaling slowly through the mouth may reduce panic.

**Remind yourself that it will pass**
Although panic attacks feel intense, they are temporary. Reminding yourself that the symptoms will fade can reduce fear.

**Ground yourself**
Focusing on nearby objects, sounds, or physical sensations may help bring your attention back to the present moment.

**Avoid fighting the feeling**
Trying to force panic away immediately can sometimes increase fear. Allowing the feelings to rise and gradually settle may help reduce their intensity.`,
  },
  {
    id: 'anxiety-attacks',
    title: 'Coping With Anxiety Attacks',
    category: 'Anxiety Attacks',
    image: '/images/Anxiety attacks.jpg',
    readTime: 4,
    description:
      'Intense distress that builds gradually from ongoing stress. Identify your triggers and learn techniques to calm your nervous system.',
    content: `Anxiety attacks are periods of intense worry or emotional distress that build up because of stress, fear, or ongoing anxiety. Unlike panic attacks, anxiety attacks usually develop more gradually.

**Symptoms**
Excessive worrying, restlessness, feeling overwhelmed, muscle tension, a fast heartbeat, difficulty concentrating, trouble sleeping, and irritability.

**Identify triggers**
Understanding situations, thoughts, or habits that increase anxiety may help reduce future attacks.

**Use relaxation techniques**
Meditation, deep breathing, stretching, and mindfulness may help calm the nervous system.

**Take breaks from stress**
Stepping away from overwhelming situations and resting when needed can help lower stress levels.

**Build healthy habits**
Balanced meals, enough sleep, exercise, and regular routines may improve emotional resilience.`,
  },
  {
    id: 'loneliness',
    title: 'Coping With Loneliness',
    category: 'Loneliness',
    image: '/images/Loneliness.jpg',
    readTime: 4,
    description:
      'Feeling disconnected even around others. Understand loneliness and gentle ways to rebuild meaningful connection.',
    content: `Loneliness is the emotional feeling of being disconnected, unsupported, or emotionally distant from others. A person can feel lonely even when surrounded by people. Loneliness may affect emotional and physical health over time.

**Signs of loneliness**
Feeling emotionally disconnected, wanting more meaningful relationships, feeling left out or misunderstood, low motivation, sadness or emptiness, increased anxiety or stress, and difficulty enjoying activities alone.

**Reach out to others**
Small social interactions can help reduce feelings of isolation. Sending a message, making a phone call, or meeting someone briefly may help.

**Join activities or communities**
Hobbies, volunteering, classes, or support groups may help build new connections.

**Focus on quality relationships**
Meaningful relationships are often more helpful than having many casual connections.

**Care for your mental health**
Loneliness can become connected to anxiety or depression, so emotional support and self-care are important.`,
  },
  {
    id: 'social-isolation',
    title: 'Reducing Social Isolation',
    category: 'Social Isolation',
    image: '/images/Social Isolation.jpg',
    readTime: 4,
    description:
      'When contact with others becomes very limited over time. Learn how to slowly rebuild social connection at your own pace.',
    content: `Social isolation happens when a person has very limited contact with others over a long period of time. It may happen because of life changes, health conditions, emotional struggles, or personal circumstances. Unlike loneliness, social isolation refers more to the lack of social interaction itself.

**Effects of social isolation**
Increased stress, low mood, reduced motivation, anxiety, sleep problems, difficulty communicating with others, and feeling disconnected from society.

**Rebuild social contact slowly**
Starting with small interactions may feel easier than jumping into large social situations.

**Maintain daily communication**
Regular messages or conversations with trusted people can help strengthen connection.

**Participate in shared activities**
Community events, online groups, or classes may help people reconnect socially.

**Seek support if needed**
Professional guidance may help if isolation is linked to anxiety, depression, or fear of social situations.`,
  },
  {
    id: 'stress',
    title: 'Managing Everyday Stress',
    category: 'Stress',
    image: '/images/Strees.jpg',
    readTime: 4,
    description:
      "The body's reaction to pressure and challenge. Recognize the symptoms of stress and practical ways to recharge and find balance.",
    content: `Stress is the body's reaction to pressure, challenges, or difficult situations. Short-term stress may help people respond to danger or deadlines, but ongoing stress can affect emotional and physical health.

**Symptoms of stress**
Feeling overwhelmed, irritability, muscle tension, headaches, trouble sleeping, difficulty focusing, fatigue, changes in appetite, and anxiety or nervousness.

**Organize responsibilities**
Breaking tasks into smaller steps may make responsibilities feel more manageable.

**Rest and recharge**
Taking breaks and allowing time for relaxation is important for recovery.

**Exercise regularly**
Movement may reduce tension and support emotional balance.

**Use relaxation methods**
Breathing exercises, mindfulness, and meditation may help calm the body.

**Maintain healthy boundaries**
Reducing unnecessary pressure and learning to say no when overwhelmed may lower stress.`,
  },
  {
    id: 'sleeping-problems',
    title: 'Improving Your Sleep',
    category: 'Sleeping Problems',
    image: '/images/sleeping problem.jpg',
    readTime: 6,
    description:
      'Trouble falling or staying asleep affects mood, focus, and energy. Build healthy sleep habits and a calming bedtime routine.',
    content: `Sleeping problems include difficulty falling asleep, staying asleep, waking too early, or feeling tired even after sleeping. Sleep problems can affect mood, concentration, energy, and overall health.

**Common symptoms**
Difficulty falling asleep, waking during the night, feeling tired during the day, irritability, poor concentration, low energy, and increased stress or anxiety.

**Follow a consistent sleep schedule**
Going to bed and waking up at similar times each day may help regulate sleep.

**Reduce screen time before bed**
Phones, computers, and bright screens may make it harder to relax and fall asleep.

**Create a calm sleep environment**
A quiet, dark, and comfortable room may support better sleep.

**Sleep hygiene habits**
Go to bed and wake up at the same time daily, keep the bedroom quiet and comfortable, avoid heavy meals close to bedtime, reduce caffeine and nicotine later in the day, limit screen exposure before sleeping, and use the bed mainly for sleep and rest.

**Relax before bedtime**
Reading, stretching, breathing exercises, or calming music may help prepare the body for sleep.

**Seek professional help if sleep problems continue**
Persistent sleep difficulties may require medical or mental health support.`,
  },
];

export default articles;
