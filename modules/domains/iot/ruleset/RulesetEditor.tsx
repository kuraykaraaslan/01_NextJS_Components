'use client';
import { useState, useRef, useImperativeHandle } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBolt, faFilter, faCodeBranch, faGears, faBullseye,
  faClock, faBell, faDatabase, faGlobe, faServer,
  faTrash, faXmark, faRotateLeft, faCheck,
  faBug, faPlay, faCircleCheck, faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Modal } from '@/modules/ui/Modal';
import type { RuleNodeType, RuleNode, RuleEdge } from '../types';

/* ─── Geometry ────────────────────────────────────────────────────────────── */

const NODE_W          = 160;
const NODE_HEADER_H   = 36;
const PORT_R          = 6;
const PORT_STEP       = 24;
const PORT_TOP_OFFSET = 18;

/* ─── Port meta ───────────────────────────────────────────────────────────── */

const PORT_META: Record<string, { color: string; label: string }> = {
  out:     { color: 'var(--primary)',        label: '' },
  in:      { color: 'var(--border-strong)',  label: '' },
  true:    { color: 'var(--success)',        label: 'True' },
  false:   { color: 'var(--error)',          label: 'False' },
  success: { color: 'var(--success)',        label: 'Success' },
  failure: { color: 'var(--error)',          label: 'Failure' },
  timeout: { color: 'var(--warning)',        label: 'Timeout' },
  created: { color: 'var(--warning)',        label: 'Created' },
  cleared: { color: 'var(--text-secondary)', label: 'Cleared' },
  c1:      { color: 'var(--info)',           label: 'Case 1' },
  c2:      { color: 'var(--info)',           label: 'Case 2' },
  c3:      { color: 'var(--info)',           label: 'Case 3' },
  def:     { color: 'var(--text-secondary)', label: 'Default' },
};

function portColor(id: string) { return PORT_META[id]?.color ?? 'var(--primary)'; }
function portEdgeLabel(id: string) { return PORT_META[id]?.label ?? id; }

/* ─── Default scripts ─────────────────────────────────────────────────────── */

const DEFAULT_SCRIPTS: Record<RuleNodeType, string> = {
  TRIGGER:
`// Called when a message arrives (MQTT / HTTP / Schedule).
// msg           — raw payload object
// metadata      — device metadata key-value map
// message_type  — string identifier of the inbound topic
return msg;`,
  FILTER:
`// Return true  → True port.  Return false → False port.
var temp = msg.temperature;
return temp !== undefined && temp > 85;`,
  SWITCH:
`// Return the output port key: 'c1', 'c2', 'c3', or 'def'.
var zone = metadata.zone;
if (zone === 'A') return 'c1';
if (zone === 'B') return 'c2';
return 'def';`,
  TRANSFORM:
`// Mutate and return the message.
msg.processedAt = new Date().toISOString();
msg.source = metadata.deviceId;
delete msg._raw;
return msg;`,
  ACTION:
`// Terminal side-effect — no output port.
send({
  deviceId: metadata.deviceId,
  severity: 'CRITICAL',
  message: 'Threshold exceeded: ' + msg.temperature,
});`,
  DELAY:
`// Return delay in milliseconds.
// Out port fires after the delay; Timeout if exceeded.
return 30000; // 30 s`,
  ALARM:
`// Return alarm config. Created → raised; Cleared → resolved.
return {
  name: 'HighTemperature',
  severity: 'CRITICAL',
  details: { temperature: msg.temperature, deviceId: metadata.deviceId },
};`,
  ENRICHMENT:
`// Attach external data. Success → OK; Failure → lookup failed.
msg.deviceLabel = getDeviceLabel(metadata.deviceId);
msg.tags = getDeviceTags(metadata.deviceId);
return msg;`,
  REST_API:
`// Configure outbound HTTP call. Success → 2xx; Failure → error.
return {
  url: 'https://api.example.com/events',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: { deviceId: metadata.deviceId, event: message_type, payload: msg },
};`,
  SAVE_TS:
`// Select fields to persist. Success → saved; Failure → write error.
return {
  keys: ['temperature', 'humidity', 'pressure'],
  ts: msg.timestamp || Date.now(),
};`,
};

/* ─── Node visuals ────────────────────────────────────────────────────────── */

type PortDef = { id: string; label: string };
type NodeVisual = {
  type: RuleNodeType; displayLabel: string; description: string;
  icon: IconDefinition; iconColor: string; headerBg: string;
  inputs: PortDef[]; outputs: PortDef[];
};

