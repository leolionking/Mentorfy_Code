import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: sessionStorage
})

export const workspaceStore = atom({
    key: 'workspaceStore',
    default: [],
    effects_UNSTABLE: [persistAtom]
})