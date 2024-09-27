import { useState } from "react"


export default function NovoItem({visivel,setVisivel}) {
    const [numSerie,setNumSerie] =useState('')

    return (
        <form style={{display: visivel ? "block" : "none"}}>
            <input type="text" name="numSerie" value={numSerie} onChange={e => setNumSerie(e.target.value)} />
            <input type="reset" onClick={() => setVisivel(!visivel)} />
        </form>
    )
}