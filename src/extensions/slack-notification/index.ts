/**
 * ╔═══════════════════════════════════════════════════════════════╗
 * ║                  SLACK NOTIFICATIONS                          ║
 * ║         Order Notifications with Attribution Data             ║
 * ╚═══════════════════════════════════════════════════════════════╝
 * 
 * Version: 1.0.0
 * 
 * Features:
 * - Rich order notifications to Slack
 * - Customer details (name, email, phone, address)
 * - Attribution data (UTM source, medium, campaign)
 * - Device info (browser, OS, IP)
 * - Formatted message blocks
 */

export { sendOrderNotification, sendSlackNotification } from './notify';
export type { OrderNotificationData, SlackNotificationConfig } from './types';

/**
 * Slack Configuration
 */
export const slackConfig = {
    /** Enable/disable Slack notifications */
    enabled: true,

    /** Slack Webhook URL (from environment) */
    webhookUrl: process.env.SLACK_WEBHOOK_URL || '',

    /** Debug mode - log messages to console */
    debug: process.env.NODE_ENV === 'development',
};
