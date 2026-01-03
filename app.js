// Edit profile data here: this single object powers the terminal content.
const profile = {
  header: {
    name: 'DARKO DAVID LARBI',
    role: 'System Administrator | DevOps Engineer | AWS | Linux | Kubernetes',
    value: 'Hands-on engineer with 3+ years of AWS production experience and deep Linux administration expertise. Keeps web apps and databases highly available with security-first automation and rapid incident response.'
  },
  about: 'Hands-on System Administrator and DevOps Engineer with over 3 years of AWS production experience and deep Linux administration expertise. Proven track record maintaining highly available web applications, PostgreSQL/MySQL databases, and server infrastructure with 99.99% uptime. Specialist in security patching, system configuration, troubleshooting, incident response, and providing first-line technical support.',
  skills: {
    Cloud_Infrastructure: [
      'AWS',
      'Azure',
      'EKS/Fargate'
    ],
    Linux_Administration: [
      'Ubuntu',
      'Debian',
      'RHEL',
      'Installation, configuration, hardening, patching, troubleshooting'
    ],
    Web_Application_Servers: ['Nginx', 'NodeJS', 'PHP'],
    Containers: ['Docker', 'Kubernetes', 'Helm'],
    IaC_Automation: ['Terraform', 'CloudFormation', 'Bash', 'Python'],
    CI_CD: ['Azure DevOps', 'GitHub Actions', 'AWS CodePipeline'],
    Monitoring_Support: ['CloudWatch', 'Prometheus', 'Grafana', 'ELK'],
    Security: ['Security patching', 'Vulnerability management', 'IAM least privilege', 'Secrets management']
  },
  experience: [
    {
      role: 'DevOps & Cloud Platform Engineer',
      company: 'Adaptive Computer Solutions',
      period: 'May 2024 — Present',
      impact: [
        'Manage AWS infrastructure for insurance-grade applications.',
        'Administer Ubuntu/Linux servers: installation, configuration, security patching, tuning, and troubleshooting.',
        'Maintain Nginx reverse proxy and load balancer for NodeJS/PHP applications.',
        'Administer PostgreSQL/MySQL: monitoring, backups, query optimization, and failover.',
        'Reduce MTTR by 45% using CloudWatch and custom alerting.',
        'Automate security patching and software updates across the fleet.',
        'Resolve complex networking, database, and application issues.'
      ]
    },
    {
      role: 'Junior Network & Cloud Engineer',
      company: 'GAD Engineering, Accra',
      period: 'Jan 2024 — May 2024',
      impact: [
        'Designed secure VPCs and implemented load balancing for web traffic.',
        'Performed Ubuntu server administration and network troubleshooting during migrations.',
        'Automated system configuration and patching tasks using Bash/Python.'
      ]
    },
    {
      role: 'IT Support & Systems Engineer',
      company: 'Phronesis Magnate Limited, Accra',
      period: 'Jan 2017 — Dec 2018',
      impact: [
        'Provided 24/7 first-line helpdesk and systems administration in Linux/Windows environments.',
        'Installed, configured, and maintained Ubuntu/Debian servers and services.',
        'Resolved 95%+ of incidents at first contact with 99.9% system uptime.'
      ]
    }
  ],
  projects: [
    {
      name: 'Insurance-Style Web App on AWS',
      stack: ['EC2', 'VPC', 'Nginx', 'PostgreSQL RDS', 'CloudWatch', 'SSM'],
      outcome: 'Ubuntu EC2 in custom VPC with Nginx reverse proxy, NodeJS/PHP app, RDS, monitoring, and automated patching.',
      links: { github: 'https://github.com/example/insurance-app', demo: 'https://demo.example.dev' }
    },
    {
      name: 'Automated Server Patching & Compliance Dashboard',
      stack: ['AWS SSM', 'Inspector', 'CloudWatch', 'SNS'],
      outcome: 'Fleet patching automation with compliance dashboards and alerting on failed updates.',
      links: { github: 'https://github.com/example/patching-dashboard' }
    },
    {
      name: 'High-Availability RDS Failover Lab',
      stack: ['RDS Multi-AZ', 'Read Replicas', 'CloudWatch'],
      outcome: 'Multi-AZ PostgreSQL/MySQL with failover testing, backups, and alarm-driven monitoring.',
      links: { github: 'https://github.com/example/ha-rds-lab' }
    }
  ],
  certs: ['KCNA', 'AWS CCP', 'AWS CSA'],
  contact: {
    email: 'kdarkolarbi@gmail.com',
    github: 'https://github.com/kdarko',
    linkedin: 'https://linkedin.com/in/darko-david-larbi',
    resume: 'https://example.dev/resume.pdf'
  },
  meta: {
    prompt: 'ddarko@devops:~$',
    hostTitle: 'portfolio.sh'
  }
};

