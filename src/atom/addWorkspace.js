import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: sessionStorage

})

export const addWorkSpaceStore = atom({
    key: 'addWorkspace',
    default: '',
    effects_UNSTABLE: [persistAtom]
})