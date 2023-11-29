import React from 'react'

export default function Onboard(OriginalComponent) {
    function NewComponent(){
        return (
         <OriginalComponent />
        )
    }

    return NewComponent
}
