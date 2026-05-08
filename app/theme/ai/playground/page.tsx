'use client';
import { useState } from 'react';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { ChatMessage } from '@/modules/domains/ai/chat/ChatMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { MODELS, CHAT_MESSAGES } from '../ai.data';

const MODEL_OPTIONS = MODELS.filter((m) => m.type === 'TEXT').map((m) => ({
  value: m.modelId,
  label: m.name,
}));

const DEMO_SESSION_ID = 'sess-01';

export default function PlaygroundPage() {
  const [selectedModel, setSelectedModel] = useState(MODEL_OPTIONS[0]?.value ?? '');
  const [inputValue, setInputValue] = useState('');

  const messages = CHAT_MESSAGES[DEMO_SESSION_ID] ?? [];

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-primary">Playground</h1>
        <p className="mt-2 text-text-secondary">
          Chat with AI models interactively. Select a model and start a conversation.
        </p>
      </div>

      {/* Model selector */}
      <div className="mb-6 max-w-sm">
        <Select
          label="Model"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
          options={MODEL_OPTIONS}
        />
      </div>

      {/* Chat window */}
      <div className="rounded-xl border border-border bg-surface-raised overflow-hidden flex flex-col">
        {/* Messages area */}
        <div className="flex-1 p-6 space-y-4 min-h-96 overflow-y-auto">
          {messages.map((msg) => (
            <ChatMessage key={msg.messageId} message={msg} />
          ))}
        </div>

        {/* Input area */}
        <div className="border-t border-border p-4">
          <div className="flex items-end gap-3">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message…"
              rows={2}
              aria-label="Message input"
              className="flex-1 resize-none rounded-xl border border-border bg-surface-base px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus transition"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setInputValue('');
                }
              }}
            />
            <Button
              variant="primary"
              size="md"
              iconOnly
              aria-label="Send message"
              onClick={() => setInputValue('')}
              className="shrink-0"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-text-secondary">
            Press <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-border bg-surface-sunken">Enter</kbd> to send,{' '}
            <kbd className="font-mono text-[10px] px-1 py-0.5 rounded border border-border bg-surface-sunken">Shift+Enter</kbd> for new line.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="mt-4 text-xs text-text-secondary text-center">
        This is a static demo — messages shown are pre-seeded sample data.
      </p>
    </div>
  );
}
