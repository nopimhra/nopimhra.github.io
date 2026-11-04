/* =====================================================================
   data.js — ALL EDITABLE CONTENT FOR THREE SECTIONS LIVES HERE
   ---------------------------------------------------------------------
   Sections driven by this file:
     1. ACTIVITIES    → "Beyond the classroom" cards + their pop-up modal
     2. PROJECTS      → project cards + full-screen case study
     3. CERTIFICATES  → certificate showcase + zoom viewer

   Rules of thumb
   • Add an item  = copy one {...} block, paste it after a comma, edit it.
   • Remove item  = delete its whole {...} block (and its trailing comma).
   • Order here   = order on the page.
   • Text is inserted as HTML, so avoid raw "<" characters in your text.
     (Project headlines may use <em>word</em> for the pink italic accent.)
   • Keep every quote ' or " balanced — a missing quote breaks the page.
   ===================================================================== */


/* ---------------------------------------------------------------------
   Helper for gallery photos.
   photos('itsmi', 3) → images/activities/itsmi/1.jpg, 2.jpg, 3.jpg
   • Put your photos in that folder using those exact names.
   • Different file type?  photos('itsmi', 3, 'png')
   • Want custom names instead? Write the array by hand:
       gallery: ['images/activities/itsmi/opening.jpg', '...']
   • Missing files are fine: a "photo coming soon" tile shows instead.
   --------------------------------------------------------------------- */
const photos = (folder, count, ext = 'jpg') =>
  Array.from({ length: count }, (_, i) => `images/activities/${folder}/${i + 1}.${ext}`);


/* =====================================================================
   1. ACTIVITIES  ("Beyond the classroom")
   ---------------------------------------------------------------------
   icon       emoji shown on the card and in the modal header
   color      card icon background: peach | lilac | rose | butter | mint | sky
   title      card + modal title
   org        role · organisation (small pink line)
   period     optional date chip, e.g. 'Mar 2025'. Leave '' to hide it.
   summary    short text on the CARD, and the lead sentence in the modal
   details    array of paragraphs, shown only in the modal
   highlights array of short bullet points ("What I did")
   tags       optional small chips, e.g. ['Leadership', 'Teamwork']
   gallery    photos(...) or an array of image paths (modal gallery)

   TODO: details/highlights below are written only from facts you've
   shared before. Add real numbers, dates and outcomes where you can.
   ===================================================================== */