const NODE_VISUALS: Record<RuleNodeType, NodeVisual> = {
  TRIGGER:    { type:'TRIGGER',    displayLabel:'Trigger',         description:'Entry point — MQTT / HTTP / Schedule',   icon:faBolt,        iconColor:'text-primary',       headerBg:'bg-primary-subtle',  inputs:[],                                                           outputs:[{id:'out',label:'out'}] },
  FILTER:     { type:'FILTER',     displayLabel:'Filter',          description:'Boolean gate — passes or blocks',         icon:faFilter,      iconColor:'text-warning',       headerBg:'bg-warning-subtle',  inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'true',label:'True'},{id:'false',label:'False'}] },
  SWITCH:     { type:'SWITCH',     displayLabel:'Switch',          description:'Multi-way router by attribute',           icon:faCodeBranch,  iconColor:'text-[#7c3aed]',     headerBg:'bg-[#f5f3ff]',      inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'c1',label:'Case 1'},{id:'c2',label:'Case 2'},{id:'def',label:'Default'}] },
  TRANSFORM:  { type:'TRANSFORM',  displayLabel:'Transform',       description:'Reshape or enrich payload inline',        icon:faGears,       iconColor:'text-success-fg',    headerBg:'bg-success-subtle',  inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'out',label:'out'}] },
  ACTION:     { type:'ACTION',     displayLabel:'Action',          description:'Terminal side-effect (alert, publish)',   icon:faBullseye,    iconColor:'text-error',         headerBg:'bg-error-subtle',    inputs:[{id:'in',label:'in'}],                                        outputs:[] },
  DELAY:      { type:'DELAY',      displayLabel:'Delay',           description:'Hold message for configured duration',    icon:faClock,       iconColor:'text-[#d97706]',     headerBg:'bg-[#fffbeb]',      inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'out',label:'out'},{id:'timeout',label:'Timeout'}] },
  ALARM:      { type:'ALARM',      displayLabel:'Alarm',           description:'Create or clear a device alarm',          icon:faBell,        iconColor:'text-warning',       headerBg:'bg-warning-subtle',  inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'created',label:'Created'},{id:'cleared',label:'Cleared'}] },
  ENRICHMENT: { type:'ENRICHMENT', displayLabel:'Enrichment',      description:'Fetch external context into message',     icon:faDatabase,    iconColor:'text-[#7c3aed]',     headerBg:'bg-[#f5f3ff]',      inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'success',label:'Success'},{id:'failure',label:'Failure'}] },
  REST_API:   { type:'REST_API',   displayLabel:'REST API',        description:'Outbound HTTP call to external service',  icon:faGlobe,       iconColor:'text-info',          headerBg:'bg-info-subtle',     inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'success',label:'Success'},{id:'failure',label:'Failure'}] },
  SAVE_TS:    { type:'SAVE_TS',    displayLabel:'Save Timeseries', description:'Persist telemetry to time-series DB',     icon:faServer,      iconColor:'text-success-fg',    headerBg:'bg-success-subtle',  inputs:[{id:'in',label:'in'}],                                        outputs:[{id:'success',label:'Success'},{id:'failure',label:'Failure'}] },
};

/* ─── Geometry helpers ────────────────────────────────────────────────────── */

function inputPortY(node: RuleNode, idx: number)  { return node.y + NODE_HEADER_H + PORT_TOP_OFFSET + idx * PORT_STEP; }
function outputPortY(node: RuleNode, idx: number) { return node.y + NODE_HEADER_H + PORT_TOP_OFFSET + idx * PORT_STEP; }
function nodeHeight(type: RuleNodeType) {
  const v = NODE_VISUALS[type];
  return NODE_HEADER_H + PORT_TOP_OFFSET + Math.max(v.inputs.length, v.outputs.length, 1) * PORT_STEP + 8;
}
function bezier(sx: number, sy: number, tx: number, ty: number) {
  const dx = Math.max(Math.abs(tx - sx) * 0.55, 70);
  return `M${sx},${sy} C${sx+dx},${sy} ${tx-dx},${ty} ${tx},${ty}`;
}

/* ─── Script execution ────────────────────────────────────────────────────── */

type RunResult = {
  output: unknown; portTaken?: string;
  sideEffects: string[]; error?: string; durationMs: number;
};

function runScript(node: RuleNode, msg: unknown, metadata: unknown, messageType: string): RunResult {
  const script = node.script ?? DEFAULT_SCRIPTS[node.type];
  const v = NODE_VISUALS[node.type];
  const sideEffects: string[] = [];
  const t0 = performance.now();
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function('msg','metadata','message_type','send','getDeviceLabel','getDeviceTags', script);
    const output = fn(
      JSON.parse(JSON.stringify(msg ?? {})),
      JSON.parse(JSON.stringify(metadata ?? {})),
      messageType,
      (p: unknown) => sideEffects.push(JSON.stringify(p, null, 2)),
      (id: string) => `Label-${id}`,
      () => ['sensor','iot'],
    );
    const durationMs = performance.now() - t0;
    let portTaken: string | undefined;
    if (v.outputs.length === 1) portTaken = v.outputs[0].id;
    else if (v.outputs.length > 1) {
      portTaken = node.type === 'FILTER'
        ? (output ? 'true' : 'false')
        : (v.outputs.find((p) => p.id === String(output))?.id ?? v.outputs.at(-1)?.id);
    }
    return { output, portTaken, sideEffects, durationMs };
  } catch (e) {
    return { output: undefined, sideEffects, error: String(e), durationMs: performance.now() - t0 };
  }
}

type TraceStep = { node: RuleNode; result: RunResult; edgeTaken: RuleEdge | null };

function traceChain(nodes: RuleNode[], edges: RuleEdge[], msg: unknown, metadata: unknown, messageType: string): TraceStep[] {
  if (!nodes.length) return [];
  const inIds = new Set(edges.map((e) => e.targetNodeId));
  let cur: RuleNode | undefined = nodes.find((n) => !inIds.has(n.nodeId)) ?? nodes[0];
  let curMsg: unknown = JSON.parse(JSON.stringify(msg ?? {}));
  const visited = new Set<string>();
  const steps: TraceStep[] = [];
  while (cur && !visited.has(cur.nodeId)) {
    visited.add(cur.nodeId);
    const result = runScript(cur, curMsg, metadata, messageType);
    if (!result.error && result.output !== undefined && ['TRANSFORM','ENRICHMENT'].includes(cur.type)) curMsg = result.output;
    const edgeTaken = result.portTaken && !result.error
      ? (edges.find((e) => e.sourceNodeId === cur!.nodeId && e.sourcePort === result.portTaken) ?? null)
      : null;
    steps.push({ node: cur, result, edgeTaken });
    if (result.error || !edgeTaken) break;
    cur = nodes.find((n) => n.nodeId === edgeTaken.targetNodeId);
  }
  return steps;
}

