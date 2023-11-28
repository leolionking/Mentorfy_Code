import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const storeData = atom({
    key: 'store',
    default: [],
    effects_UNSTABLE: [persistAtom]
})