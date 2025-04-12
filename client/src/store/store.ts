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

const useStore = create<StoreState & StoreActions>(set => ({
  modals: modalInitialValues,

  setModal: (modalName, payload) => {
    set(state => ({
      modals: { ...state.modals, [modalName]: { ...payload } },
    }))
  },
}))

export default useStore