/* ─── CodeEditor ──────────────────────────────────────────────────────────── */

function CodeEditor({ value, onChange, readOnly = false, minHeight = 180 }: {
  value: string; onChange?: (v: string) => void; readOnly?: boolean; minHeight?: number;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumRef  = useRef<HTMLDivElement>(null);
  const lines = value.split('\n');
  function syncScroll() {
    if (lineNumRef.current && textareaRef.current)
      lineNumRef.current.scrollTop = textareaRef.current.scrollTop;
  }
  return (
    <div className="flex overflow-hidden rounded-lg border border-[#1e293b] text-xs"
      style={{ background:'#0d1117', fontFamily:'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Courier New",monospace', lineHeight:'1.25rem', minHeight }}>
      <div ref={lineNumRef} className="overflow-hidden select-none py-3 pl-3 pr-2 text-right"
        style={{ minWidth:40, borderRight:'1px solid #1e293b', background:'#0a0e14', color:'#374151' }}>
        {lines.map((_, i) => <div key={i} style={{ lineHeight:'1.25rem' }}>{i + 1}</div>)}
      </div>
      <textarea ref={textareaRef} value={value} onChange={(e) => onChange?.(e.target.value)}
        onScroll={syncScroll} readOnly={readOnly} spellCheck={false}
        className="flex-1 resize-none bg-transparent py-3 pl-3 pr-3 outline-none"
        style={{ color:'#e2e8f0', caretColor:'#60a5fa', lineHeight:'1.25rem' }} />
    </div>
  );
}

/* ─── JsonEditor ──────────────────────────────────────────────────────────── */

function JsonEditor({ label, value, onChange, rows = 4 }: {
  label: string; value: string; onChange: (v: string) => void; rows?: number;
}) {
  const valid = (() => { try { JSON.parse(value); return true; } catch { return false; } })();
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="font-mono text-xs font-semibold text-primary">{label}</span>
        {!valid && <span className="text-[10px] font-medium text-error">Invalid JSON</span>}
      </div>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={rows} spellCheck={false}
        className={cn(
          'w-full resize-none rounded-lg border bg-surface-base px-3 py-2 font-mono text-xs text-text-primary outline-none transition-colors',
          valid ? 'border-border focus:border-primary focus:ring-1 focus:ring-primary/20' : 'border-error/50 focus:border-error',
        )} />
    </div>
  );
}

/* ─── MsgTypeInput ────────────────────────────────────────────────────────── */

function MsgTypeInput({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <span className="mb-1 block font-mono text-xs font-semibold text-primary">message_type</span>
      <input value={value} onChange={(e) => onChange(e.target.value)} spellCheck={false}
        placeholder="POST_TELEMETRY_REQUEST"
        className="w-full rounded-lg border border-border bg-surface-base px-3 py-1.5 font-mono text-xs text-text-primary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20" />
    </div>
  );
}

/* ─── NodeResultPanel ─────────────────────────────────────────────────────── */

