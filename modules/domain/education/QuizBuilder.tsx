'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { RadioGroup } from '@/modules/ui/RadioGroup';
import { CheckboxGroup } from '@/modules/ui/CheckboxGroup';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Button } from '@/modules/ui/Button';

export type QuizQuestionType = 'single' | 'multiple' | 'text';

export type QuizQuestion = {
  id: string;
  type: QuizQuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string | string[];
  explanation?: string;
};

const TYPE_ITEMS: ButtonGroupItem[] = [
  { value: 'single',   label: 'Single choice' },
  { value: 'multiple', label: 'Multi choice' },
  { value: 'text',     label: 'Text answer' },
];

export function QuizBuilder({
  onSave,
  initial,
  className,
}: {
  onSave?: (q: QuizQuestion) => void;
  initial?: Partial<QuizQuestion>;
  className?: string;
}) {
  const [type,     setType]     = useState<QuizQuestionType>(initial?.type ?? 'single');
  const [text,     setText]     = useState(initial?.text ?? '');
  const [options,  setOptions]  = useState<string[]>(initial?.options ?? ['', '', '', '']);
  const [correct,  setCorrect]  = useState<string>(
    Array.isArray(initial?.correctAnswer) ? initial.correctAnswer[0] ?? '' : initial?.correctAnswer ?? ''
  );
  const [correctMulti, setCorrectMulti] = useState<string[]>(
    Array.isArray(initial?.correctAnswer) ? initial.correctAnswer : []
  );
  const [explanation, setExplanation] = useState(initial?.explanation ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filledOptions = options.filter(Boolean);

  function validate() {
    const e: Record<string, string> = {};
    if (!text) e.text = 'Question text is required';
    if (type !== 'text' && filledOptions.length < 2) e.options = 'At least 2 options required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave?.({
      id: initial?.id ?? crypto.randomUUID(),
      type,
      text,
      options: type !== 'text' ? filledOptions : undefined,
      correctAnswer: type === 'single' ? correct : type === 'multiple' ? correctMulti : undefined,
      explanation: explanation || undefined,
    });
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div>
        <p className="text-sm font-medium text-text-primary mb-1.5">Question type</p>
        <ButtonGroup items={TYPE_ITEMS} value={type} onChange={(v) => setType(v as QuizQuestionType)} size="sm" />
      </div>

      <Textarea
        id="quiz-text"
        label="Question"
        placeholder="Enter your question here…"
        rows={2}
        value={text}
        onChange={(e) => setText(e.target.value)}
        error={errors.text}
        required
      />

      {type !== 'text' && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-primary">Answer options</p>
          {options.map((opt, i) => (
            <Input
              key={i}
              id={`opt-${i}`}
              label={`Option ${i + 1}`}
              placeholder={`Option ${i + 1}`}
              value={opt}
              onChange={(e) => {
                const next = [...options];
                next[i] = e.target.value;
                setOptions(next);
              }}
              error={i === 0 && errors.options ? errors.options : undefined}
            />
          ))}
          <Button variant="ghost" size="sm" onClick={() => setOptions([...options, ''])} iconLeft="+">
            Add option
          </Button>
        </div>
      )}

      {type === 'single' && filledOptions.length > 0 && (
        <RadioGroup
          name="correct-single"
          legend="Correct answer"
          options={filledOptions.map((o) => ({ value: o, label: o }))}
          value={correct}
          onChange={setCorrect}
        />
      )}

      {type === 'multiple' && filledOptions.length > 0 && (
        <CheckboxGroup
          legend="Correct answers (select all that apply)"
          options={filledOptions}
          selected={correctMulti}
          onChange={setCorrectMulti}
        />
      )}

      <Textarea
        id="quiz-explanation"
        label="Explanation (optional)"
        placeholder="Show after the answer is submitted…"
        rows={2}
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
      />

      <div className="flex justify-end">
        <Button variant="primary" onClick={handleSave} iconLeft="💾">Save question</Button>
      </div>
    </div>
  );
}
