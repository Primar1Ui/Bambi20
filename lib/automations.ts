export type Automation = {
  title: string;
  description: string;
  image: string;
  alt: string;
  tags: string[];
};

export const automations: Automation[] = [
  {
    title: 'AI Appointment Booking Assistant',
    description:
      'Gmail intake, Groq LLM parsing, Airtable records, Google Calendar availability checks, and conditional booking confirmations.',
    image: '/images/automation-ai-appointment-booking.png',
    alt: 'n8n AI appointment booking workflow with Gmail, Groq LLM, Airtable, and Google Calendar',
    tags: ['n8n', 'Groq LLM', 'Google Calendar'],
  },
  {
    title: 'AI Customer Support Automation',
    description:
      'Gmail-triggered support flow with Groq classification, Airtable tickets, conditional AI replies, and automated follow-up emails.',
    image: '/images/automation-ai-customer-support.png',
    alt: 'n8n AI customer support workflow with Gmail, Groq LLM, Airtable, and branching replies',
    tags: ['n8n', 'Groq LLM', 'Airtable + Gmail'],
  },
  {
    title: 'CamJRoberts Reminder',
    description:
      'Scheduled n8n workflow that pulls Google Sheets rows, filters due items, runs JavaScript logic, and sends Gmail reminders.',
    image: '/images/automation-camjroberts-reminder.png',
    alt: 'n8n CamJRoberts reminder workflow with schedule trigger, Google Sheets, filter, and Gmail',
    tags: ['n8n', 'Google Sheets', 'Gmail'],
  },
  {
    title: 'n8n API Automation',
    description:
      'Connect external APIs, reshape incoming data, and move results through reliable low-code workflows.',
    image: '/images/automation-n8n-api.png',
    alt: 'n8n workflow connecting a manual trigger, HTTP request, and field editor',
    tags: ['n8n', 'API integration', 'Data mapping'],
  },
  {
    title: 'Automated Content Operations',
    description:
      'Schedule multi-step pipelines that prepare content, update spreadsheets, and coordinate outbound messages.',
    image: '/images/automation-content-pipeline.png',
    alt: 'Large n8n content automation workflow with scheduling, Google Sheets, and Gmail',
    tags: ['Scheduling', 'Google Sheets', 'Gmail'],
  },
  {
    title: 'AI Lead Qualification',
    description:
      'Route leads through AI-assisted qualification, normalize the results, save them, and notify the right team.',
    image: '/images/automation-lead-qualification.png',
    alt: 'n8n AI lead qualification workflow with language models, branching, Sheets, and Gmail',
    tags: ['AI agents', 'Lead scoring', 'Notifications'],
  },
  {
    title: 'AI Inventory & Auto-Restock',
    description:
      'Scheduled n8n system that analyzes inventory, updates Airtable records, and triggers restock emails automatically.',
    image: '/images/automation-inventory-restock.png',
    alt: 'n8n AI-powered inventory management and auto-restock workflow with Airtable and Gmail',
    tags: ['n8n', 'Airtable', 'AI analysis'],
  },
  {
    title: 'AI Recruiting Funnel',
    description:
      'End-to-end candidate pipeline that scores applicants, alerts the team on Slack and email, and books interviews.',
    image: '/images/automation-recruiting-funnel.png',
    alt: 'n8n AI recruiting funnel workflow with candidate scoring, Slack, Gmail, and scheduling',
    tags: ['n8n', 'AI scoring', 'Slack + Gmail'],
  },
  {
    title: 'AI Content Routing with Groq',
    description:
      'Branching n8n flow that runs Groq LLM chains, formats results, merges paths, and logs output to Google Sheets.',
    image: '/images/automation-groq-content-routing.png',
    alt: 'n8n workflow with Groq chat models, branching LLM chains, merge, and Google Sheets',
    tags: ['n8n', 'Groq LLM', 'Branching'],
  },
  {
    title: 'Zapier Event RSVP System',
    description:
      'Zapier system that finds records, splits into conditional paths, and creates records or sends reminders per RSVP.',
    image: '/images/automation-zapier-rsvp-paths.png',
    alt: 'Zapier event RSVP system with Airtable record lookup, paths, and Slack reminders',
    tags: ['Zapier', 'Airtable', 'Paths'],
  },
  {
    title: 'Zapier RSVP Slack Alerts',
    description:
      'New event registrations flow straight into a Slack channel with formatted attendee details for the team.',
    image: '/images/automation-rsvp-slack.png',
    alt: 'Slack channel receiving new event registration alerts sent by Zapier',
    tags: ['Zapier', 'Slack', 'Notifications'],
  },
  {
    title: 'Zapier Form-to-Sheet Sync',
    description:
      'Google Forms responses are looked up and written into Google Sheets rows automatically with no manual entry.',
    image: '/images/automation-zapier-forms-sheets.png',
    alt: 'Zapier workflow syncing Google Forms responses into Google Sheets rows',
    tags: ['Zapier', 'Google Forms', 'Google Sheets'],
  },
];

/** Real n8n / Zapier workflow screenshots for the homepage selected work grid */
export const homepageSelectedAutomations = automations.filter((item) =>
  ['AI Customer Support Automation', 'AI Appointment Booking Assistant'].includes(item.title)
);
