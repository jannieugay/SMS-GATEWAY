<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Stat 1: Total Sent -->
    <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-400">Total Attempts</span>
        <div class="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-2xl font-bold tracking-tight text-white font-mono">{{ stats.total }}</span>
        <span class="text-xs text-slate-500">{{ stats.totalSegments }} segments</span>
      </div>
      <div class="mt-2 flex items-center text-[11px] text-slate-400">
        <span class="text-emerald-400 font-medium mr-1">{{ stats.delivered }} delivered</span>
        <span>•</span>
        <span class="text-rose-400 font-medium ml-1">{{ stats.failed }} failed</span>
      </div>
    </div>

    <!-- Stat 2: Success Rate -->
    <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-400">Delivery Rate</span>
        <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-2xl font-bold tracking-tight text-emerald-400 font-mono">{{ stats.rate }}%</span>
        <span class="text-xs text-slate-500">SLA 99.5%</span>
      </div>
      <div class="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          class="bg-emerald-500 h-full rounded-full transition-all duration-500"
          :style="{ width: `${stats.rate}%` }"
        ></div>
      </div>
    </div>

    <!-- Stat 3: Avg Latency -->
    <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-400">Avg Roundtrip</span>
        <div class="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-2xl font-bold tracking-tight text-white font-mono">{{ stats.avgLatency || 320 }}</span>
        <span class="text-xs text-slate-500">ms</span>
      </div>
      <div class="mt-2 text-[11px] text-slate-400">
        Direct carrier handshake time
      </div>
    </div>

    <!-- Stat 4: Estimated Transit Cost -->
    <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm relative overflow-hidden group hover:border-slate-700 transition">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-400">Est. Routing Cost</span>
        <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
      <div class="mt-2 flex items-baseline gap-2">
        <span class="text-2xl font-bold tracking-tight text-white font-mono">${{ stats.totalCost.toFixed(4) }}</span>
        <span class="text-xs text-slate-500">USD</span>
      </div>
      <div class="mt-2 text-[11px] text-slate-400">
        Standard $0.0079/segment
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stats: {
    total: number
    delivered: number
    failed: number
    rate: number
    totalSegments: number
    totalCost: number
    avgLatency: number
  }
}>()
</script>
