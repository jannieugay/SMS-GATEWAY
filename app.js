/**
 * SMS Sender - Vanilla JavaScript Application
 * TextBee SMS Gateway Integration
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const smsForm = document.getElementById('sms-form');
  const recipientInput = document.getElementById('recipient-phone');
  const messageInput = document.getElementById('message-content');
  const recipientError = document.getElementById('recipient-error');
  const messageError = document.getElementById('message-error');
  const charCounter = document.getElementById('char-counter');
  const sendButton = document.getElementById('send-button');
  const buttonSpinner = document.getElementById('button-spinner');
  const buttonIcon = document.getElementById('button-icon');
  const buttonText = document.getElementById('button-text');
  
  const alertContainer = document.getElementById('alert-container');
  const historyTableBody = document.getElementById('history-table-body');
  const historyEmpty = document.getElementById('history-empty');
  const refreshBtn = document.getElementById('refresh-btn');
  const refreshIcon = document.getElementById('refresh-icon');

  // Dropdown elements
  const profileDropdownBtn = document.getElementById('profile-dropdown-btn');
  const profileDropdownMenu = document.getElementById('profile-dropdown-menu');

  // Modals
  const settingsModal = document.getElementById('settings-modal');
  const aboutModal = document.getElementById('about-modal');
  const openSettingsBtns = document.querySelectorAll('.open-settings-btn');
  const openAboutBtns = document.querySelectorAll('.open-about-btn');
  const closeSettingsBtn = document.getElementById('close-settings-btn');
  const closeAboutBtn = document.getElementById('close-about-btn');
  const saveSettingsBtn = document.getElementById('save-settings-btn');
  const textbeeApiKeyInput = document.getElementById('textbee-api-key');
  const textbeeDeviceIdInput = document.getElementById('textbee-device-id');

  // --- Initial Data & Local Storage ---
  const DEFAULT_HISTORY = [
    {
      id: 'msg_sample_1',
      date: 'Nov 6, 2026 • 03:15 PM',
      recipient: '+63 912 345 6789',
      message: 'Hello from our Django SMS App!',
      status: 'Sent'
    }
  ];

  function getHistory() {
    try {
      const data = localStorage.getItem('textbee_sms_history');
      return data ? JSON.parse(data) : DEFAULT_HISTORY;
    } catch {
      return DEFAULT_HISTORY;
    }
  }

  function saveHistory(history) {
    localStorage.setItem('textbee_sms_history', JSON.stringify(history));
  }

  function getCredentials() {
    return {
      apiKey: localStorage.getItem('textbee_api_key') || '',
      deviceId: localStorage.getItem('textbee_device_id') || ''
    };
  }

  function saveCredentials(apiKey, deviceId) {
    localStorage.setItem('textbee_api_key', apiKey.trim());
    localStorage.setItem('textbee_device_id', deviceId.trim());
  }

  // Format date helper: "Nov 6, 2026 • 03:15 PM"
  function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours.toString().padStart(2, '0');

    return `${month} ${day}, ${year} • ${formattedHours}:${minutes} ${ampm}`;
  }

  // --- Render Message History Table ---
  function renderHistory() {
    const history = getHistory();
    historyTableBody.innerHTML = '';

    if (history.length === 0) {
      historyEmpty.classList.remove('hidden');
      return;
    } else {
      historyEmpty.classList.add('hidden');
    }

    history.forEach(item => {
      const row = document.createElement('div');
      row.className = 'px-4 py-3.5 grid grid-cols-12 items-center text-xs text-slate-700 hover:bg-slate-50/70 transition border-b border-slate-100 last:border-b-0';

      const isSuccess = item.status === 'Sent' || item.status === 'delivered';
      const badgeHtml = isSuccess
        ? `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#dcfce7] text-[#15803d]">
            <svg class="w-3.5 h-3.5 text-[#16a34a]" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span>Sent</span>
          </span>`
        : `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-700">
            <svg class="w-3.5 h-3.5 text-rose-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
            <span>Failed</span>
          </span>`;

      row.innerHTML = `
        <div class="col-span-3 font-medium text-slate-600">${escapeHtml(item.date)}</div>
        <div class="col-span-3 font-medium text-slate-800">${escapeHtml(item.recipient)}</div>
        <div class="col-span-4 text-slate-700 truncate pr-3" title="${escapeHtml(item.message)}">${escapeHtml(item.message)}</div>
        <div class="col-span-2 flex justify-end">${badgeHtml}</div>
      `;

      historyTableBody.appendChild(row);
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // --- Character Counter ---
  messageInput.addEventListener('input', () => {
    const len = messageInput.value.length;
    charCounter.textContent = `${len} / 160`;
    if (len > 0) {
      messageError.textContent = '';
      messageInput.classList.remove('border-rose-400');
    }
  });

  recipientInput.addEventListener('input', () => {
    if (recipientInput.value.trim().length > 0) {
      recipientError.textContent = '';
      recipientInput.classList.remove('border-rose-400');
    }
  });

  // --- Input Validation ---
  function validateInputs() {
    let isValid = true;
    const phone = recipientInput.value.trim();
    const msg = messageInput.value.trim();

    // Recipient Validation
    if (!phone) {
      recipientError.textContent = 'Please enter a recipient phone number.';
      recipientInput.classList.add('border-rose-400');
      isValid = false;
    } else {
      const normalized = phone.replace(/[\s\-\(\)]/g, '');
      const phoneRegex = /^(\+?[1-9]\d{6,14}|09\d{9})$/;
      if (!phoneRegex.test(normalized)) {
        recipientError.textContent = 'Please enter a valid phone number (e.g. +63 912 345 6789 or 09123456789).';
        recipientInput.classList.add('border-rose-400');
        isValid = false;
      } else {
        recipientError.textContent = '';
        recipientInput.classList.remove('border-rose-400');
      }
    }

    // Message Validation
    if (!msg) {
      messageError.textContent = 'Please enter a message to send.';
      messageInput.classList.add('border-rose-400');
      isValid = false;
    } else if (msg.length > 160) {
      messageError.textContent = 'Message cannot exceed 160 characters.';
      messageInput.classList.add('border-rose-400');
      isValid = false;
    } else {
      messageError.textContent = '';
      messageInput.classList.remove('border-rose-400');
    }

    return isValid;
  }

  // --- Display Banner Alerts ---
  function showAlert(type, title, message) {
    alertContainer.innerHTML = '';
    alertContainer.classList.remove('hidden');

    const isSuccess = type === 'success';
    const alertDiv = document.createElement('div');
    
    if (isSuccess) {
      alertDiv.className = 'bg-[#dcfce7] border border-[#bbf7d0] rounded-xl p-3.5 px-4 flex items-center justify-between text-[#15803d] shadow-sm transition-all';
      alertDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 rounded-full bg-[#16a34a] text-white flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 class="font-bold text-sm text-[#14532d] leading-none">${escapeHtml(title)}</h4>
            <p class="text-xs text-[#166534] mt-1">${escapeHtml(message)}</p>
          </div>
        </div>
        <button type="button" class="dismiss-alert-btn text-slate-500 hover:text-slate-700 p-1 rounded-md transition">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      `;
    } else {
      alertDiv.className = 'bg-rose-50 border border-rose-200 rounded-xl p-3.5 px-4 flex items-center justify-between text-rose-800 shadow-sm transition-all';
      alertDiv.innerHTML = `
        <div class="flex items-center gap-3">
          <div class="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <div>
            <h4 class="font-bold text-sm text-rose-900 leading-none">${escapeHtml(title)}</h4>
            <p class="text-xs text-rose-700 mt-1">${escapeHtml(message)}</p>
          </div>
        </div>
        <button type="button" class="dismiss-alert-btn text-slate-500 hover:text-slate-700 p-1 rounded-md transition">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      `;
    }

    alertContainer.appendChild(alertDiv);

    alertDiv.querySelector('.dismiss-alert-btn').addEventListener('click', () => {
      alertContainer.classList.add('hidden');
      alertContainer.innerHTML = '';
    });
  }

  // --- Form Submit (TextBee Gateway Dispatch) ---
  smsForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const phone = recipientInput.value.trim();
    const message = messageInput.value.trim();
    const { apiKey, deviceId } = getCredentials();

    // Set Loading UI State
    sendButton.disabled = true;
    buttonSpinner.classList.remove('hidden');
    buttonIcon.classList.add('hidden');
    buttonText.textContent = 'Sending SMS...';

    const normalizedPhone = phone.replace(/[\s\-\(\)]/g, '');
    let isSuccess = false;
    let responseMessage = 'Your SMS has been delivered.';

    try {
      if (apiKey) {
        // Live TextBee REST API Call
        const endpoint = deviceId
          ? `https://api.textbee.dev/api/v1/gateway/devices/${deviceId}/send-sms`
          : 'https://api.textbee.dev/api/v1/gateway/send-sms';

        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'x-api-key': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            recipients: [normalizedPhone],
            message: message,
            ...(deviceId ? { deviceId } : {})
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          isSuccess = true;
          responseMessage = data?.message || 'Your SMS has been delivered.';
        } else {
          isSuccess = false;
          responseMessage = data?.message || `TextBee gateway error (${response.status}). Check API credentials.`;
        }
      } else {
        // Simulated TextBee Gateway (with 400ms network delay)
        await new Promise(r => setTimeout(r, 450));

        if (normalizedPhone.endsWith('0000') || normalizedPhone.endsWith('0100')) {
          isSuccess = false;
          responseMessage = 'TextBee Android device is currently offline or unreachable.';
        } else {
          isSuccess = true;
          responseMessage = 'Your SMS has been delivered.';
        }
      }
    } catch (err) {
      isSuccess = false;
      responseMessage = err?.message || 'Network request to TextBee gateway failed.';
    } finally {
      // Reset Button State
      sendButton.disabled = false;
      buttonSpinner.classList.add('hidden');
      buttonIcon.classList.remove('hidden');
      buttonText.textContent = 'Send SMS';

      // Record in History
      const history = getHistory();
      const newRecord = {
        id: 'msg_' + Date.now().toString(36),
        date: formatDate(new Date()),
        recipient: phone,
        message: message,
        status: isSuccess ? 'Sent' : 'Failed'
      };

      history.unshift(newRecord);
      saveHistory(history);
      renderHistory();

      // Show Alerts
      if (isSuccess) {
        showAlert('success', 'Message sent successfully!', responseMessage);
        // Clear message input
        messageInput.value = '';
        charCounter.textContent = '0 / 160';
      } else {
        showAlert('error', 'Failed to send SMS', responseMessage);
      }
    }
  });

  // --- Refresh Button ---
  refreshBtn.addEventListener('click', () => {
    refreshIcon.classList.add('animate-spin');
    setTimeout(() => {
      renderHistory();
      refreshIcon.classList.remove('animate-spin');
    }, 300);
  });

  // --- Profile Dropdown Toggle ---
  profileDropdownBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdownMenu.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!profileDropdownBtn.contains(e.target) && !profileDropdownMenu.contains(e.target)) {
      profileDropdownMenu.classList.add('hidden');
    }
  });

  // --- Modals Management ---
  openSettingsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const { apiKey, deviceId } = getCredentials();
      textbeeApiKeyInput.value = apiKey;
      textbeeDeviceIdInput.value = deviceId;
      settingsModal.classList.remove('hidden');
      profileDropdownMenu.classList.add('hidden');
    });
  });

  closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
  });

  saveSettingsBtn.addEventListener('click', () => {
    saveCredentials(textbeeApiKeyInput.value, textbeeDeviceIdInput.value);
    settingsModal.classList.add('hidden');
    showAlert('success', 'Settings Saved', 'TextBee API credentials updated successfully.');
  });

  openAboutBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      aboutModal.classList.remove('hidden');
      profileDropdownMenu.classList.add('hidden');
    });
  });

  closeAboutBtn.addEventListener('click', () => {
    aboutModal.classList.add('hidden');
  });

  // Close modals on clicking background backdrop
  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.classList.add('hidden');
  });

  aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) aboutModal.classList.add('hidden');
  });

  // Initial Load
  renderHistory();
});
