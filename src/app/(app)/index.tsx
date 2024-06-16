import React, { useCallback, useMemo, useRef } from 'react';

import type { Post } from '@/api';
import { usePosts } from '@/api';
import { Card } from '@/components/card';
import { Button, Text, View } from '@/ui';
import HeaderLogo from 'assets/svg/header';
import { PhotoBox } from '@/components/home/photoBox';
import { Ticket } from '@/components/home/ticket';
import { MsgBoard } from '@/components/home/msgBoard';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import CloudAdd from 'assets/svg/cloud-add';
import Ranbow from 'assets/svg/ranbow';

export default function Home() {
  // const { data, isPending, isError } = usePosts();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const renderItem = React.useCallback(
    ({ item }: { item: Post }) => <Card {...item} />,
    []
  );
  const snapPoints = useMemo(() => ['20%', '30%', '50%', '75%','85%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <>
      <ScrollView className="flex-1 px-4 bg-[#BCF2FC80] pt-16">
        <View className="">
          <HeaderLogo />
        </View>
        <PhotoBox />
        <Ticket />
      </ScrollView>
      <BottomSheet
        // topInset={100}
        handleStyle={{ display: 'none', overflow: 'visible' }}
        ref={bottomSheetRef}
        handleComponent={() => {
          return <RenderRanbow />;
        }}
        style={{ overflow: 'visible' }}
        backgroundStyle={{ backgroundColor: 'transparent' }}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
      >
        <BottomSheetView style={styles.contentContainer}>
          <MsgBoard />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}
const RenderRanbow = () => {
  return (
    <View
      style={{ width: 139, height: 149, top: -64.8, right: 2, zIndex: 10 }}
      className="absolute "
    >
      <Ranbow className="w-full h-full" />
      <CloudAdd
        style={{
          width: 53,
          height: 36,
          bottom: 0,
          left: 58.2,
        }}
        className="absolute"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    overflow:'visible',
  },
});
