import { createEvent, createStore, sample } from 'effector'
import { useUnit } from 'effector-react'

export function createDialog() {
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
    $isOpen,
    close,
    open,

    '@@unitShape': () => ({
      isOpen: $isOpen,
      onClose: close,
      onOpen: open,
    }),
  }
}
