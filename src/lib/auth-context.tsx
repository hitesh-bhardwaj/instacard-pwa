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
  const [config, setConfig] = useState<SDKConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const sdkConfig = parseSDKConfig();

    if (!sdkConfig) {
      // For development, allow access without token
      if (process.env.NODE_ENV === 'development') {
        setConfig({
          userToken: 'dev-token',
          environment: 'development',
        });
        setIsLoading(false);
        notifyReady();
        return;
      }

      setError('Missing authentication token');
      setIsLoading(false);
      notifyError('AUTH_MISSING', 'No authentication token provided');
      return;
    }

    if (!isValidToken(sdkConfig.userToken)) {
      setError('Invalid or expired token');
      setIsLoading(false);
      notifyError('AUTH_INVALID', 'Authentication token is invalid or expired');
      return;
    }

    setConfig(sdkConfig);
    setIsLoading(false);
    notifyReady();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        config,
        isLoading,
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
