<template>
  <div v-if="isOpen && record" class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div class="flex min-h-full items-center justify-center p-4">
      <div
        class="relative w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 overflow-hidden"
      >
        <!-- Modal Header -->
        <div class="flex items-center justify-between pb-4 border-b border-slate-800">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-white">Transmission Telemetry</h3>
              <p class="text-xs font-mono text-slate-400">{{ record.id }}</p>
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

        <!-- Details Grid -->
        <div class="py-4 space-y-4 text-xs">
          <!-- Status Banner -->
          <div
            :class="[
              'p-3 rounded-xl border flex items-center justify-between',
              record.status === 'delivered'
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300'
                : 'bg-rose-500/10 border-rose-500/20 text-rose-300'
            ]"
          >
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full" :class="record.status === 'delivered' ? 'bg-emerald-400' : 'bg-rose-400'"></span>
              <span class="font-bold uppercase tracking-wider text-[11px]">{{ record.status }}</span>
            </div>
            <span class="font-mono text-[11px]">{{ record.latencyMs }}ms roundtrip</span>
          </div>

          <!-- Key Metrics -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Recipient</span>
              <span class="font-mono text-slate-100 font-semibold mt-0.5 block truncate">{{ record.recipient }}</span>
            </div>
            <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Carrier</span>
              <span class="text-slate-100 font-semibold mt-0.5 block truncate">{{ record.carrier || 'Direct' }}</span>
            </div>
            <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Gateway Provider</span>
              <span class="text-slate-100 font-semibold mt-0.5 block truncate">{{ record.provider }}</span>
            </div>
            <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Encoding / Parts</span>
              <span class="font-mono text-slate-100 font-semibold mt-0.5 block">{{ record.encoding }} ({{ record.segments }} sms)</span>
            </div>
            <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Characters</span>
              <span class="font-mono text-slate-100 font-semibold mt-0.5 block">{{ record.characterCount }} chars</span>
            </div>
            <div class="bg-slate-950/70 p-3 rounded-xl border border-slate-800">
              <span class="text-slate-500 block text-[10px] uppercase font-bold">Estimated Cost</span>
              <span class="font-mono text-slate-100 font-semibold mt-0.5 block">${{ record.costEstimate || 0 }}</span>
            </div>
          </div>

          <!-- Error Details if failed -->
          <div v-if="record.errorMessage" class="bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl text-rose-300">
            <span class="font-bold block text-[11px] mb-1">Provider Error Code: {{ record.errorCode || 'UNKNOWN' }}</span>
            <p class="leading-relaxed">{{ record.errorMessage }}</p>
          </div>

          <!-- Message Text -->
          <div>
            <span class="text-slate-400 block mb-1 font-medium">Message Body:</span>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-slate-300 leading-relaxed whitespace-pre-wrap select-text">
              {{ record.message }}
            </div>
          </div>

          <!-- Raw JSON -->
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-slate-400 font-medium">Raw Audit Payload:</span>
              <button
                type="button"
                @click="copyJson"
                class="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium"
              >
                {{ copied ? '✓ Copied' : 'Copy JSON' }}
              </button>
            </div>
            <pre class="p-3 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-400 overflow-x-auto max-h-40 leading-relaxed">{{ formattedJson }}</pre>
          </div>
        </div>

        <!-- Footer -->
        <div class="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { SmsRecord } from '../types/sms'

const props = defineProps<{
  isOpen: boolean
  record: SmsRecord | null
}>()

defineEmits<{
  (e: 'close'): void
}>()

const copied = ref(false)

const formattedJson = computed(() => {
  return props.record ? JSON.stringify(props.record, null, 2) : ''
})

async function copyJson() {
  if (!formattedJson.value) return
  await navigator.clipboard.writeText(formattedJson.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>
