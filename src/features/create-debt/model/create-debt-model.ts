import { createEvent, createStore, sample } from 'effector'

export const createDebtModel = (() => {
  const open = createEvent()
  const close = createEvent()

  const $isOpen = createStore(false)

  sample({
    clock: open,
    fn: () => true,
    target: $isOpen,
  })

  sample({
    clock: close,
    fn: () => false,
    target: $isOpen,
  })

  return {
    '@@unitShape': () => ({
      isOpen: $isOpen,
      close,
      open,
    }),
  }
})()
