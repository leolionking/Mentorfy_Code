import {atom} from 'recoil'
import {recoilPersist} from 'recoil-persist'

const {persistAtom} = recoilPersist({
    key: 'recoil-persist',
    Storage: localStorage

})

export const profileAccount = atom({
    key: 'profileAccount',
    default: [],
    effects_UNSTABLE: [persistAtom]
})
// console.log('created view to another page, ban as pop up')
// console.log('created view to another page, ban as pop up')22