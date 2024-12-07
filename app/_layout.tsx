import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";

export default function RootLayout() {
    const [loaded, error] = useFonts({
        'HankenGrotesk-ExtraBold': require('@/assets/fonts/HankenGrotesk-ExtraBold.ttf'),
        'HankenGrotesk-Bold': require('@/assets/fonts/HankenGrotesk-Bold.ttf'),
        'HankenGrotesk-Medium': require('@/assets/fonts/HankenGrotesk-Medium.ttf'),
        'HankenGrotesk-Regular': require('@/assets/fonts/HankenGrotesk-Regular.ttf'),
    });
    return (
    <Stack
      screenOptions={{
        // headerShown: false,
      }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
