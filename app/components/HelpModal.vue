<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <div
      class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Gateway Architecture & QA Tests</h3>
              <p class="text-xs text-slate-400">Developer reference for validation and simulation</p>
            </div>
          </div>

          <button
            type="button"
            @click="$emit('close')"
            class="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="py-4 space-y-4 text-xs text-slate-300">
          <!-- Section 1 -->
          <div>
            <h4 class="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
              QA Simulation Trigger Numbers
            </h4>
            <p class="text-slate-400 mb-2 leading-relaxed">
              When using the default Cloud Direct simulator, you can test both success and provider failure handling using these dedicated phone numbers:
            </p>
            <div class="space-y-1.5 font-mono text-[11px]">
              <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span class="text-emerald-400 font-bold">+1 (555) 234-8901</span>
                <span class="text-slate-400">Normal 200 OK Delivery</span>
              </div>
              <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span class="text-rose-400 font-bold">+1 (555) 000-0100</span>
                <span class="text-slate-400">Simulates Carrier Timeout (504)</span>
              </div>
              <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span class="text-rose-400 font-bold">+1 (555) 000-0144</span>
                <span class="text-slate-400">Simulates Unreachable Carrier (422)</span>
              </div>
              <div class="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between">
                <span class="text-rose-400 font-bold">+1 (555) 000-9999</span>
                <span class="text-slate-400">Simulates Depleted Credits (402)</span>
              </div>
            </div>
          </div>

          <!-- Section 2 -->
          <div>
            <h4 class="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              GSM-7 vs UCS-2 Encoding Mechanics
            </h4>
            <p class="text-slate-400 leading-relaxed">
              Standard GSM-7 text supports <strong>160 characters</strong> in a single SMS (153 chars for multi-part concatenated SMS). If an emoji, special accent, or non-Latin script is detected, the gateway automatically falls back to <strong>UCS-2 (Unicode)</strong> which is capped at <strong>70 characters</strong> per segment.
            </p>
          </div>

          <!-- Section 3 -->
          <div>
            <h4 class="font-bold text-white mb-1.5 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-purple-400"></span>
              Live Provider Connection
            </h4>
            <p class="text-slate-400 leading-relaxed">
              To connect a live Twilio or Custom HTTP Gateway, set <code class="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded font-mono">TWILIO_ACCOUNT_SID</code> and <code class="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded font-mono">TWILIO_AUTH_TOKEN</code> in your environment or <code class="text-indigo-300 bg-slate-800 px-1 py-0.5 rounded font-mono">.env</code>.
            </p>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
