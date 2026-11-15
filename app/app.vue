<template>
  <div class="min-h-screen bg-[#edf2f8] flex font-sans text-slate-800">
    <!-- Left Navigation Sidebar -->
    <aside class="w-60 bg-[#0c1a30] text-white flex flex-col justify-between p-6 flex-shrink-0 hidden md:flex min-h-screen sticky top-0 h-screen overflow-hidden">
      <!-- Top Brand & Navigation -->
      <div class="space-y-8">
        <!-- Brand Logo -->
        <div class="flex items-start gap-3">
          <div class="mt-1 relative flex-shrink-0">
            <!-- Speed lines on the left -->
            <div class="absolute -left-2 top-1.5 flex flex-col gap-1">
              <span class="w-2.5 h-0.5 bg-blue-300 rounded-full"></span>
              <span class="w-1.5 h-0.5 bg-blue-300 rounded-full"></span>
            </div>
            <!-- Speech bubble icon -->
            <div class="w-8 h-8 rounded-xl bg-blue-400 flex items-center justify-center shadow-md">
              <svg class="w-4 h-4 text-[#0c1a30]" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-5 0h-2v2h2V9z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <h1 class="text-lg font-bold tracking-tight text-white leading-tight">SMS Sender</h1>
            <p class="text-[11px] text-slate-400 font-normal">Send. Connect. Stay in Touch.</p>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="space-y-2">
          <!-- Home (Active) -->
          <button
            type="button"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm bg-[#1e3458] text-white shadow-sm transition"
          >
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </button>

          <!-- History -->
          <a
            href="#history-section"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>History</span>
          </a>

          <!-- About -->
          <button
            type="button"
            @click="isAboutOpen = true"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>About</span>
          </button>

          <!-- Settings (TextBee Config) -->
          <button
            type="button"
            @click="isSettingsOpen = true"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>TextBee API</span>
          </button>

          <!-- Logout -->
          <button
            type="button"
            @click="onLogout"
            class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white hover:bg-white/5 transition"
          >
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <!-- Bottom Decorative Airplane -->
      <div class="relative py-4 pl-2 opacity-80 pointer-events-none">
        <svg class="w-32 h-24 text-blue-400" viewBox="0 0 120 90" fill="none">
          <!-- Dotted flight path -->
          <path d="M 10 80 C 15 50, 45 60, 60 40 C 70 25, 85 30, 95 20" stroke="currentColor" stroke-dasharray="3 3" stroke-width="1.5" opacity="0.6"/>
          <!-- Origami Paper plane -->
          <g transform="translate(85, 5) scale(0.9)">
            <polygon points="0,25 35,0 12,30" fill="#38bdf8"/>
            <polygon points="35,0 12,30 20,35" fill="#0284c7"/>
            <polygon points="12,30 14,38 20,35" fill="#0369a1"/>
          </g>
        </svg>
      </div>
    </aside>

    <!-- Main Workspace Area -->
    <div class="flex-1 flex flex-col min-h-screen overflow-y-auto">
      <!-- Top Right Header Profile Bar -->
      <header class="py-4 px-6 md:px-12 flex justify-between md:justify-end items-center">
        <!-- Mobile Menu Toggle -->
        <div class="flex md:hidden items-center gap-2">
          <div class="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-5 0h-2v2h2V9z" clip-rule="evenodd" />
            </svg>
          </div>
          <span class="font-bold text-slate-800 text-sm">SMS Sender</span>
        </div>

        <!-- User Dropdown -->
        <div class="relative">
          <button
            type="button"
            @click="isDropdownOpen = !isDropdownOpen"
            class="flex items-center gap-2.5 px-3 py-1.5 rounded-full hover:bg-slate-200/60 transition text-sm font-semibold text-slate-800"
          >
            <div class="w-8 h-8 rounded-full bg-[#1e293b] text-white flex items-center justify-center shadow-sm">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
              </svg>
            </div>
            <span>Group Project</span>
            <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="isDropdownOpen"
            class="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-40 text-xs text-slate-700"
          >
            <button
              type="button"
              @click="isSettingsOpen = true; isDropdownOpen = false"
              class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
            >
              <svg class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
              <span>TextBee Credentials</span>
            </button>
            <button
              type="button"
              @click="isAboutOpen = true; isDropdownOpen = false"
              class="w-full text-left px-4 py-2 hover:bg-slate-50 flex items-center gap-2 font-medium"
            >
              <svg class="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>About Project</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Body Container -->
      <main class="max-w-6xl w-full mx-auto px-4 sm:px-8 md:px-12 pb-16 space-y-6">
        <!-- Title & Subtitle Header -->
        <div class="flex items-center gap-4">
          <!-- Speech Bubble Icon with burst marks -->
          <div class="relative flex-shrink-0">
            <!-- 3 decorative sparks/burst lines -->
            <div class="absolute -top-2.5 -right-2 flex gap-1 pointer-events-none">
              <span class="w-1.5 h-0.5 bg-blue-500 rotate-45 transform origin-bottom-left"></span>
              <span class="w-2 h-0.5 bg-blue-500 -rotate-12 transform"></span>
              <span class="w-1.5 h-0.5 bg-blue-500 -rotate-45 transform"></span>
            </div>
            <!-- Main Blue Bubble -->
            <div class="w-12 h-12 rounded-2xl bg-[#1d64f2] text-white flex items-center justify-center shadow-lg shadow-blue-500/20">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zm-5 0h-2v2h2V9z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <div>
            <h2 class="text-3xl font-extrabold text-slate-900 tracking-tight">Send SMS Message</h2>
            <p class="text-sm text-slate-600 mt-0.5">Enter the recipient's number and your message below.</p>
          </div>
        </div>

        <!-- Section 1: Form Card + Phone Illustration Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Form Card (7 cols) -->
          <div class="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/70">
            <form @submit.prevent="onSendSms" novalidate class="space-y-4">
              <!-- Recipient Phone Number -->
              <div>
                <label for="recipient-phone" class="text-xs font-bold text-slate-800 flex items-center gap-2 mb-1.5">
                  <svg class="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Recipient Phone Number</span>
                </label>
                <input
                  id="recipient-phone"
                  v-model="form.recipient"
                  type="tel"
                  placeholder="e.g. +63 912 345 6789"
                  :disabled="isSending"
                  :class="[
                    'w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition',
                    errors.recipient
                      ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                      : 'border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600'
                  ]"
                />
                <p v-if="errors.recipient" class="text-xs text-rose-600 font-medium mt-1">
                  {{ errors.recipient }}
                </p>
              </div>

              <!-- Message Input -->
              <div>
                <label for="message-content" class="text-xs font-bold text-slate-800 flex items-center gap-2 mb-1.5">
                  <svg class="w-4 h-4 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span>Message</span>
                </label>
                <div class="relative">
                  <textarea
                    id="message-content"
                    v-model="form.message"
                    rows="3"
                    maxlength="160"
                    placeholder="Type your message here..."
                    :disabled="isSending"
                    :class="[
                      'w-full px-3.5 py-2.5 pb-6 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition resize-none',
                      errors.message
                        ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                        : 'border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-600'
                    ]"
                  ></textarea>
                  <!-- 0 / 160 Counter -->
                  <span class="absolute bottom-2.5 right-3 text-[11px] font-medium text-slate-400 select-none">
                    {{ form.message.length }} / 160
                  </span>
                </div>
                <p v-if="errors.message" class="text-xs text-rose-600 font-medium mt-1">
                  {{ errors.message }}
                </p>
              </div>

              <!-- Send SMS Button -->
              <div class="pt-1">
                <button
                  type="submit"
                  :disabled="isSending"
                  class="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-lg font-semibold text-sm text-white bg-[#1d5bf0] hover:bg-[#184ecc] active:bg-[#133fa8] disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-blue-500/25 transition duration-150"
                >
                  <svg v-if="isSending" class="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                  <span>{{ isSending ? 'Sending SMS...' : 'Send SMS' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- Phone & Paper Airplane Vector Illustration (5 cols) -->
          <div class="lg:col-span-5 flex items-center justify-center relative min-h-[260px]">
            <!-- Soft pastel blue cloud blob -->
            <div class="absolute w-[290px] h-[220px] bg-[#dbeafe] rounded-full blur-[2px] opacity-70"></div>
            
            <!-- SVG Illustration identical to the image -->
            <svg class="w-[310px] h-[250px] relative z-10" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Decorative Plant Leaves on left -->
              <g opacity="0.85">
                <path d="M 50 180 C 45 150, 65 140, 75 160 C 65 180, 55 185, 50 180 Z" fill="#2563eb" />
                <path d="M 40 195 C 25 175, 45 155, 60 175 C 50 195, 42 198, 40 195 Z" fill="#3b82f6" />
                <path d="M 65 190 C 60 160, 85 150, 95 170 C 85 190, 72 195, 65 190 Z" fill="#1d4ed8" />
              </g>

              <!-- Smartphone Mockup Tilted -->
              <g transform="translate(130, 120) rotate(-10) translate(-65, -95)">
                <!-- Phone Body -->
                <rect x="0" y="0" width="105" height="185" rx="20" fill="#1e293b" stroke="#0f172a" stroke-width="3" />
                <!-- Phone Inner Screen -->
                <rect x="6" y="8" width="93" height="169" rx="14" fill="#ffffff" />
                <!-- Speaker Notch -->
                <rect x="38" y="14" width="28" height="4" rx="2" fill="#94a3b8" />
                
                <!-- Blue SMS Bubble on Screen -->
                <g transform="translate(14, 45)">
                  <rect x="0" y="0" width="76" height="52" rx="14" fill="#1d64f2" />
                  <path d="M 12 52 L 24 52 L 10 62 Z" fill="#1d64f2" />
                  <text x="38" y="32" fill="#ffffff" font-size="18" font-family="system-ui, sans-serif" font-weight="800" text-anchor="middle" letter-spacing="1">SMS</text>
                </g>

                <!-- Soft message bubble bars -->
                <rect x="15" y="112" width="60" height="7" rx="3.5" fill="#e2e8f0" />
                <rect x="15" y="125" width="45" height="7" rx="3.5" fill="#e2e8f0" />
                <rect x="15" y="138" width="55" height="7" rx="3.5" fill="#e2e8f0" />

                <!-- Bottom Home Bar -->
                <rect x="38" y="165" width="28" height="3" rx="1.5" fill="#cbd5e1" />
              </g>

              <!-- Decorative Plant Leaves on right -->
              <g opacity="0.85">
                <path d="M 230 195 C 240 170, 260 175, 255 195 C 245 205, 235 200, 230 195 Z" fill="#3b82f6" />
                <path d="M 245 185 C 260 160, 280 170, 275 190 C 260 200, 250 195, 245 185 Z" fill="#2563eb" />
              </g>

              <!-- Starbursts / Sparks around phone -->
              <g stroke="#3b82f6" stroke-width="2" stroke-linecap="round">
                <line x1="215" y1="95" x2="225" y2="92" />
                <line x1="220" y1="85" x2="223" y2="76" />
                <line x1="228" y1="98" x2="236" y2="104" />
              </g>

              <!-- Paper Airplane Soaring with Looped Dotted Path -->
              <g>
                <!-- Dotted Trail -->
                <path d="M 235 155 C 245 140, 255 140, 250 120 C 245 105, 230 115, 235 95 C 240 75, 260 70, 280 50" stroke="#3b82f6" stroke-width="1.8" stroke-dasharray="3 3" fill="none" opacity="0.8" />
                
                <!-- Flying Paper Plane -->
                <g transform="translate(270, 30) scale(1.1)">
                  <polygon points="0,35 45,0 15,40" fill="#60a5fa" />
                  <polygon points="45,0 15,40 25,45" fill="#2563eb" />
                  <polygon points="15,40 18,50 25,45" fill="#1d4ed8" />
                </g>
              </g>
            </svg>
          </div>
        </div>

        <!-- Section 2: Success / Failure Alert Banner -->
        <div v-if="alert" class="transition-all duration-200">
          <!-- Green Success Alert -->
          <div
            v-if="alert.type === 'success'"
            class="bg-[#dcfce7] border border-[#bbf7d0] rounded-xl p-3.5 px-4 flex items-center justify-between text-[#15803d]"
          >
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-sm text-[#14532d] leading-none">Message sent successfully!</h4>
                <p class="text-xs text-[#166534] mt-1">{{ alert.message || 'Your SMS has been delivered.' }}</p>
              </div>
            </div>

            <!-- Dismiss Button -->
            <button
              type="button"
              @click="alert = null"
              class="text-slate-500 hover:text-slate-700 p-1 rounded-md transition"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Red Failure Alert -->
          <div
            v-else-if="alert.type === 'error'"
            class="bg-rose-50 border border-rose-200 rounded-xl p-3.5 px-4 flex items-center justify-between text-rose-800"
          >
            <div class="flex items-center gap-3">
              <div class="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div>
                <h4 class="font-bold text-sm text-rose-900 leading-none">Failed to send SMS</h4>
                <p class="text-xs text-rose-700 mt-1">{{ alert.message }}</p>
              </div>
            </div>

            <button
              type="button"
              @click="alert = null"
              class="text-slate-500 hover:text-slate-700 p-1 rounded-md transition"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Section 3: Message History Card -->
        <div id="history-section" class="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-200/70 space-y-4">
          <!-- Card Header -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-base font-bold text-slate-900 tracking-tight">Message History</h3>
            </div>

            <!-- Refresh Button -->
            <button
              type="button"
              @click="fetchHistory"
              :disabled="isLoadingHistory"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2563eb] text-[#2563eb] hover:bg-blue-50 text-xs font-semibold transition"
            >
              <svg :class="['w-3.5 h-3.5', isLoadingHistory ? 'animate-spin' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Refresh</span>
            </button>
          </div>

          <!-- History Table -->
          <div class="overflow-x-auto">
            <div class="min-w-[600px]">
              <!-- Table Header Row -->
              <div class="bg-[#edf2f8] rounded-xl px-4 py-3 grid grid-cols-12 text-xs font-bold text-slate-700">
                <div class="col-span-3">Date & Time</div>
                <div class="col-span-3">Recipient</div>
                <div class="col-span-4">Message</div>
                <div class="col-span-2 text-right">Status</div>
              </div>

              <!-- Empty State -->
              <div v-if="historyLogs.length === 0" class="py-10 text-center text-xs text-slate-400">
                No previous sending attempts found.
              </div>

              <!-- Table Rows -->
              <div class="divide-y divide-slate-100">
                <div
                  v-for="log in historyLogs"
                  :key="log.id"
                  class="px-4 py-3.5 grid grid-cols-12 items-center text-xs text-slate-700 hover:bg-slate-50/70 transition"
                >
                  <!-- Date & Time -->
                  <div class="col-span-3 font-medium text-slate-600">
                    {{ log.formattedDate }}
                  </div>

                  <!-- Recipient -->
                  <div class="col-span-3 font-medium text-slate-800">
                    {{ log.recipient }}
                  </div>

                  <!-- Message -->
                  <div class="col-span-4 text-slate-700 truncate pr-3" :title="log.message">
                    {{ log.message }}
                  </div>

                  <!-- Status Badge -->
                  <div class="col-span-2 flex justify-end">
                    <span
                      v-if="log.status === 'sent' || log.status === 'delivered'"
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]"
                    >
                      <svg class="w-3.5 h-3.5 text-[#16a34a]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                      </svg>
                      <span>Sent</span>
                    </span>
                    <span
                      v-else
                      class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700"
                    >
                      <svg class="w-3.5 h-3.5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                      </svg>
                      <span>Failed</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <!-- TextBee Settings Modal -->
    <div v-if="isSettingsOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>
            <h3 class="font-bold text-slate-900 text-sm">TextBee Gateway Settings</h3>
          </div>
          <button @click="isSettingsOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="py-4 space-y-3.5 text-xs text-slate-700">
          <p class="text-slate-500 leading-relaxed">
            Enter your TextBee API credentials from <a href="https://textbee.dev" target="_blank" class="text-blue-600 underline font-semibold">textbee.dev</a>. If left blank, the app runs in simulated TextBee mode.
          </p>

          <div>
            <label class="font-semibold block mb-1 text-slate-800">TextBee API Key (x-api-key)</label>
            <input
              v-model="textbeeApiKey"
              type="password"
              placeholder="e.g. 78a9c...-live-key"
              class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
            />
          </div>

          <div>
            <label class="font-semibold block mb-1 text-slate-800">Android Device ID (Optional)</label>
            <input
              v-model="textbeeDeviceId"
              type="text"
              placeholder="e.g. 64f128..."
              class="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-600"
            />
            <span class="text-[11px] text-slate-400 mt-0.5 block">Leave empty to use your default TextBee device.</span>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-100 flex justify-end gap-2">
          <button
            type="button"
            @click="isSettingsOpen = false"
            class="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>

    <!-- About Modal -->
    <div v-if="isAboutOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 class="font-bold text-slate-900 text-sm">About SMS Sender</h3>
          <button @click="isAboutOpen = false" class="text-slate-400 hover:text-slate-600">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="py-4 text-xs text-slate-600 space-y-2 leading-relaxed">
          <p><strong>SMS Sender</strong> is a single-page SMS messaging application powered by Nuxt 4, Tailwind CSS, and TextBee Gateway API.</p>
          <p>It allows sending direct SMS messages to Philippine numbers (+63) and international numbers via Android gateway devices.</p>
        </div>
        <div class="pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            @click="isAboutOpen = false"
            class="px-4 py-1.5 rounded-lg bg-slate-800 text-white font-semibold text-xs hover:bg-slate-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import type { SmsRecord } from './types/sms'

