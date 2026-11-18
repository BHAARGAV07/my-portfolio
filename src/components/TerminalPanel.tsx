import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { content } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { TypingText } from './MotionText';

const commands = ['help', 'whoami', 'about', 'project', 'projects', 'skills', 'experience', 'contact', 'resume', 'clear'];

interface TerminalLine {
  text: string;
  typed?: boolean;
}

function TypingLine({ text }: { text: string }) {
  return <TypingText text={text} />;
}

function outputFor(command: string): string[] {
  switch (command) {
    case 'whoami': return [
      content.profile.name,
      `${content.profile.education} · ${content.profile.location} · Class of ${content.profile.graduationYear}`,
      `Email: ${content.profile.email}`,
      `Phone: ${content.profile.phone}`,
    ];
    case 'about': return [content.profile.title, content.profile.location, ...content.about.paragraphs];
    case 'project':
    case 'projects': return content.projects.map((project) => project.name);
    case 'skills': return [
      `Languages: ${content.skills.languages.join(', ')}`,
      `Frontend: ${content.skills.frontend.join(', ')}`,
      `Backend and data: ${content.skills.backendAndData.join(', ')}`,
      `Tools: ${content.skills.tools.join(', ')}`,
    ];
    case 'experience': return content.experience.map((item) => `${item.title} — ${item.organization}`);
    case 'contact': return [content.profile.email, ...content.links.filter((link) => link.label !== 'Email').map((link) => `${link.label}: ${link.href}`)];
    case 'resume': return ['Resume: /resume.pdf'];
    case 'help': return commands.map((item) => `${item}${item === 'clear' ? ' — clear terminal output' : ''}`);
    default: return [`command not found: ${command}`, 'Type help for available commands.'];
  }
}

export function TerminalPanel() {
  const sectionRef = useReveal<HTMLElement>();
  const [history, setHistory] = useState<TerminalLine[]>([{ text: 'Type help to list available commands.' }]);
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = value.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') {
      setHistory([]);
    } else {
      const shouldType = command === 'project' || command === 'projects';
      setHistory((current) => [
        ...current,
        { text: `$ ${command}` },
        ...outputFor(command).map((text) => ({ text, typed: shouldType })),
      ]);
    }
    setValue('');
  };

  return (
    <aside ref={sectionRef} className="site-section terminal-panel" id="terminal" aria-labelledby="terminal-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/terminal</p>
        <h2 id="terminal-title">Interactive terminal</h2>
      </div>
      <div className="terminal-panel__window" onClick={() => inputRef.current?.focus()}>
        <div className="terminal-panel__output" aria-live="polite">
          {history.map((line, index) => <p key={`${line.text}-${index}`}>{line.typed ? <TypingLine text={line.text} /> : line.text}</p>)}
        </div>
        <form className="terminal-panel__form" onSubmit={submit}>
          <label htmlFor="terminal-command"><span aria-hidden="true">$</span><span className="sr-only">Terminal command</span></label>
          <input
            ref={inputRef}
            id="terminal-command"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal command"
          />
          <span className="terminal-panel__cursor" aria-hidden="true" />
        </form>
      </div>
    </aside>
  );
}
