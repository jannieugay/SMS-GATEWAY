<template>
  <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md flex flex-col h-full">
    <!-- Header with controls -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-5">
      <div>
        <div class="flex items-center gap-2">
          <h2 class="text-base font-semibold text-white tracking-tight">Transmission History</h2>
          <span class="text-xs px-2 py-0.5 rounded-full font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
            {{ filteredLogs.length }}
          </span>
        </div>
        <p class="text-xs text-slate-400">Audit trail of recent carrier delivery receipts and attempts</p>
      </div>

      <!-- Actions Toolbar -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          @click="$emit('refresh-history')"
          :disabled="isLoadingHistory"
          class="p-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition disabled:opacity-50"
          title="Refresh History"
        >
          <svg :class="['w-4 h-4', isLoadingHistory ? 'animate-spin text-indigo-400' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <button
          type="button"
          @click="$emit('export-csv')"
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition"
          title="Download CSV report"
        >
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span class="hidden sm:inline">Export CSV</span>
        </button>

        <button
          type="button"
          @click="$emit('clear-history')"
          class="p-2 rounded-lg text-xs font-medium text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition"
          title="Clear all logs"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <!-- Search Input -->
      <div class="relative flex-1">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by phone, message, carrier..."
          class="w-full pl-9 pr-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
        />
      </div>

      <!-- Status Filter Tabs -->
      <div class="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800/80">
        <button
          type="button"
          @click="statusFilter = 'all'"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition',
            statusFilter === 'all'
              ? 'bg-slate-800 text-white shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          All
        </button>
        <button
          type="button"
          @click="statusFilter = 'delivered'"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition flex items-center gap-1',
            statusFilter === 'delivered'
              ? 'bg-emerald-500/20 text-emerald-300 shadow-sm border border-emerald-500/30'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          Delivered
        </button>
        <button
          type="button"
          @click="statusFilter = 'failed'"
          :class="[
            'px-2.5 py-1 rounded-md text-xs font-medium transition flex items-center gap-1',
            statusFilter === 'failed'
              ? 'bg-rose-500/20 text-rose-300 shadow-sm border border-rose-500/30'
              : 'text-slate-400 hover:text-slate-200'
          ]"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          Failed
        </button>
      </div>
    </div>

    <!-- Attempt Records Feed -->
    <div class="flex-1 overflow-y-auto max-h-[520px] pr-1 space-y-3">
      <!-- Empty State -->
      <div
        v-if="filteredLogs.length === 0"
        class="py-12 px-4 text-center rounded-xl border border-dashed border-slate-800 bg-slate-950/30"
      >
        <div class="w-12 h-12 mx-auto rounded-full bg-slate-800/80 text-slate-500 flex items-center justify-center mb-3">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <h3 class="text-sm font-semibold text-slate-300">No Sending Attempts Found</h3>
        <p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          {{ searchQuery ? 'No logs match your active search filter. Try clearing your search.' : 'Send an SMS using the composer on the left to start tracking carrier transmission logs.' }}
        </p>
      </div>

      <!-- Log Item Card -->
      <div
        v-for="log in filteredLogs"
        :key="log.id"
        class="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 group relative"
      >
        <!-- Top row: Status, Recipient, Time -->
        <div class="flex items-start justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <!-- Status Badge -->
            <span
              :class="[
                'inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border',
                log.status === 'delivered'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : log.status === 'failed'
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              ]"
            >
              <span
                :class="[
                  'w-1.5 h-1.5 rounded-full',
                  log.status === 'delivered' ? 'bg-emerald-400' : log.status === 'failed' ? 'bg-rose-400' : 'bg-amber-400'
                ]"
              ></span>
              <span class="capitalize">{{ log.status }}</span>
            </span>

            <!-- Recipient Phone -->
            <span class="font-mono text-xs font-bold text-white tracking-wide">
              {{ log.recipient }}
            </span>

            <!-- Carrier Tag -->
            <span v-if="log.carrier" class="text-[10px] text-slate-400 px-1.5 py-0.5 rounded bg-slate-800/80 hidden sm:inline">
              {{ log.carrier }}
            </span>
          </div>

          <!-- Timestamp & Latency -->
          <div class="flex items-center gap-2 text-right">
            <span v-if="log.latencyMs" class="text-[10px] text-slate-500 font-mono hidden md:inline">
              {{ log.latencyMs }}ms
            </span>
            <span class="text-[11px] text-slate-400 whitespace-nowrap" :title="log.createdAt">
              {{ formatRelativeTime(log.createdAt) }}
            </span>
          </div>
        </div>

        <!-- Message Body -->
        <p class="text-xs text-slate-300 font-normal leading-relaxed line-clamp-2 select-text bg-slate-900/50 p-2 rounded-lg border border-slate-800/50">
          {{ log.message }}
        </p>

        <!-- Error Detail Banner if Failed -->
        <div v-if="log.errorMessage" class="mt-2 text-[11px] text-rose-400 flex items-center gap-1.5 font-medium bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="truncate">{{ log.errorMessage }}</span>
        </div>

        <!-- Footer Meta & Quick Actions -->
        <div class="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <div class="flex items-center gap-2">
            <span class="font-mono">{{ log.encoding }}</span>
            <span>•</span>
            <span>{{ log.segments }} {{ log.segments === 1 ? 'segment' : 'segments' }}</span>
            <span v-if="log.costEstimate" class="hidden sm:inline">•</span>
            <span v-if="log.costEstimate" class="text-slate-400 hidden sm:inline">${{ log.costEstimate }}</span>
          </div>

          <!-- Hover Actions -->
          <div class="flex items-center gap-1">
            <button
              type="button"
              @click="$emit('resend', log)"
              class="px-2 py-0.5 rounded text-[11px] font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition"
              title="Copy to Composer"
            >
              Prefill Form
            </button>
            <button
              type="button"
              @click="$emit('inspect', log)"
              class="px-2 py-0.5 rounded text-[11px] font-medium text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 transition"
            >
              Payload
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SmsRecord } from '../types/sms'

defineProps<{
  filteredLogs: SmsRecord[]
  isLoadingHistory: boolean
}>()

const emit = defineEmits<{
  (e: 'refresh-history'): void
  (e: 'clear-history'): void
  (e: 'export-csv'): void
  (e: 'inspect', log: SmsRecord): void
  (e: 'resend', log: SmsRecord): void
}>()

const searchQuery = defineModel<string>('searchQuery', { default: '' })
const statusFilter = defineModel<'all' | 'delivered' | 'failed'>('statusFilter', { default: 'all' })

function formatRelativeTime(isoDate: string): string {
  try {
    const diff = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000)
    if (diff < 10) return 'just now'
    if (diff < 60) return `${diff}s ago`
    const mins = Math.floor(diff / 60)
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  } catch {
    return 'recently'
  }
}
</script>