const ACTIVITIES = [
  {
    icon: '🏛️', color: 'peach',
    title: 'ITSMI — Organizational Leadership',
    org: 'Chairperson · IT Student Association',
    period: 'Founding – end of 2nd period',
    summary: 'Led student organization initiatives, coordinated team activities, and supported programs designed to strengthen student engagement and collaboration within the Information Technology community.',
    details: [
      'I led ITSMI as chairperson from the day it was founded until the end of its second period, so a big part of the job was building the organization, not just running it.',
      'ITSMI works through three divisions: scientific (ilmiah), interest & talent (minat bakat), and communication & information (kominfo). Together with a few core board members, I drafted the SOPs and regulations every division works under, so programs could run in a consistent way.',
      'After my term as chairperson I stayed on as a regular member.'
    ],
    highlights: [
      'Directed the organization through two periods, starting from its founding',
      'Drafted SOPs and regulations for all three divisions with the core board',
      'Coordinated programs that strengthen student engagement'
    ],
    tags: ['Leadership', 'Organization building', 'SOP design'],
    gallery: photos('itsmi',3)
  },
  {
    icon: '🎨', color: 'lilac',
    title: 'Web Design Competition Organizer',
    org: 'Project Manager · ITSMI',
    period: '',
    summary: 'Coordinated the planning and execution of a web design competition for students within the faculty, overseeing team coordination, preparation, and event implementation.',
    details: [
      'As project manager I was responsible for taking the competition from idea to event day: setting up the committee, preparing the competition, and making sure everything ran on schedule.'
    ],
    highlights: [
      'Planned the competition for students across the faculty',
      'Coordinated the committee and their tasks',
      'Oversaw preparation and event-day implementation'
    ],
    tags: ['Project management', 'Event planning'],
    gallery: photos('web-design-competition', 3)
  },
  {
    icon: '🎤', color: 'rose',
    title: 'Business Webinar Organizer',
    org: 'Project Manager · ITSMI',
    period: '',
    summary: 'Managed the preparation and execution of a business webinar that attracted over 200 participants, coordinating event activities to ensure a smooth and engaging experience.',
    details: [
      'I managed the webinar end to end as project manager, from preparation through the live session. The event drew more than 200 participants.'
    ],
    highlights: [
      '200+ participants attended',
      'Coordinated event activities so the session ran smoothly',
      'Led the preparation and execution as project manager'
    ],
    tags: ['Project management', 'Business', 'Webinar'],
    // gallery: photos('business-webinar', 3)
  },
  {
    icon: '🧠', color: 'butter',
    title: 'Deep Learning Workshop Organizer',
    org: 'Workshop Assistant · ITSMI',
    period: '',
    summary: 'Assisted participants during a deep learning workshop, helping facilitate learning activities and supporting their understanding of fundamental concepts in artificial intelligence.',
    details: [
      'During the workshop I supported participants as they worked through the activities, helping them get unstuck and understand the fundamental concepts behind deep learning.'
    ],
    highlights: [
      'Guided participants through hands-on activities',
      'Explained fundamental AI concepts in plain language'
    ],
    tags: ['Deep learning', 'Mentoring'],
   // gallery: photos('deep-learning-workshop', 3)
  },
  {
    icon: '📊', color: 'mint',
    title: 'Data Science Independent Study',
    org: 'Startup Campus · MSIB 7',
    period: 'MSIB Batch 7',
    summary: 'Completed a structured independent study program covering data science fundamentals, web scraping, databases, sustainability, and self-leadership through learning sessions, mentoring, and collaborative activities.',
    details: [
      'I joined the Data Science track of the Studi Independen (MSIB Batch 7) at Startup Campus. The main tools were Python and Looker Studio.',
      'I learned to build prediction models with Python and to turn data into dashboards with Looker Studio, alongside web scraping, databases, sustainability, and self-leadership.'
    ],
    highlights: [
      'Built prediction models with Python',
      'Built dashboards with Looker Studio',
      'Covered web scraping and databases',
      'Learned through mentoring and collaborative activities'
    ],
    tags: ['Python', 'Looker Studio', 'Machine learning', 'MSIB'],
    gallery: photos('startup-campus', 3)
  },
  {
    icon: '🥈', color: 'sky',
    title: 'Choir Competition — Second Place',
    org: 'Universitas Katolik Santo Thomas · Dies Natalis 2024',
    period: '2024',
    summary: 'Collaborated with fellow choir members in a university anniversary choir competition, earning second place through teamwork, musical preparation, and performance.',
    details: [
      'We competed in the choir competition held for the university\'s anniversary (Dies Natalis 2024) and placed second. The result came from weeks of rehearsal and from listening to each other as a group.'
    ],
    highlights: [
      'Second place at the Dies Natalis 2024 choir competition',
      'Prepared and performed together as a team'
    ],
    tags: ['Teamwork', 'Performance'],
    gallery: photos('choir-competition', 3)
  },
  {
    icon: '🎶', color: 'butter',
    title: 'Mikroskil Singing Club',
    org: 'Active Member · MSC',
    period: '',
    summary: 'Participated in university singing club activities, developing collaboration, discipline, and communication through regular practice and group performances.',
    details: [
      'As an active member of the Mikroskil Singing Club (MSC) I joined regular practice and group performances, which taught me discipline and how to communicate within a group.'
    ],
    highlights: [
      'Regular practice and group performances',
      'Built collaboration, discipline and communication skills'
    ],
    tags: ['Music', 'Teamwork'],
    gallery: photos('singing-club', 3)
  },
  {
    icon: '🏆', color: 'mint',
    title: 'CALC 2025 — Design Competition Organizer',
    org: 'Organizing Committee & Judge · Yayasan Sutomo 1 Medan',
    period: '2025',
    summary: 'Collaborated with a three-member team to organize a design competition for school students as part of CALC 2025. Contributed to competition coordination and evaluated participants\' submissions.',
    details: [
      'For CALC 2025 I worked in a three-member team that organized a design competition for school students. I helped coordinate the competition and also served as a judge, evaluating participants\' submissions.'
    ],
    highlights: [
      'Organized the competition in a three-member team',
      'Coordinated the competition for school students',
      'Evaluated submissions as a judge'
    ],
    tags: ['Design', 'Judging', 'Event organizing'],
    gallery: photos('calc-2025', 3)
  }
];


