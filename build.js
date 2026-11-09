const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const toolsDir = path.join(root, 'public', 'tools');
const output = path.join(root, 'public', 'tools.json');

if (!fs.existsSync(toolsDir)) fs.mkdirSync(toolsDir, { recursive: true });

const entries = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(entry => entry.isFile() && entry.name.toLowerCase().endsWith('.html'))
  .map(entry => {
    const filename = entry.name;
    const fullPath = path.join(toolsDir, filename);
    const source = fs.readFileSync(fullPath, 'utf8');
    const titleMatch = source.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim() : '';
    const displayName = filename.replace(/\.html$/i, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
    const name = rawTitle && !/^(document|untitled)$/i.test(rawTitle) ? rawTitle : displayName;
    const lower = (filename + ' ' + name).toLowerCase();
    let category = 'Other';
    let icon = '🧩';
    let description = 'A ready-to-use HTML tool from your personal toolkit.';
    if (/quiz|test|question|bot/.test(lower)) { category = 'Quiz & Tests'; icon = '🧠'; description = 'Create, manage or practise quizzes and test content.'; }
    if (/pdf|paper|series/.test(lower)) { category = 'PDF & Documents'; icon = '📄'; description = 'Work with test papers, PDFs and document utilities.'; }
    if (/short|recorder|video/.test(lower)) { category = 'Video & Media'; icon = '🎬'; description = 'Create or record content with browser-based media tools.'; }
    if (/5 in 1|toolkit hub/.test(lower)) { category = 'Toolkits'; icon = '🧰'; description = 'A combined hub containing multiple study utilities.'; }
    return {
      id: filename,
      name,
      filename,
      url: 'tools/' + encodeURIComponent(filename).replace(/%2F/gi, '/'),
      category,
      icon,
      description,
      size: fs.statSync(fullPath).size
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

fs.writeFileSync(output, JSON.stringify({ generatedAt: new Date().toISOString(), count: entries.length, tools: entries }, null, 2));
console.log(`Built tool catalogue: ${entries.length} HTML file(s) found in public/tools/`);
