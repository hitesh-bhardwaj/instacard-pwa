'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { parseSDKConfig, notifyReady, notifyError, SDKConfig, isValidToken } from './bridge';

interface AuthContextType {
  config: SDKConfig | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  config: null,
  isLoading: true,
  isAuthenticated: false,
  error: null,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ config, error, notify }] = useState(() => {
    const sdkConfig = parseSDKConfig();

    if (!sdkConfig) {
      if (process.env.NODE_ENV === 'development') {
        return {
          config: { userToken: 'dev-token', environment: 'development' } as SDKConfig,
          error: null as string | null,
          notify: { type: 'ready' as const },
        };
      }

      return {
        config: null as SDKConfig | null,
        error: 'Missing authentication token' as string,
        notify: { type: 'error' as const, code: 'AUTH_MISSING', message: 'No authentication token provided' },
      };
    }

    if (!isValidToken(sdkConfig.userToken)) {
      return {
        config: null as SDKConfig | null,
        error: 'Invalid or expired token' as string,
        notify: { type: 'error' as const, code: 'AUTH_INVALID', message: 'Authentication token is invalid or expired' },
      };
    }

    return {
      config: sdkConfig,
      error: null as string | null,
      notify: { type: 'ready' as const },
    };
  });

  useEffect(() => {
    if (notify.type === 'ready') {
      notifyReady();
      return;
    }
    notifyError(notify.code, notify.message);
  }, [notify]);

  return (
    <AuthContext.Provider
      value={{
        config,
        isLoading: false,
        isAuthenticated: !!config && !error,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
