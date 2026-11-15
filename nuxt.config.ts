// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    smsProvider: process.env.SMS_PROVIDER || 'textbee',
    textbeeApiKey: process.env.TEXTBEE_API_KEY || '',
    textbeeDeviceId: process.env.TEXTBEE_DEVICE_ID || '',
    public: {
      defaultSenderName: 'SMS Sender'
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'SMS Sender - Send. Connect. Stay in Touch.',
      meta: [
        { name: 'description', content: 'Send SMS messages easily with TextBee gateway.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    }
  }
})
