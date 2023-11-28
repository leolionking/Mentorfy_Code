import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const user = atom({
    key: 'user',
    default: [],
    effects_UNSTABLE: [persistAtom]
})