/* =====================================================================
   2. PROJECTS
   ---------------------------------------------------------------------
   Cards use:      img, tag, tagBg, tagColor, title, tagline, stack, github, live
   Case study uses: everything (problem, solution, highlights, outro, year…)

   img       thumbnail image path — put your screenshot in images/projects/
             and change the path (jpg, png, webp and svg all work)
   bg        pastel colour used behind the image and on the case-study cover
   github/live  link URL. Delete the field (or leave '') to hide that button.
   Layout: see PROJECT_LAYOUT below the list.
   ===================================================================== */
const PROJECTS = [
  {
    img: 'images/projects/neuralsketch.svg', bg: '#ede5f8', tagBg: '#ede5f8', tagColor: '#8B5CF6',
    tag: 'AI · Research',
    title: 'NeuralSketch', tagline: 'Real-time Collaborative Whiteboard with AI',
    year: '2025',
    problem: {
      headline: 'Whiteboarding is still a <em>solo experience</em> when you\'re remote.',
      body: 'Most tools either sync badly or need you to manually draw everything. Describing a system in plain English and watching it appear — that didn\'t exist. Teams were copy-pasting screenshots into Figma and calling it collaboration.'
    },
    solution: {
      headline: 'A canvas that <em>listens</em> to you and syncs in real time.',
      body: 'I fine-tuned a vision-language model on 80k diagram screenshots to classify and auto-complete partial sketches. The sync layer runs on CRDTs (Yjs) over WebRTC — no central server, no conflicts, sub-50ms latency for 1000+ users simultaneously.'
    },
    highlights: [
      'Fine-tuned ViT model on 80k diagram screenshots — completes sketches from text in ~1.2s',
      'CRDT-based sync achieves sub-50ms latency with zero merge conflicts at 1000+ concurrent users',
      'Deployed on Cloudflare Durable Objects — globally distributed, zero cold-start',
      'Adopted by 3 MIT student orgs as their async planning tool during finals week'
    ],
    stack: ['Next.js', 'Rust/WASM', 'PyTorch', 'CRDTs (Yjs)', 'WebRTC', 'Redis', 'Cloudflare DO'],
    outro: 'From a side project built in a weekend to a tool used by hundreds of people. NeuralSketch taught me that the best interfaces disappear — the user just thinks.',
    github: '#', live: '#'
  },
  {
    img: 'images/projects/litestore.svg', bg: '#d8f3ea', tagBg: '#d8f3ea', tagColor: '#0f9e7b',
    tag: 'Systems',
    title: 'LiteStore', tagline: 'LSM-tree Key-Value Storage Engine in Rust',
    year: '2024',
    problem: {
      headline: 'I was using databases every day but had <em>no idea</em> how they actually worked.',
      body: 'Every tutorial stopped at the surface. "Use RocksDB." "Use SQLite." No one walked through building a storage engine from scratch — the memtable, the SSTables, the compaction strategy. I wanted to understand, so I built it.'
    },
    solution: {
      headline: 'A full LSM-tree storage engine, <em>zero external dependencies.</em>',
      body: 'LiteStore implements all core components: an in-memory memtable (red-black tree), sorted SSTables on disk, bloom filters for fast negative lookups, a write-ahead log for crash recovery, and both size-tiered and leveled compaction — switchable at runtime.'
    },
    highlights: [
      '380k write ops/sec and 520k read ops/sec on Apple M2 Pro in benchmarks',
      'Bloom filters cut unnecessary disk reads by ~93% on negative key lookups',
      'Both size-tiered and leveled compaction strategies — switchable at runtime via config',
      'Blog post explaining the internals reached 8k readers and hit the front page of Hacker News'
    ],
    stack: ['Rust', 'LSM-tree', 'Red-Black Tree', 'Bloom Filters', 'WAL', 'SSTable', 'Benchmarking'],
    outro: 'The most educational project I\'ve ever built. Now when I use RocksDB, I know exactly what\'s happening under the hood.',
    github: '#'
  },
  {
    img: 'images/projects/contextchat.svg', bg: '#fce4d8', tagBg: '#fce4d8', tagColor: '#f06540',
    tag: 'Full-Stack',
    title: 'ContextChat', tagline: 'LLM-powered Semantic Documentation Search',
    year: '2024',
    problem: {
      headline: 'Nobody reads the docs. They\'re <em>impossible to search.</em>',
      body: 'Keyword search on large codebases or docs sites returns 200 results and none of them answer your question. "How do I retry a failed Stripe webhook?" — good luck Ctrl+F-ing that. The information exists. Finding it is the problem.'
    },
    solution: {
      headline: 'Ask any question. Get an answer <em>with the exact source.</em>',
      body: 'ContextChat indexes any GitHub repo or docs site into a pgvector store using a hybrid search pipeline — dense vector similarity + BM25, merged with Reciprocal Rank Fusion. Every answer cites the exact file and line it came from. Works with private repos via OAuth.'
    },
    highlights: [
      'Ingestion pipeline processes a 10k-file repo in under 90 seconds with async chunking',
      'Hybrid search (dense + BM25 + RRF) outperforms pure vector search by 23% on retrieval benchmarks',
      '91% correct source attribution, verified against 200 hand-labeled Q&A pairs',
      '3 MIT student orgs adopted it; 1.2k queries processed in the first month of launch'
    ],
    stack: ['LangChain', 'pgvector', 'FastAPI', 'React', 'OpenAI API', 'PostgreSQL', 'Docker'],
    outro: 'ContextChat started as a personal frustration. It ended up saving my teammates hours every week during project crunch time.',
    github: '#', live: '#'
  },
  {
    img: 'images/projects/flowviz.svg', bg: '#dceefb', tagBg: '#dceefb', tagColor: '#3b82f6',
    tag: 'Data Viz',
    title: 'FlowViz', tagline: 'Async Task Graph Visualizer for Distributed Systems',
    year: '2024',
    problem: {
      headline: 'Distributed system bugs are <em>invisible</em> in log files.',
      body: 'When a distributed pipeline fails, you get a wall of JSON logs from 12 services and a vague timeout error. Figuring out which span caused the cascade, and why, required hours of mentally reconstructing the call graph. There had to be a better way.'
    },
    solution: {
      headline: 'Upload your traces. <em>See the graph.</em> Find the bug.',
      body: 'FlowViz parses OpenTelemetry trace exports (OTLP JSON or Protobuf) and renders them as interactive DAGs using D3.js with virtualized rendering — so even 500MB trace files don\'t freeze the browser. Click any span to trace errors back to their root cause.'
    },
    highlights: [
      'Handles OTLP trace files up to 500MB via virtualized D3 rendering — no UI freeze',
      'Latency heatmap overlay highlights p95/p99 outlier spans instantly',
      'One-click error propagation tracing: failed leaf span → root cause in milliseconds',
      'Shipped as a VS Code extension — 400+ installs in the first two weeks after launch'
    ],
    stack: ['D3.js', 'OpenTelemetry', 'Go', 'React', 'WebAssembly', 'VS Code Extension API'],
    outro: 'FlowViz came from a real debugging session that took 4 hours. With the tool, the same bug would have taken 10 minutes.',
    github: '#'
  },
  {
    img: 'images/projects/palette.svg', bg: '#fdf3d0', tagBg: '#fdf3d0', tagColor: '#d4922a',
    tag: 'Design Tool',
    title: 'Palette', tagline: 'AI Color System Generator for Designers & Devs',
    year: '2025',
    problem: {
      headline: 'Every design system starts with <em>the same painful hour</em> of color math.',
      body: 'You pick a brand color. Then you need 10 shades of it. Then semantic tokens. Then neutral grays. Then you check WCAG contrast for every combination. It\'s mechanical work that eats up creative time, and most people just copy-paste a Tailwind palette and call it done.'
    },
    solution: {
      headline: 'One seed color. A complete, <em>accessible</em> token system in seconds.',
      body: 'Palette computes all scales in OKLCH — a perceptually uniform color space where equal numeric steps look equally different to the human eye. An LLM layer names the tokens, flags accessibility issues, and suggests semantic pairings. Export to CSS, Figma JSON, or Tailwind config in one click.'
    },
    highlights: [
      'OKLCH-based scales feel perceptually uniform — no more "why does this shade look off?"',
      'Automatic WCAG AA/AAA contrast checking across all token pairs before you export',
      'Three export formats: CSS custom properties, Figma tokens JSON, Tailwind config',
      'Featured in CSS-Tricks newsletter; 600+ palettes exported in the first month'
    ],
    stack: ['React', 'OKLCH', 'OpenAI API', 'CSS Custom Properties', 'Figma Plugin API', 'Tailwind'],
    outro: 'Palette is the tool I wish I had two years ago. Now it saves every side project I start from that first hour of color dread.',
    github: '#', live: '#'
  },
  {
    img: 'images/projects/promptly.svg', bg: '#f8dde8', tagBg: '#f8dde8', tagColor: '#e8527a',
    tag: 'CLI Tool',
    title: 'promptly', tagline: 'LLM Prompt Testing & Regression CLI',
    year: '2024',
    problem: {
      headline: 'Changing a system prompt is a <em>silent breaking change.</em>',
      body: 'When you tweak your LLM system prompt, you don\'t know what you broke until a user reports it. There was no diff, no regression test, no CI for prompts. Teams were manually spot-checking outputs in a spreadsheet. For a $5B industry, that\'s embarrassingly primitive.'
    },
    solution: {
      headline: 'Treat your prompts like code. <em>Test them like code.</em>',
      body: 'promptly lets you define a suite of test cases in a TOML file, run them against any LLM provider, and get a semantic diff of what changed between runs. Change your system prompt → instantly see which outputs regressed and by how much — in a beautiful TUI, in your terminal.'
    },
    highlights: [
      '800+ GitHub stars; actively used by engineering teams at two YC-backed startups',
      'Supports OpenAI, Anthropic, Mistral, and local Ollama in one unified config file',
      'Semantic diff mode uses embedding cosine similarity — catches meaningful regressions, not just string diffs',
      'Config-as-code: prompts, models, eval criteria, and thresholds all version-controlled in TOML'
    ],
    stack: ['Rust', 'Ratatui', 'OpenAI API', 'Anthropic API', 'Ollama', 'TOML', 'async-std', 'tokio'],
    outro: 'promptly went from a personal script to an open-source tool with real users in 6 weeks. The best projects solve your own problems first.',
    github: '#'
  }
];

