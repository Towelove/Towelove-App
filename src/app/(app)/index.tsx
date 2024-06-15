import React from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { ScrollView, View } from '@/ui';
import HeaderLogo from 'assets/svg/header';
import { PhotoBox } from '@/components/home/photoBox';
import { Ticket } from '@/components/home/ticket';
import { MsgBoard } from '@/components/home/msgBoard';

export default function Home() {
  // const { data, isPending, isError } = usePosts();

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );

  return (
    <ScrollView className="flex-1 px-4 bg-[#BCF2FC80] pt-16">
      <View className="">
        <HeaderLogo />
      </View>
      <PhotoBox />
      <Ticket/>
      <MsgBoard/>
    </ScrollView>
  );
}
