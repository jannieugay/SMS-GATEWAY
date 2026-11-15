<template>
  <div class="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
    <!-- Card Header -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <div>
          <h2 class="text-base font-semibold text-white tracking-tight">Dispatch Console</h2>
          <p class="text-xs text-slate-400">Compose and transmit single or multi-part SMS messages</p>
        </div>
      </div>

      <!-- Provider Badge / Toggle -->
      <div class="flex items-center gap-1.5">
        <span class="text-[11px] text-slate-400 hidden sm:inline">Provider:</span>
        <select
          v-model="form.provider"
          class="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium cursor-pointer"
        >
          <option value="mock">Cloud Direct (Simulated)</option>
          <option value="twilio">Twilio Gateway (API)</option>
          <option value="custom">Custom Webhook (HTTP)</option>
        </select>
      </div>
    </div>

    <!-- Quick Message Templates -->
    <div class="mb-5">
      <div class="flex items-center justify-between mb-2">
        <label class="text-xs font-medium text-slate-300">Quick Templates</label>
        <span class="text-[11px] text-slate-500">1-click populate</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="tpl in templates"
          :key="tpl.label"
          type="button"
          @click="onSelectTemplate(tpl)"
          class="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition"
        >
          {{ tpl.label }}
        </button>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" novalidate class="space-y-5">
      <!-- Field 1: Recipient Phone Number -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label for="recipient-input" class="text-xs font-semibold text-slate-200 flex items-center gap-1">
            <span>Recipient Phone Number</span>
            <span class="text-rose-400 font-bold">*</span>
          </label>
          <span class="text-[11px] text-slate-400">Format: E.164 (+1 555 123 4567)</span>
        </div>

        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <input
            id="recipient-input"
            v-model="form.recipient"
            @blur="$emit('validate-recipient')"
            type="tel"
            placeholder="+1 (555) 234-8901"
            autocomplete="tel"
            :disabled="isSending"
            :class="[
              'w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border rounded-xl text-sm font-mono text-slate-100 placeholder-slate-500 focus:outline-none transition',
              errors.recipient
                ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                : 'border-slate-700/80 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500'
            ]"
          />
        </div>

        <!-- Inline Validation Error -->
        <p v-if="errors.recipient" class="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errors.recipient }}</span>
        </p>

        <!-- Quick QA Test Presets -->
        <div class="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span class="text-[10px] uppercase tracking-wider text-slate-500 font-bold">QA Simulators:</span>
          <button
            type="button"
            @click="setTestNumber('+1 (555) 234-8901')"
            class="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition font-mono"
            title="Simulates normal carrier delivery"
          >
            ✓ +1 555-234-8901 (Success)
          </button>
          <button
            type="button"
            @click="setTestNumber('+1 (555) 000-0100')"
            class="text-[11px] px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition font-mono"
            title="Simulates Carrier Network Timeout 504"
          >
            ✗ +1 555-000-0100 (Timeout 504)
          </button>
          <button
            type="button"
            @click="setTestNumber('+1 (555) 000-0144')"
            class="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition font-mono"
            title="Simulates Unreachable Destination 422"
          >
            ✗ +1 555-000-0144 (Unreachable 422)
          </button>
        </div>
      </div>

      <!-- Field 2: Message Input -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label for="message-input" class="text-xs font-semibold text-slate-200 flex items-center gap-1">
            <span>Message Content</span>
            <span class="text-rose-400 font-bold">*</span>
          </label>

          <!-- Encoding & Segment Counters -->
          <div class="flex items-center gap-2 text-xs">
            <!-- Encoding Badge -->
            <span
              :class="[
                'px-2 py-0.5 rounded text-[11px] font-mono font-medium border',
                smsAnalysis.encoding === 'GSM-7'
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              ]"
            >
              {{ smsAnalysis.encoding }}
            </span>

            <!-- Segment Info -->
            <span class="text-slate-400 font-mono">
              <strong class="text-slate-200">{{ smsAnalysis.segments }}</strong> {{ smsAnalysis.segments === 1 ? 'part' : 'parts' }}
              ({{ smsAnalysis.length }} chars)
            </span>
          </div>
        </div>

        <div class="relative">
          <textarea
            id="message-input"
            v-model="form.message"
            @blur="$emit('validate-message')"
            @keydown.ctrl.enter="handleSubmit"
            @keydown.meta.enter="handleSubmit"
            rows="4"
            maxlength="1600"
            placeholder="Type your SMS message here... (e.g. Your verification code is 492018)"
            :disabled="isSending"
            :class="[
              'w-full p-3.5 bg-slate-950/80 border rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition resize-none',
              errors.message
                ? 'border-rose-500/80 focus:ring-2 focus:ring-rose-500/30'
                : 'border-slate-700/80 focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500'
            ]"
          ></textarea>
        </div>

        <!-- Inline Validation Error -->
        <p v-if="errors.message" class="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
          <svg class="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{{ errors.message }}</span>
        </p>

        <!-- Unicode UCS-2 Detected Notice -->
        <div v-if="smsAnalysis.encoding === 'UCS-2'" class="mt-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] flex items-start gap-1.5">
          <svg class="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <span>Non-GSM characters detected ({{ smsAnalysis.nonGsmChars.join(', ') }}). Transmission converted to <strong>UCS-2 (Unicode)</strong> (70 characters per segment).</span>
          </div>
        </div>
      </div>

      <!-- Dynamic Feedback Banner (Success or Failure Message) -->
      <div v-if="lastSubmission" class="transition-all duration-300">
        <!-- Success Alert -->
        <div
          v-if="lastSubmission.success"
          class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs flex items-start gap-3 shadow-sm"
        >
          <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-emerald-300 text-sm">Dispatched Successfully</h4>
              <span class="font-mono text-[11px] text-emerald-400">{{ lastSubmission.record?.latencyMs }}ms</span>
            </div>
            <p class="mt-1 text-emerald-200/90 leading-relaxed">{{ lastSubmission.message }}</p>
            <div class="mt-2 flex items-center gap-3 text-[11px] text-emerald-400/80 font-mono">
              <span>Carrier: {{ lastSubmission.record?.carrier }}</span>
              <span>•</span>
              <span>Cost: ${{ lastSubmission.record?.costEstimate }}</span>
              <span>•</span>
              <span>ID: {{ lastSubmission.record?.id }}</span>
            </div>
          </div>
        </div>

        <!-- Failure Alert -->
        <div
          v-else
          class="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-200 text-xs flex items-start gap-3 shadow-sm"
        >
          <div class="w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h4 class="font-bold text-rose-300 text-sm">Transmission Failed</h4>
              <span v-if="lastSubmission.errorCode" class="font-mono text-[11px] px-1.5 py-0.5 rounded bg-rose-950 border border-rose-800 text-rose-300">
                {{ lastSubmission.errorCode }}
              </span>
            </div>
            <p class="mt-1 text-rose-200/90 leading-relaxed">{{ lastSubmission.message }}</p>
            <p class="mt-1.5 text-[11px] text-rose-300/70">
              Check recipient formatting or use a QA simulation test number from above.
            </p>
          </div>
        </div>
      </div>

      <!-- Action Button (Send SMS) -->
      <div class="pt-2">
        <button
          type="submit"
          :disabled="isSending"
          class="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-indigo-600/25 transition duration-200"
        >
          <!-- Spinner when sending -->
          <svg
            v-if="isSending"
            class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>

          <!-- Normal Paper Airplane Icon -->
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>

          <span>{{ isSending ? 'Transmitting to Carrier Gateway...' : 'Send SMS Message' }}</span>
          <span class="text-xs text-indigo-200 font-normal hidden sm:inline">(Ctrl + Enter)</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { SmsRecord } from '../types/sms'