const form = reactive({
  recipient: '',
  message: ''
})

const errors = reactive({
  recipient: '',
  message: ''
})

const isSending = ref(false)
const isLoadingHistory = ref(false)
const isDropdownOpen = ref(false)
const isSettingsOpen = ref(false)
const isAboutOpen = ref(false)

const textbeeApiKey = ref('')
const textbeeDeviceId = ref('')

const alert = ref<{
  type: 'success' | 'error'
  message: string
} | null>(null)

const historyLogs = ref<SmsRecord[]>([])

// Validate recipient
function validateRecipient(): boolean {
  errors.recipient = ''
  const val = form.recipient.trim()
  if (!val) {
    errors.recipient = 'Please enter a recipient phone number.'
    return false
  }

  const normalized = val.replace(/[\s\-\(\)]/g, '')
  const phoneRegex = /^(\+?[1-9]\d{6,14}|09\d{9})$/

  if (!phoneRegex.test(normalized)) {
    errors.recipient = 'Please enter a valid phone number (e.g. +63 912 345 6789 or 09123456789).'
    return false
  }

  return true
}

// Validate message
function validateMessage(): boolean {
  errors.message = ''
  const val = form.message.trim()
  if (!val) {
    errors.message = 'Please enter a message to send.'
    return false
  }

  if (val.length > 160) {
    errors.message = 'Message cannot exceed 160 characters.'
    return false
  }

  return true
}

