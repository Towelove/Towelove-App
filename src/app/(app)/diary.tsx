import * as React from 'react';

import { FocusAwareStatusBar, ScrollView, Text } from '@/ui';

export default function Style() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4  pt-16">
        <Text>恋爱日记</Text>
      </ScrollView>
    </>
  );
}
