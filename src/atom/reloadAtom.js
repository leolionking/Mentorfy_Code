import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: sessionStorage

})

export const reloadStore = atom({
    key: 'reload',
    default: [],
    effects_UNSTABLE: [persistAtom]
})