const aliasMap = {
  'ls': 'help',
  'cat about.txt': 'about',
  'cat skills.txt': 'skills',
  'man projects': 'projects',
  'about': 'whoami'
};

const commandHandlers = {};
const outputEl = document.getElementById('output');
const inputEl = document.getElementById('terminalInput');
const promptLabel = document.getElementById('promptLabel');

const state = {
  history: [],
  historyIndex: -1,
  theme: localStorage.getItem('portfolio-theme') || 'matrix',
  typingEffect: false,
  prompt: profile.meta.prompt || 'user@host:~$'
};

function init() {
  setTheme(state.theme);
  promptLabel.textContent = state.prompt;
  registerCommands();
  renderWelcome();
  inputEl.focus();
  attachEvents();
}

function registerCommands() {
  // To add commands, map a keyword to a handler below.
  commandHandlers.help = () => renderHelp();
  commandHandlers.skills = () => renderSkills();
  commandHandlers.experience = () => renderExperience();
  commandHandlers.projects = () => renderProjects();
  commandHandlers.certs = () => renderCerts();
  commandHandlers.contact = () => renderContact();
  commandHandlers.whoami = () => renderWhoami();
  commandHandlers.clear = () => clearScreen();
  commandHandlers.theme = (args) => changeTheme(args[0]);
  commandHandlers.copy = (args) => copyToClipboard(args[0]);
  commandHandlers.open = (args) => openLink(args[0]);
  commandHandlers.type = (args) => toggleTyping(args[0]);
}

function attachEvents() {
  inputEl.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', () => inputEl.focus());
}

function renderWelcome() {
  const lines = [
    { text: `Welcome to ${profile.header.name}'s terminal portfolio.`, className: 'ansi-info' },
    { text: 'Type "help" to explore, or "theme light|dark|matrix".', className: 'muted' }
  ];
  addOutput(lines);
}

function renderHelp() {
  const lines = [
    { text: 'Available commands:', className: 'ansi-info' },
    { text: 'help | whoami | skills | experience | projects | certs | contact' },
    { text: 'copy email|github|linkedin', className: 'muted' },
    { text: 'open github|linkedin|resume', className: 'muted' },
    { text: 'theme light|dark|matrix', className: 'muted' },
    { text: 'clear | type on|off (fast typing)', className: 'muted' },
    { text: 'Aliases: ls -> help, cat about.txt -> about, cat skills.txt -> skills, man projects -> projects', className: 'muted' }
  ];
  addOutput(lines);
}

function renderWhoami() {
  const lines = [
    { text: profile.header.name, className: 'ansi-ok' },
    { text: profile.header.role },
    { text: profile.about, className: 'muted' }
  ];
  addOutput(lines);
}

function renderSkills() {
  const fragment = document.createDocumentFragment();
  Object.entries(profile.skills).forEach(([group, items]) => {
    const heading = document.createElement('div');
    heading.textContent = group.replace(/_/g, ' ');
    heading.className = 'ansi-ok';
    fragment.appendChild(heading);
    const badges = document.createElement('div');
    items.forEach((item) => {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.textContent = item;
      badges.appendChild(badge);
    });
    fragment.appendChild(badges);
  });
  addOutput([{ text: 'Skills:', className: 'ansi-info' }, { element: fragment }]);
}

function renderExperience() {
  const fragment = document.createDocumentFragment();
  profile.experience.forEach((job) => {
    const title = document.createElement('div');
    title.className = 'ansi-ok';
    title.textContent = `${job.role} @ ${job.company} (${job.period})`;
    fragment.appendChild(title);
    const list = createList(job.impact);
    fragment.appendChild(list);
  });
  addOutput([{ text: 'Experience:', className: 'ansi-info' }, { element: fragment }]);
}