import type { SmsCalculationResult } from '../utils/smsCalc'

const props = defineProps<{
  form: {
    recipient: string
    message: string
    provider: string
  }
  errors: {
    recipient: string
    message: string
  }
  isSending: boolean
  smsAnalysis: SmsCalculationResult
  lastSubmission: {
    success: boolean
    message: string
    record?: SmsRecord
    errorCode?: string
  } | null
}>()

const emit = defineEmits<{
  (e: 'send-sms'): void
  (e: 'validate-recipient'): void
  (e: 'validate-message'): void
}>()

const templates = [
  { label: '🔑 2FA Security Code', message: 'Your security verification code is 849201. Do not share this code with anyone. Valid for 10 minutes.' },
  { label: '📦 Order Shipped', message: 'Good news! Your order #92819 has shipped via Express Delivery. Tracking ID: TRK-982141.' },
  { label: '📅 Appointment Reminder', message: 'Reminder: You have an appointment tomorrow at 10:30 AM. Reply YES to confirm or NO to reschedule.' },
  { label: '🚨 System Security Alert', message: 'Notice: A new login to your account was detected from Chrome on Windows (IP: 192.0.2.1).' }
]

function onSelectTemplate(tpl: { label: string; message: string }) {
  props.form.message = tpl.message
  emit('validate-message')
}

function setTestNumber(number: string) {
  props.form.recipient = number
  emit('validate-recipient')
}

function handleSubmit() {
  emit('send-sms')
}
</script>
