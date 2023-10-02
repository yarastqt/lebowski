import { createEffect, createStore, sample } from 'effector'
import { FirebaseApp, initializeApp } from 'firebase/app'
// @ts-expect-error
import { Auth, getReactNativePersistence, initializeAuth } from 'firebase/auth'

import { appStarted } from '@app/shared/config'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const createFirebaseFx = createEffect(() => {
  const firebase = initializeApp(firebaseConfig)
  const fireauth = initializeAuth(firebase, {
    persistence: getReactNativePersistence(AsyncStorage),
  })

  return { firebase, fireauth }
})

export const $firebase = createStore<FirebaseApp>(null)
export const $fireauth = createStore<Auth>(null)

sample({
  clock: appStarted,
  target: createFirebaseFx,
})

sample({
  clock: createFirebaseFx.doneData,
  fn: (payload) => payload.firebase,
  target: $firebase,
})

sample({
  clock: createFirebaseFx.doneData,
  fn: (payload) => payload.fireauth,
  target: $fireauth,
})