function renderProjects() {
  const fragment = document.createDocumentFragment();
  profile.projects.forEach((project) => {
    const title = document.createElement('div');
    title.className = 'ansi-ok';
    title.textContent = project.name;
    fragment.appendChild(title);

    const stack = document.createElement('div');
    stack.className = 'muted';
    stack.textContent = project.stack.join(', ');
    fragment.appendChild(stack);

    const outcome = document.createElement('div');
    outcome.textContent = project.outcome;
    fragment.appendChild(outcome);

    const links = document.createElement('div');
    if (project.links?.github) links.appendChild(makeLink('GitHub', project.links.github));
    if (project.links?.demo) links.appendChild(makeLink('Demo', project.links.demo));
    fragment.appendChild(links);

    fragment.appendChild(document.createElement('br'));
  });
  addOutput([{ text: 'Projects:', className: 'ansi-info' }, { element: fragment }]);
}

function renderCerts() {
  if (!profile.certs || !profile.certs.length) {
    addOutput([{ text: 'No certifications listed.', className: 'ansi-warn' }]);
    return;
  }
  const list = createList(profile.certs);
  addOutput([{ text: 'Certifications:', className: 'ansi-info' }, { element: list }]);
}

function renderContact() {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(makeLink(profile.contact.email, `mailto:${profile.contact.email}`));
  fragment.appendChild(document.createTextNode(' '));
  fragment.appendChild(makeLink('GitHub', profile.contact.github));
  fragment.appendChild(document.createTextNode(' '));
  fragment.appendChild(makeLink('LinkedIn', profile.contact.linkedin));
  addOutput([{ text: 'Contact:', className: 'ansi-info' }, { element: fragment }]);
}

function createList(items) {
  const ul = document.createElement('ul');
  ul.className = 'list';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    ul.appendChild(li);
  });
  return ul;
}

function makeLink(label, href) {
  const link = document.createElement('a');
  link.textContent = label;
  link.href = href;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'link';
  return link;
}

function clearScreen() {
  outputEl.innerHTML = '';
}

function addOutput(lines) {
  lines.forEach((entry) => {
    if (entry.element) {
      appendElement(entry.element);
    } else if (state.typingEffect && typeof entry.text === 'string') {
      appendTyping(entry.text, entry.className);
    } else {
      appendText(entry.text, entry.className);
    }
  });
  outputEl.scrollTop = outputEl.scrollHeight;
}

function appendElement(element) {
  const wrapper = document.createElement('div');
  wrapper.appendChild(element);
  outputEl.appendChild(wrapper);
}

function appendText(text, className) {
  const div = document.createElement('div');
  if (className) div.className = className;
  div.textContent = text;
  outputEl.appendChild(div);
}

function appendTyping(text, className) {
  const div = document.createElement('div');
  if (className) div.className = className;
  outputEl.appendChild(div);
  let idx = 0;
  const interval = setInterval(() => {
    div.textContent = text.slice(0, idx);
    idx += 1;
    if (idx > text.length) clearInterval(interval);
  }, 10);
}

function handleKeydown(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    processCommand(inputEl.value);
    inputEl.value = '';
    state.historyIndex = state.history.length;
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    navigateHistory(-1);
    return;
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault();
    navigateHistory(1);
    return;
  }
  if (event.key === 'Tab') {
    event.preventDefault();
    autocomplete();
    return;
  }
  if (event.key.toLowerCase() === 'l' && event.ctrlKey) {
    event.preventDefault();
    clearScreen();
    return;
  }
  if (event.key.toLowerCase() === 'a' && event.ctrlKey) {
    event.preventDefault();
    inputEl.selectionStart = 0;
    inputEl.selectionEnd = 0;
    return;
  }
  if (event.key.toLowerCase() === 'e' && event.ctrlKey) {
    event.preventDefault();
    const end = inputEl.value.length;
    inputEl.selectionStart = end;
    inputEl.selectionEnd = end;
  }
}