// Send SMS
async function onSendSms() {
  const isPhoneOk = validateRecipient()
  const isMessageOk = validateMessage()
  if (!isPhoneOk || !isMessageOk) return

  isSending.value = true
  alert.value = null

  try {
    const res = await $fetch<{
      success: boolean
      record: SmsRecord
      message: string
      errorCode?: string
    }>('/api/sms/send', {
      method: 'POST',
      body: {
        recipient: form.recipient.trim(),
        message: form.message.trim(),
        apiKey: textbeeApiKey.value,
        deviceId: textbeeDeviceId.value
      }
    })

    if (res.success) {
      alert.value = {
        type: 'success',
        message: res.message || 'Your SMS has been delivered.'
      }

      // Add to history
      historyLogs.value.unshift(res.record)

      // Clear message field
      form.message = ''
    } else {
      alert.value = {
        type: 'error',
        message: res.message || 'Failed to dispatch SMS.'
      }
      if (res.record) {
        historyLogs.value.unshift(res.record)
      }
    }
  } catch (err: any) {
    const errorText = err?.data?.data?.error || err?.statusMessage || err?.message || 'Failed to send message.'
    alert.value = {
      type: 'error',
      message: errorText
    }
  } finally {
    isSending.value = false
  }
}

// Fetch history
async function fetchHistory() {
  isLoadingHistory.value = true
  try {
    const res = await $fetch<{ success: boolean; logs: SmsRecord[] }>('/api/sms/history')
    if (res && res.logs) {
      historyLogs.value = res.logs
    }
  } catch (err) {
    console.error('Failed to load history:', err)
  } finally {
    isLoadingHistory.value = false
  }
}

function onLogout() {
  form.recipient = ''
  form.message = ''
  alert.value = null
}

onMounted(() => {
  fetchHistory()
})
</script>
