import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const actionState = atom({
    key: 'action',
    default: '',
    effects_UNSTABLE: [persistAtom]
})