function processCommand(rawInput) {
  const input = rawInput.trim();
  if (!input) return;
  addUserLine(input);
  state.history.push(input);
  const resolved = resolveAlias(input);
  const parts = resolved.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  const handler = commandHandlers[cmd];
  if (!handler) {
    addOutput([{ text: `Command not found: ${cmd}`, className: 'ansi-error' }]);
    return;
  }
  handler(args);
}

function addUserLine(text) {
  const line = document.createElement('div');
  line.className = 'line';
  const prompt = document.createElement('span');
  prompt.className = 'prompt';
  prompt.textContent = state.prompt;
  const content = document.createElement('span');
  content.textContent = text;
  line.append(prompt, content);
  outputEl.appendChild(line);
}

function resolveAlias(input) {
  const normalized = input.toLowerCase();
  if (aliasMap[normalized]) {
    return aliasMap[normalized];
  }
  return input;
}

function navigateHistory(delta) {
  const newIndex = state.historyIndex + delta;
  if (newIndex < 0 || newIndex > state.history.length) return;
  state.historyIndex = newIndex;
  if (state.historyIndex === state.history.length) {
    inputEl.value = '';
    return;
  }
  inputEl.value = state.history[state.historyIndex];
}

function autocomplete() {
  const value = inputEl.value.trim();
  const candidates = [...Object.keys(commandHandlers), ...Object.keys(aliasMap)];
  const matches = candidates.filter((cmd) => cmd.startsWith(value));
  if (matches.length === 1) {
    inputEl.value = matches[0] + ' ';
  } else if (matches.length > 1) {
    addOutput([{ text: matches.join('  '), className: 'muted' }]);
  }
}

function changeTheme(theme) {
  const allowed = ['light', 'dark', 'matrix'];
  if (!theme || !allowed.includes(theme.toLowerCase())) {
    addOutput([{ text: `Usage: theme ${allowed.join('|')}`, className: 'ansi-warn' }]);
    return;
  }
  setTheme(theme.toLowerCase());
  addOutput([{ text: `Theme set to ${theme}.`, className: 'ansi-ok' }]);
}

function setTheme(theme) {
  state.theme = theme;
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
}

function copyToClipboard(target) {
  if (!target) {
    addOutput([{ text: 'Usage: copy email|github|linkedin', className: 'ansi-warn' }]);
    return;
  }
  const map = {
    email: profile.contact.email,
    github: profile.contact.github,
    linkedin: profile.contact.linkedin
  };
  const value = map[target.toLowerCase()];
  if (!value) {
    addOutput([{ text: 'Nothing to copy for that target.', className: 'ansi-error' }]);
    return;
  }
  navigator.clipboard.writeText(value).then(() => {
    addOutput([{ text: `${target} copied to clipboard.`, className: 'ansi-ok' }]);
  }).catch(() => {
    addOutput([{ text: 'Clipboard unavailable. Try running from a local server (see instructions).', className: 'ansi-warn' }]);
  });
}

function openLink(target) {
  if (!target) {
    addOutput([{ text: 'Usage: open github|linkedin|resume', className: 'ansi-warn' }]);
    return;
  }
  const map = {
    github: profile.contact.github,
    linkedin: profile.contact.linkedin,
    resume: profile.contact.resume
  };
  const url = map[target.toLowerCase()];
  if (!url) {
    addOutput([{ text: 'No link configured for that target.', className: 'ansi-error' }]);
    return;
  }
  window.open(url, '_blank', 'noopener');
  addOutput([{ text: `Opening ${target}...`, className: 'ansi-info' }]);
}

function toggleTyping(arg) {
  if (!arg) {
    addOutput([{ text: 'Usage: type on|off', className: 'ansi-warn' }]);
    return;
  }
  const enable = ['on', 'fast', 'true'].includes(arg.toLowerCase());
  const disable = ['off', 'false'].includes(arg.toLowerCase());
  if (!enable && !disable) {
    addOutput([{ text: 'Usage: type on|off', className: 'ansi-warn' }]);
    return;
  }
  state.typingEffect = enable;
  addOutput([{ text: `Typing effect ${enable ? 'enabled' : 'disabled'}.`, className: 'ansi-ok' }]);
}

window.addEventListener('load', init);
