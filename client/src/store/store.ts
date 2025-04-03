import { cloneDeep } from 'es-toolkit'
import { create } from 'zustand'

type ModalOptions = {
  isOpen: boolean
}

type StoreState = {
  modals: {
    [key in ModalNames]: ModalOptions
  }
}

type SetModalPayload = ModalOptions & {
  resetModals?: boolean
}

type StoreActions = {
  setModal: (modal: ModalNames, payload: SetModalPayload) => void
  resetModals: () => void
}

const modalInitialValues = {
  registration: {
    isOpen: false,
  },
  login: {
    isOpen: false,
  },
} as const

type ModalNames = keyof typeof modalInitialValues

const useStore = create<StoreState & StoreActions>((set, get) => ({
  modals: modalInitialValues,

  setModal: (modalName, payload) => {
    if (payload.resetModals) {
      get().resetModals()
    }

    set(state => ({
      modals: { ...state.modals, [modalName]: { ...payload } },
    }))
  },

  resetModals: () =>
    set(() => ({ modals: cloneDeep<typeof modalInitialValues>(modalInitialValues) })),
}))

export default useStore