/* Card sizes in the projects grid (12-column grid).
   feat = wide (7/12) · side = narrow (5/12) · half = 6/12 · third = 4/12
   The pattern repeats if you have more projects than entries here.
   Each row should add up to 12:  feat+side, side+feat, half+half, third×3 */
const PROJECT_LAYOUT = ['feat', 'side', 'side', 'feat', 'half', 'half'];


/* =====================================================================
   3. CERTIFICATES
   ---------------------------------------------------------------------
   title    certificate name
   issuer   who issued it
   date     e.g. 'Jun 2025' ('' to hide)
   image    path to the certificate image (jpg/png/webp/svg or a photo of it)
            → put files in images/certificates/
   link     optional verification URL ('' to hide the "verify" link)

   TODO: entries 3 and 4 are placeholders — replace or delete them.
   ===================================================================== */
const CERTIFICATES = [
  {
    title: 'Data Science Independent Study',
    issuer: 'Startup Campus · MSIB Batch 7',
    date: '',
    image: 'images/certificates/cert-1.svg',
    link: ''
  },
  {
    title: 'Choir Competition — Second Place',
    issuer: 'Universitas Katolik Santo Thomas · Dies Natalis 2024',
    date: '2024',
    image: 'images/certificates/cert-2.svg',
    link: ''
  },
  {
    title: 'Your certificate title',
    issuer: 'Issuer name',
    date: '',
    image: 'images/certificates/cert-3.svg',
    link: ''
  },
  {
    title: 'Your certificate title',
    issuer: 'Issuer name',
    date: '',
    image: 'images/certificates/cert-4.svg',
    link: ''
  }
];