function NodeResultPanel({ result }: { result: RunResult | null }) {
  if (!result) return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border">
      <p className="text-xs text-text-secondary">Click Run to execute the script</p>
    </div>
  );
  if (result.error) return (
    <div className="space-y-2 rounded-xl border border-error/30 bg-error-subtle p-4">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCircleXmark} className="w-4 h-4 shrink-0 text-error" aria-hidden="true" />
        <span className="text-sm font-semibold text-error">Script Error</span>
      </div>
      <pre className="whitespace-pre-wrap break-all font-mono text-xs leading-relaxed" style={{ color:'var(--error)' }}>{result.error}</pre>
    </div>
  );
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border border-success/30 bg-success-subtle px-3 py-2">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 shrink-0 text-success" aria-hidden="true" />
          <span className="text-xs font-semibold" style={{ color:'var(--success-fg)' }}>Executed successfully</span>
        </div>
        <span className="tabular-nums text-[10px] text-text-secondary">{result.durationMs.toFixed(2)} ms</span>
      </div>
      {result.portTaken && (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-text-secondary">Output port</p>
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
            style={{ color: portColor(result.portTaken), borderColor: portColor(result.portTaken) + '66' }}>
            → {portEdgeLabel(result.portTaken) || result.portTaken}
          </span>
        </div>
      )}
      {result.output !== undefined && (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-text-secondary">Return value</p>
          <pre className="overflow-x-auto rounded-lg border border-border bg-surface-base p-3 font-mono text-xs text-text-primary">
            {JSON.stringify(result.output, null, 2)}
          </pre>
        </div>
      )}
      {result.sideEffects.length > 0 && (
        <div>
          <p className="mb-1.5 text-xs font-semibold text-text-secondary">Side effects — send()</p>
          <div className="space-y-2">
            {result.sideEffects.map((ef, i) => (
              <pre key={i} className="overflow-x-auto rounded-lg border border-border bg-surface-base p-3 font-mono text-xs text-text-primary">{ef}</pre>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── ChainTracePanel ─────────────────────────────────────────────────────── */

function ChainTracePanel({ steps, nodes }: { steps: TraceStep[] | null; nodes: RuleNode[] }) {
  if (!steps) return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border">
      <p className="text-xs text-text-secondary">Click Run Chain to trace execution</p>
    </div>
  );
  if (!steps.length) return (
    <div className="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border">
      <p className="text-xs text-text-secondary">No reachable nodes — add a Trigger to start</p>
    </div>
  );
  return (
    <div>
      {steps.map((step, i) => {
        const v    = NODE_VISUALS[step.node.type];
        const next = step.edgeTaken ? nodes.find((n) => n.nodeId === step.edgeTaken!.targetNodeId) : null;
        const isLast = i === steps.length - 1;
        return (
          <div key={step.node.nodeId} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                step.result.error ? 'bg-error-subtle text-error' : 'bg-primary-subtle text-primary')}>
                {i + 1}
              </div>
              {!isLast && <div className="my-1 w-px flex-1 bg-border" style={{ minHeight: 12 }} />}
            </div>
            <div className={cn('flex-1', isLast ? 'pb-1' : 'pb-4')}>
              <div className="mb-1 flex items-center gap-2">
                <FontAwesomeIcon icon={v.icon} className={cn('w-3 h-3 shrink-0', v.iconColor)} aria-hidden="true" />
                <span className="text-xs font-semibold text-text-primary">{step.node.label}</span>
                <span className="text-[10px] text-text-secondary">({v.displayLabel})</span>
              </div>
              {step.result.error ? (
                <p className="font-mono text-xs text-error leading-relaxed">{step.result.error}</p>
              ) : (
                <div className="flex flex-wrap items-center gap-2">
                  {step.result.portTaken && (
                    <span className="rounded-full border px-2 py-0.5 text-[10px] font-semibold"
                      style={{ color: portColor(step.result.portTaken), borderColor: portColor(step.result.portTaken) + '66' }}>
                      → {portEdgeLabel(step.result.portTaken) || step.result.portTaken}
                    </span>
                  )}
                  {next
                    ? <span className="text-[10px] text-text-secondary">→ {next.label}</span>
                    : <span className="text-[10px] italic text-text-disabled">terminal</span>}
                  <span className="tabular-nums text-[10px] text-text-disabled">{step.result.durationMs.toFixed(2)} ms</span>
                </div>
              )}
              {!step.result.error && step.result.output !== undefined && typeof step.result.output !== 'object' && (
                <div className="mt-1 font-mono text-[10px] text-text-secondary">return: {String(step.result.output)}</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─── NodeDebugModal ──────────────────────────────────────────────────────── */

function NodeDebugModal({ node, msg, onMsgChange, metadata, onMetadataChange, messageType, onMessageTypeChange, onClose }: {
  node: RuleNode;
  msg: string; onMsgChange: (v: string) => void;
  metadata: string; onMetadataChange: (v: string) => void;
  messageType: string; onMessageTypeChange: (v: string) => void;
  onClose: () => void;
}) {
  const [result, setResult] = useState<RunResult | null>(null);
  const visual = NODE_VISUALS[node.type];

  function run() {
    try {
      setResult(runScript(node, JSON.parse(msg), JSON.parse(metadata), messageType));
    } catch (e) {
      setResult({ output: undefined, sideEffects: [], error: 'JSON parse error: ' + String(e), durationMs: 0 });
    }
  }

  return (
    <Modal open onClose={onClose} title={`Debug — ${node.label}`} description={visual.description}
      className="max-w-2xl" scrollable
      footer={
        <div className="flex w-full items-center gap-2">
          <button onClick={run}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3" aria-hidden="true" /> Run
          </button>
          <button onClick={onClose}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">
            Close
          </button>
        </div>
      }>
      <div className="grid grid-cols-[220px_1fr] gap-5">
        <div className="space-y-3">
          <JsonEditor label="msg" value={msg} onChange={onMsgChange} />
          <JsonEditor label="metadata" value={metadata} onChange={onMetadataChange} />
          <MsgTypeInput value={messageType} onChange={onMessageTypeChange} />
          <div>
            <p className="mb-1.5 text-xs font-semibold text-text-secondary">Script</p>
            <CodeEditor value={node.script ?? DEFAULT_SCRIPTS[node.type]} readOnly minHeight={120} />
          </div>
        </div>
        <NodeResultPanel result={result} />
      </div>
    </Modal>
  );
}

/* ─── RulesetDebugModal ───────────────────────────────────────────────────── */

function RulesetDebugModal({ nodes, edges, chainName, msg, onMsgChange, metadata, onMetadataChange, messageType, onMessageTypeChange, onClose }: {
  nodes: RuleNode[]; edges: RuleEdge[]; chainName: string;
  msg: string; onMsgChange: (v: string) => void;
  metadata: string; onMetadataChange: (v: string) => void;
  messageType: string; onMessageTypeChange: (v: string) => void;
  onClose: () => void;
}) {
  const [steps, setSteps] = useState<TraceStep[] | null>(null);

  function run() {
    try {
      setSteps(traceChain(nodes, edges, JSON.parse(msg), JSON.parse(metadata), messageType));
    } catch (e) {
      setSteps([{ node: nodes[0] ?? { nodeId:'err', type:'TRIGGER', label:'Error', x:0, y:0 }, result:{ output:undefined, sideEffects:[], error:'JSON parse error: '+String(e), durationMs:0 }, edgeTaken:null }]);
    }
  }

  return (
    <Modal open onClose={onClose} title={`Debug — ${chainName}`} description="Trace message execution through the rule chain"
      className="max-w-3xl" scrollable
      footer={
        <div className="flex w-full items-center gap-2">
          <button onClick={run} disabled={!nodes.length}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
            <FontAwesomeIcon icon={faPlay} className="w-3 h-3" aria-hidden="true" /> Run Chain
          </button>
          <button onClick={onClose}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">
            Close
          </button>
        </div>
      }>
      <div className="grid grid-cols-[220px_1fr] gap-5">
        <div className="space-y-3">
          <JsonEditor label="msg" value={msg} onChange={onMsgChange} />
          <JsonEditor label="metadata" value={metadata} onChange={onMetadataChange} />
          <MsgTypeInput value={messageType} onChange={onMessageTypeChange} />
        </div>
        <ChainTracePanel steps={steps} nodes={nodes} />
      </div>
    </Modal>
  );
}

/* ─── NodeEditorPanel ─────────────────────────────────────────────────────── */

function NodeEditorPanel({ node, readOnly, draftLabel, draftScript, onLabelChange, onScriptChange, onApply, onClose, onDelete, onReset, onDebug }: {
  node: RuleNode; readOnly: boolean;
  draftLabel: string; draftScript: string;
  onLabelChange: (v: string) => void; onScriptChange: (v: string) => void;
  onApply: () => void; onClose: () => void; onDelete: () => void; onReset: () => void;
  onDebug: () => void;
}) {
  const visual = NODE_VISUALS[node.type];
  return (
    <aside className="flex w-80 shrink-0 flex-col overflow-hidden border-l border-border bg-surface-raised">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-border px-4 py-3">
        <div className={cn('flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', visual.headerBg)}>
          <FontAwesomeIcon icon={visual.icon} className={cn('w-3.5 h-3.5', visual.iconColor)} aria-hidden="true" />
        </div>
        <p className="flex-1 min-w-0 text-[11px] font-bold uppercase tracking-widest text-text-secondary">{visual.displayLabel}</p>
        <button onClick={onDebug} title="Debug node" aria-label="Debug node"
          className="shrink-0 rounded p-1 text-text-secondary transition-colors hover:bg-primary-subtle hover:text-primary">
          <FontAwesomeIcon icon={faBug} className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        {!readOnly && (
          <button onClick={onDelete} title="Delete node" aria-label="Delete node"
            className="shrink-0 rounded p-1 text-text-secondary transition-colors hover:bg-error-subtle hover:text-error">
            <FontAwesomeIcon icon={faTrash} className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        )}
        <button onClick={onClose} aria-label="Close panel"
          className="shrink-0 rounded p-1 text-text-secondary transition-colors hover:text-text-primary">
          <FontAwesomeIcon icon={faXmark} className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>
      {/* Body */}
      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold text-text-secondary">Label</label>
          <input value={draftLabel} onChange={(e) => onLabelChange(e.target.value)} readOnly={readOnly}
            className={cn('w-full rounded-lg border border-border bg-surface-base px-3 py-1.5 text-sm text-text-primary outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20', readOnly && 'cursor-default opacity-60')} />
        </div>
        <p className="text-xs -mt-2 leading-relaxed text-text-secondary">{visual.description}</p>
        <div>
          <p className="mb-2 text-xs font-semibold text-text-secondary">Available inputs</p>
          <div className="flex flex-wrap gap-1.5">
            {(['msg','metadata','message_type'] as const).map((v) => (
              <span key={v} className="rounded-md border border-primary/25 bg-primary-subtle px-2 py-0.5 font-mono text-xs font-semibold text-primary">{v}</span>
            ))}
          </div>
        </div>
        {(visual.inputs.length > 0 || visual.outputs.length > 0) && (
          <div className="flex gap-6">
            {visual.inputs.length > 0 && (
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">In</p>
                {visual.inputs.map((p) => (
                  <div key={p.id} className="mb-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full border-2 border-border-strong bg-surface-base" />
                    <span className="font-mono text-[11px] text-text-secondary">{p.id}</span>
                  </div>
                ))}
              </div>
            )}
            {visual.outputs.length > 0 && (
              <div>
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">Out</p>
                {visual.outputs.map((p) => (
                  <div key={p.id} className="mb-1 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: portColor(p.id) }} />
                    <span className="font-mono text-[11px]" style={{ color: portColor(p.id) }}>{p.id}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs font-semibold text-text-secondary">JavaScript</p>
            {!readOnly && (
              <button onClick={onReset} className="flex items-center gap-1 text-xs text-text-secondary transition-colors hover:text-primary">
                <FontAwesomeIcon icon={faRotateLeft} className="w-3 h-3" aria-hidden="true" /> Reset
              </button>
            )}
          </div>
          <CodeEditor value={draftScript} onChange={onScriptChange} readOnly={readOnly} />
        </div>
      </div>
      {/* Footer */}
      {!readOnly && (
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
          <button onClick={onApply}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-fg transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus">
            <FontAwesomeIcon icon={faCheck} className="w-3 h-3" aria-hidden="true" /> Apply
          </button>
          <button onClick={onClose}
            className="rounded-lg border border-border px-3 py-1.5 text-xs font-semibold text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">
            Close
          </button>
        </div>
      )}
    </aside>
  );
}

/* ─── Public ref API ──────────────────────────────────────────────────────── */

export type RulesetEditorRef = { openRulesetDebug: () => void };

/* ─── Main component ──────────────────────────────────────────────────────── */

export type RulesetEditorProps = {
  initialNodes?: RuleNode[];
  initialEdges?: RuleEdge[];
  readOnly?: boolean;
  className?: string;
  chainName?: string;
  ref?: React.Ref<RulesetEditorRef>;
};

export function RulesetEditor({
  initialNodes = [], initialEdges = [],
  readOnly = false, className,
  chainName = 'Rule Chain', ref,
}: RulesetEditorProps) {
  const [nodes, setNodes]         = useState<RuleNode[]>(initialNodes);
  const [edges, setEdges]         = useState<RuleEdge[]>(initialEdges);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [dragNodeId, setDragNodeId] = useState<string | null>(null);
  const [paletteDrag, setPaletteDrag] = useState<RuleNodeType | null>(null);
  const [connecting, setConnecting]   = useState<{ nodeId: string; portIdx: number; x: number; y: number } | null>(null);
  const [mouse, setMouse]           = useState({ x: 0, y: 0 });
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [draftLabel, setDraftLabel]       = useState('');
  const [draftScript, setDraftScript]     = useState('');
  const [debugNodeId, setDebugNodeId]     = useState<string | null>(null);
  const [rulesetDebugOpen, setRulesetDebugOpen] = useState(false);
  const [dbgMsg,     setDbgMsg]     = useState('{\n  "temperature": 92,\n  "humidity": 65\n}');
  const [dbgMeta,    setDbgMeta]    = useState('{\n  "deviceId": "dev-001",\n  "zone": "A"\n}');
  const [dbgMsgType, setDbgMsgType] = useState('POST_TELEMETRY_REQUEST');

  const containerRef  = useRef<HTMLDivElement>(null);
  const dragOffset    = useRef({ x: 0, y: 0 });
  const nodeSeq       = useRef(initialNodes.length);
  const edgeSeq       = useRef(initialEdges.length);
  const dragMoved     = useRef(false);
  const dragStartPos  = useRef({ x: 0, y: 0 });

  useImperativeHandle(ref, () => ({ openRulesetDebug: () => setRulesetDebugOpen(true) }), []);

  function toLocal(e: React.MouseEvent | React.DragEvent) {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return { x: 0, y: 0 };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function openEditor(nodeId: string) {
    const node = nodes.find((n) => n.nodeId === nodeId);
    if (!node) return;
    setEditingNodeId(nodeId);
    setDraftLabel(node.label);
    setDraftScript(node.script ?? DEFAULT_SCRIPTS[node.type]);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    if (!paletteDrag) return;
    const pt = toLocal(e);
    nodeSeq.current++;
    setNodes((p) => [...p, {
      nodeId: `n${nodeSeq.current}`, type: paletteDrag,
      label: NODE_VISUALS[paletteDrag].displayLabel,
      x: Math.round(pt.x - NODE_W / 2), y: Math.round(pt.y - NODE_HEADER_H / 2),
      script: DEFAULT_SCRIPTS[paletteDrag],
    }]);
    setPaletteDrag(null);
  }

  function onNodeMouseDown(e: React.MouseEvent, nodeId: string) {
    if (connecting || readOnly) return;
    e.stopPropagation();
    setSelectedId(nodeId);
    setDragNodeId(nodeId);
    dragMoved.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    const node = nodes.find((n) => n.nodeId === nodeId)!;
    const r = containerRef.current!.getBoundingClientRect();
    dragOffset.current = { x: e.clientX - r.left - node.x, y: e.clientY - r.top - node.y };
  }

  function onNodeMouseUp(nodeId: string) {
    if (!dragMoved.current && !connecting) openEditor(nodeId);
  }

  function onMouseMove(e: React.MouseEvent) {
    const pt = toLocal(e);
    setMouse(pt);
    if (dragNodeId) {
      const dx = e.clientX - dragStartPos.current.x;
      const dy = e.clientY - dragStartPos.current.y;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved.current = true;
      const r = containerRef.current!.getBoundingClientRect();
      setNodes((p) => p.map((n) =>
        n.nodeId === dragNodeId
          ? { ...n, x: e.clientX - r.left - dragOffset.current.x, y: e.clientY - r.top - dragOffset.current.y }
          : n
      ));
    }
  }

  function onMouseUp() { setDragNodeId(null); setConnecting(null); }
  function onCanvasMouseDown() { setSelectedId(null); setConnecting(null); }

  function onOutputPortDown(e: React.MouseEvent, nodeId: string, portIdx: number) {
    e.stopPropagation();
    if (readOnly) return;
    const node = nodes.find((n) => n.nodeId === nodeId)!;
    setConnecting({ nodeId, portIdx, x: node.x + NODE_W, y: outputPortY(node, portIdx) });
    setMouse({ x: node.x + NODE_W, y: outputPortY(node, portIdx) });
  }

  function onInputPortUp(e: React.MouseEvent, nodeId: string, portIdx: number) {
    e.stopPropagation();
    if (!connecting || connecting.nodeId === nodeId || readOnly) { setConnecting(null); return; }
    const src = nodes.find((n) => n.nodeId === connecting.nodeId);
    const tgt = nodes.find((n) => n.nodeId === nodeId);
    if (!src || !tgt) { setConnecting(null); return; }
    const srcPort = NODE_VISUALS[src.type].outputs[connecting.portIdx]?.id;
    const tgtPort = NODE_VISUALS[tgt.type].inputs[portIdx]?.id;
    if (!srcPort || !tgtPort) { setConnecting(null); return; }
    edgeSeq.current++;
    const newEdge: RuleEdge = { edgeId: `e${edgeSeq.current}`, sourceNodeId: connecting.nodeId, sourcePort: srcPort, targetNodeId: nodeId, targetPort: tgtPort };
    setEdges((p) => p.some((ed) => ed.sourceNodeId === newEdge.sourceNodeId && ed.sourcePort === newEdge.sourcePort && ed.targetNodeId === newEdge.targetNodeId) ? p : [...p, newEdge]);
    setConnecting(null);
  }

  function deleteNode(nodeId: string) {
    setNodes((p) => p.filter((n) => n.nodeId !== nodeId));
    setEdges((p) => p.filter((ed) => ed.sourceNodeId !== nodeId && ed.targetNodeId !== nodeId));
    setSelectedId(null);
    if (editingNodeId === nodeId) setEditingNodeId(null);
    if (debugNodeId === nodeId) setDebugNodeId(null);
  }

  function deleteEdge(edgeId: string) { setEdges((p) => p.filter((ed) => ed.edgeId !== edgeId)); }

  function applyEdit() {
    if (!editingNodeId) return;
    setNodes((p) => p.map((n) => n.nodeId === editingNodeId ? { ...n, label: draftLabel.trim() || n.label, script: draftScript } : n));
  }

  const liveStart = connecting
    ? (() => { const n = nodes.find((x) => x.nodeId === connecting.nodeId); return n ? { x: n.x + NODE_W, y: outputPortY(n, connecting.portIdx) } : null; })()
    : null;

  const editingNode = editingNodeId ? nodes.find((n) => n.nodeId === editingNodeId) ?? null : null;
  const debugNode   = debugNodeId   ? nodes.find((n) => n.nodeId === debugNodeId)   ?? null : null;

  return (
    <div className={cn('flex h-full min-h-0 overflow-hidden', className)}>

      {/* ── Palette ── */}
      {!readOnly && (
        <aside className="flex w-48 shrink-0 flex-col overflow-y-auto border-r border-border bg-surface-raised">
          <div className="flex flex-col gap-1 p-3">
            <p className="mb-1 px-1 text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Node Types</p>
            {(Object.values(NODE_VISUALS) as NodeVisual[]).map((v) => (
              <div key={v.type} draggable onDragStart={() => setPaletteDrag(v.type)} onDragEnd={() => setPaletteDrag(null)}
                title={v.description}
                className="flex cursor-grab select-none items-center gap-2.5 rounded-lg border border-border bg-surface-base px-3 py-2 text-sm font-medium text-text-primary transition-colors hover:border-primary hover:bg-primary-subtle active:cursor-grabbing">
                <FontAwesomeIcon icon={v.icon} className={cn('h-3.5 w-3.5 shrink-0', v.iconColor)} aria-hidden="true" />
                <span className="truncate text-xs">{v.displayLabel}</span>
              </div>
            ))}
          </div>
          <div className="mt-auto space-y-2 border-t border-border p-3">
            <button onClick={() => setRulesetDebugOpen(true)}
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-border px-2 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:text-primary">
              <FontAwesomeIcon icon={faBug} className="w-3 h-3" aria-hidden="true" /> Debug Chain
            </button>
            <p className="text-[11px] leading-relaxed text-text-secondary">
              Drag nodes onto the canvas.<br />
              Click <span className="font-bold text-primary">●</span> output → <span className="font-bold">○</span> input to wire.<br />
              Click a node to edit its script.
            </p>
          </div>
        </aside>
      )}

      {/* ── Canvas ── */}
      <div ref={containerRef}
        className="relative min-h-0 flex-1 overflow-hidden select-none"
        style={{ backgroundImage:'radial-gradient(circle, var(--border) 1.5px, transparent 1.5px)', backgroundSize:'24px 24px', backgroundColor:'var(--surface-base)', cursor: connecting ? 'crosshair' : 'default' }}
        onDrop={onDrop} onDragOver={(e) => e.preventDefault()}
        onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseDown={onCanvasMouseDown}>

        <svg className="absolute inset-0 h-full w-full overflow-visible" style={{ zIndex:10, pointerEvents:'none' }}>
          <defs>
            <marker id="re-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0,8 3,0 6" fill="context-stroke" />
            </marker>
          </defs>
          {edges.map((edge) => {
            const src = nodes.find((n) => n.nodeId === edge.sourceNodeId);
            const tgt = nodes.find((n) => n.nodeId === edge.targetNodeId);
            if (!src || !tgt) return null;
            const srcIdx = NODE_VISUALS[src.type].outputs.findIndex((p) => p.id === edge.sourcePort);
            const tgtIdx = NODE_VISUALS[tgt.type].inputs.findIndex((p)  => p.id === edge.targetPort);
            if (srcIdx < 0 || tgtIdx < 0) return null;
            const sx = src.x + NODE_W, sy = outputPortY(src, srcIdx);
            const tx = tgt.x,          ty = inputPortY(tgt, tgtIdx);
            const color = portColor(edge.sourcePort), label = portEdgeLabel(edge.sourcePort);
            const midX = (sx + tx) / 2, midY = (sy + ty) / 2;
            const lw = label ? label.length * 5.5 + 16 : 0;
            return (
              <g key={edge.edgeId} className="group">
                <path d={bezier(sx,sy,tx,ty)} stroke="transparent" strokeWidth={14} fill="none"
                  style={{ pointerEvents:'auto', cursor: readOnly ? 'default' : 'pointer' }}
                  onClick={() => !readOnly && deleteEdge(edge.edgeId)} />
                <path d={bezier(sx,sy,tx,ty)} stroke={color} strokeWidth={2} fill="none"
                  markerEnd="url(#re-arrow)" className="transition-opacity group-hover:opacity-60" />
                {label && (
                  <g style={{ pointerEvents:'none' }}>
                    <rect x={midX-lw/2} y={midY-9} width={lw} height={18} rx={9} fill="var(--surface-base)" stroke={color} strokeWidth={1.5} />
                    <text x={midX} y={midY+4.5} textAnchor="middle" fontSize="9" fontFamily="system-ui,sans-serif" fontWeight="700" fill={color}>{label}</text>
                  </g>
                )}
              </g>
            );
          })}
          {liveStart && (
            <path d={bezier(liveStart.x, liveStart.y, mouse.x, mouse.y)}
              stroke="var(--border-strong)" strokeWidth={2} fill="none" strokeDasharray="6 3" />
          )}
          {nodes.map((node) => {
            const v = NODE_VISUALS[node.type];
            return (
              <g key={`ports-${node.nodeId}`}>
                {v.inputs.map((port, i) => (
                  <circle key={`in-${port.id}`} cx={node.x} cy={inputPortY(node, i)} r={PORT_R}
                    fill="var(--surface-base)" stroke="var(--border-strong)" strokeWidth={2}
                    style={{ pointerEvents:'auto', cursor:'crosshair' }}
                    className="transition-colors hover:fill-primary-subtle hover:stroke-primary"
                    onMouseUp={(e) => onInputPortUp(e as unknown as React.MouseEvent, node.nodeId, i)} />
                ))}
                {v.outputs.map((port, i) => {
                  const c = portColor(port.id);
                  return (
                    <circle key={`out-${port.id}`} cx={node.x + NODE_W} cy={outputPortY(node, i)} r={PORT_R}
                      fill={c} stroke={c} strokeWidth={1.5}
                      style={{ pointerEvents:'auto', cursor:'crosshair', opacity:0.9 }}
                      className="transition-opacity hover:opacity-100"
                      onMouseDown={(e) => { e.stopPropagation(); onOutputPortDown(e as unknown as React.MouseEvent, node.nodeId, i); }} />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => {
          const v = NODE_VISUALS[node.type];
          const isEditing  = editingNodeId === node.nodeId;
          const isSelected = selectedId === node.nodeId;
          const isDragging = dragNodeId === node.nodeId;
          return (
            <div key={node.nodeId}
              className={cn('absolute rounded-xl border-2 bg-surface-base transition-shadow',
                isEditing ? 'border-primary shadow-lg ring-2 ring-primary/30'
                  : isSelected ? 'border-primary/70 shadow-md'
                  : 'border-border shadow-sm hover:border-border-strong hover:shadow-md',
                isDragging ? 'cursor-grabbing shadow-xl' : 'cursor-pointer')}
              style={{ left:node.x, top:node.y, width:NODE_W, height:nodeHeight(node.type), zIndex: isSelected||isEditing ? 20 : 5 }}
              onMouseDown={(e) => onNodeMouseDown(e, node.nodeId)}
              onMouseUp={() => onNodeMouseUp(node.nodeId)}>
              <div className={cn('flex items-center gap-2 rounded-t-[10px] border-b border-border px-3', v.headerBg)} style={{ height:NODE_HEADER_H }}>
                <FontAwesomeIcon icon={v.icon} className={cn('h-3.5 w-3.5 shrink-0', v.iconColor)} aria-hidden="true" />
                <span className="flex-1 truncate text-xs font-semibold leading-tight text-text-primary">{node.label}</span>
              </div>
              <div className="flex justify-between px-5" style={{ paddingTop:PORT_TOP_OFFSET }}>
                <div className="flex flex-col" style={{ gap:PORT_STEP-14 }}>
                  {v.inputs.map((p) => <span key={p.id} className="text-[10px] leading-none text-text-secondary">{p.label}</span>)}
                </div>
                <div className="flex flex-col items-end" style={{ gap:PORT_STEP-14 }}>
                  {v.outputs.map((p) => <span key={p.id} style={{ color:portColor(p.id) }} className="text-[10px] font-medium leading-none">{p.label}</span>)}
                </div>
              </div>
            </div>
          );
        })}

        {nodes.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex select-none flex-col items-center justify-center gap-1">
            <p className="text-sm font-medium text-text-secondary">Drag nodes from the palette to start</p>
            <p className="text-xs text-text-secondary">
              Connect <span className="font-bold text-primary">●</span> output ports to <span className="font-bold">○</span> input ports
            </p>
          </div>
        )}
      </div>

      {/* ── Node editor panel ── */}
      {editingNode && (
        <NodeEditorPanel
          node={editingNode} readOnly={readOnly}
          draftLabel={draftLabel} draftScript={draftScript}
          onLabelChange={setDraftLabel} onScriptChange={setDraftScript}
          onApply={applyEdit} onClose={() => setEditingNodeId(null)}
          onDelete={() => deleteNode(editingNode.nodeId)}
          onReset={() => setDraftScript(DEFAULT_SCRIPTS[editingNode.type])}
          onDebug={() => setDebugNodeId(editingNode.nodeId)}
        />
      )}

      {/* ── Node debug modal ── */}
      {debugNode && (
        <NodeDebugModal node={debugNode}
          msg={dbgMsg} onMsgChange={setDbgMsg}
          metadata={dbgMeta} onMetadataChange={setDbgMeta}
          messageType={dbgMsgType} onMessageTypeChange={setDbgMsgType}
          onClose={() => setDebugNodeId(null)} />
      )}

      {/* ── Ruleset debug modal ── */}
      {rulesetDebugOpen && (
        <RulesetDebugModal nodes={nodes} edges={edges} chainName={chainName}
          msg={dbgMsg} onMsgChange={setDbgMsg}
          metadata={dbgMeta} onMetadataChange={setDbgMeta}
          messageType={dbgMsgType} onMessageTypeChange={setDbgMsgType}
          onClose={() => setRulesetDebugOpen(false)} />
      )}
    </div>
  );
}
