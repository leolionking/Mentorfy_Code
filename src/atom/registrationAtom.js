import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: sessionStorage

})

export const registerUserAtom = atom({
    key: 'registration',
    default: [],
    effects_UNSTABLE: [persistAtom]
})