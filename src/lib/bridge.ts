/**
 * Communication bridge between the PWA and the native SDK.
 *
 * This module handles all communication between the PWA running in a WebView
 * and the native Instacard SDK wrapper.
 */

export type InstacardEventType =
  | 'READY'
  | 'CARD_ADDED'
  | 'CARD_ADDITION_FAILED'
  | 'USER_CANCELLED'
  | 'OTP_REQUESTED'
  | 'OTP_VERIFIED'
  | 'NAVIGATION'
  | 'ERROR';

export interface InstacardEvent {
  type: 'INSTACARD_EVENT';
  payload: {
    event: InstacardEventType;
    data?: Record<string, unknown>;
    error?: {
      code: string;
      message: string;
    };
  };
}

export interface SDKConfig {
  userToken: string;
  bankId?: string;
  cardType?: 'debit' | 'credit' | 'prepaid' | 'gift';
  environment?: 'development' | 'staging' | 'production';
  theme?: {
    primaryColor?: string;
  };
}

/**
 * Parse SDK configuration from URL parameters.
 * The native SDK passes configuration via URL when opening the WebView.
 */
export function parseSDKConfig(): SDKConfig | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  if (!token) {
    return null;
  }

  return {
    userToken: token,
    bankId: params.get('bankId') || undefined,
    cardType: (params.get('cardType') as SDKConfig['cardType']) || undefined,
    environment: (params.get('env') as SDKConfig['environment']) || 'production',
    theme: params.get('primaryColor')
      ? { primaryColor: params.get('primaryColor')! }
      : undefined,
  };
}

/**
 * Send an event to the native SDK via postMessage.
 * This is how the PWA communicates completion, errors, or status updates.
 */
export function sendToSDK(
  event: InstacardEventType,
  data?: Record<string, unknown>,
  error?: { code: string; message: string }
): void {
  const message: InstacardEvent = {
    type: 'INSTACARD_EVENT',
    payload: {
      event,
      data,
      error,
    },
  };

  // Post to parent window (WebView container)
  if (typeof window !== 'undefined' && window.parent) {
    window.parent.postMessage(message, '*');
  }

  // Also try React Native WebView bridge if available
  if (typeof window !== 'undefined' && (window as Window & { ReactNativeWebView?: { postMessage: (msg: string) => void } }).ReactNativeWebView) {
    (window as Window & { ReactNativeWebView?: { postMessage: (msg: string) => void } }).ReactNativeWebView!.postMessage(JSON.stringify(message));
  }
}

/**
 * Notify the SDK that the PWA is ready to receive user input.
 */
export function notifyReady(): void {
  sendToSDK('READY');
}

/**
 * Notify the SDK that a card was successfully added.
 */
export function notifyCardAdded(cardData: {
  cardId: string;
  cardType: string;
  lastFourDigits: string;
}): void {
  sendToSDK('CARD_ADDED', cardData);
}

/**
 * Notify the SDK that card addition failed.
 */
export function notifyCardFailed(error: { code: string; message: string }): void {
  sendToSDK('CARD_ADDITION_FAILED', undefined, error);
}

/**
 * Notify the SDK that the user cancelled the flow.
 */
export function notifyUserCancelled(): void {
  sendToSDK('USER_CANCELLED');
}

/**
 * Notify the SDK of navigation events (for analytics/tracking).
 */
export function notifyNavigation(screen: string): void {
  sendToSDK('NAVIGATION', { screen });
}

/**
 * Notify the SDK of a general error.
 */
export function notifyError(code: string, message: string): void {
  sendToSDK('ERROR', undefined, { code, message });
}

/**
 * Validate JWT token (basic client-side validation).
 * Full validation should happen server-side.
 */
export function isValidToken(token: string): boolean {
  if (!token) return false;

  const parts = token.split('.');
  if (parts.length !== 3) return false;

  try {
    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}
