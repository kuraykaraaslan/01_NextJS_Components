'use client';
import { useState, useRef, useEffect } from 'react';
import { Drawer } from '@/modules/ui/Drawer';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { Toast } from '@/modules/ui/Toast';

type ChatMessage = {
  id: string;
  user: string;
  text: string;
  time: string;
  isSystem?: boolean;
};

const INITIAL_MESSAGES: ChatMessage[] = [
  { id: 'm1', user: 'Alice', text: 'This talk is amazing! 🔥', time: '14:32' },
  { id: 'm2', user: 'Bob', text: 'Can you share the slides after?', time: '14:33' },
  { id: 'm3', user: 'System', text: 'Speaker has joined the chat.', time: '14:34', isSystem: true },
  { id: 'm4', user: 'SpeakerDan', text: 'Hi everyone! Happy to answer questions.', time: '14:35' },
  { id: 'm5', user: 'Carol', text: 'What framework do you recommend for beginners?', time: '14:36' },
  { id: 'm6', user: 'David', text: 'Next.js all the way! 🚀', time: '14:37' },
];

export function LiveChatPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: `m${Date.now()}`,
      user: 'You',
      text: input,
      time: new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setShowToast(true);
  }

  return (
    <div>
      <Button variant="outline" onClick={() => setOpen(true)} iconLeft="💬">
        Live Chat
        <Badge variant="error" size="sm">{messages.length}</Badge>
      </Button>

      {showToast && (
        <Toast variant="success" message="Message sent!" onDismiss={() => setShowToast(false)} duration={2000} />
      )}

      <Drawer open={open} onClose={() => setOpen(false)} title="Live Chat"
        footer={
          <div className="flex gap-2 w-full">
            <Input id="chat-input" label="" placeholder="Say something…" value={input} onChange={(e) => setInput(e.target.value)} className="flex-1" />
            <Button variant="primary" onClick={sendMessage} disabled={!input.trim()}>Send</Button>
          </div>
        }
      >
        <div className="space-y-3">
          {messages.map((m) =>
            m.isSystem ? (
              <p key={m.id} className="text-xs text-text-secondary text-center italic">{m.text}</p>
            ) : (
              <div key={m.id} className="flex gap-2">
                <Avatar name={m.user} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="text-xs font-semibold text-text-primary">{m.user}</span>
                    <Badge variant="neutral" size="sm">{m.time}</Badge>
                  </div>
                  <p className="text-sm text-text-secondary">{m.text}</p>
                </div>
              </div>
            )
          )}
          <div ref={endRef} />
        </div>
      </Drawer>
    </div>
  );
}
