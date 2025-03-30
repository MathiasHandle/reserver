import { create } from 'zustand'

type ModalNames = 'registration' | 'login'

type ModalOptions = {
  isOpen: boolean
}

type ModalStoreState = {
  modals: {
    [key in ModalNames]: ModalOptions
  }
}

type ModalStoreActions = {
  setModal: (modal: ModalNames, payload: ModalOptions) => void
  resetModals: () => void
}

const initialValues = {
  registration: {
    isOpen: false,
  },
  login: {
    isOpen: false,
  },
}

const useStore = create<ModalStoreState & ModalStoreActions>(set => ({
  modals: initialValues,

  setModal: (modalName, payload) =>
    set(state => ({
      modals: { ...state.modals, [modalName]: { ...payload } },
    })),

  resetModals: () => set(() => ({ modals: { ...initialValues } })),
}))

export default useStore
