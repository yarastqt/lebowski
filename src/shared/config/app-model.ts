import { createEvent, fork } from 'effector'

export const scope = fork()

export const appStarted = createEvent()
