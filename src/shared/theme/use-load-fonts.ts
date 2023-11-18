import {
  NunitoSans_400Regular,
  NunitoSans_600SemiBold,
  useFonts,
} from '@expo-google-fonts/nunito-sans'

export function useLoadFonts() {
  const [fontsLoaded, fontError] = useFonts({
    NunitoSans_400Regular,
    NunitoSans_600SemiBold,
  })

  const isFontsLoaded = fontsLoaded && !fontError

  return { isFontsLoaded }
}
