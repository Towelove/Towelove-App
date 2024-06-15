import React from 'react';

import { LoginForm } from '@/components/login-form';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

export default function Login() {
  useSoftKeyboardEffect();

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm />
    </>
  );
}
