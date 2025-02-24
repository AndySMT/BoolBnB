import React from 'react'
import LostSVG from '../components/LostSVG'
import Footer from '../components/Footer'

function LostPage() {
    return (
        <>
            <div>
                < div className="grid h-screen place-content-center bg-white px-4" >
                    <div className="text-center">
                        <LostSVG />

                        <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Mi dispiace che sei capitato qui, ma sembra che abbiamo i server in manutenzione!</h1>

                        <p className="mt-4 text-gray-500"> Potrai riprendere la ricerca della casa perfetta tra pochi minuti!</p>
                    </div>
                </div >
            </div>
        </>

    )
}

export default LostPage


