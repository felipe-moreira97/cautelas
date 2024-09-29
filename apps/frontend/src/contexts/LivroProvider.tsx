"use client"
import { Livro } from "cautelas"
import { Militar } from "common"
import { Dispatch, useReducer } from "react"
import { LivroContext } from "./LivroContext"
import { useElectron } from "../hooks/useElectron"

const initialState: {
    livro: Livro,
    militares: Militar[]
} = {
       livro: 
       new Livro({
        cautelas:[],
        itens:[]
       })
       ,
        militares: []
    }

export const setLivro = ({ dispatch, livro }: { dispatch: Dispatch<any>, livro: Livro }) => {
    dispatch({ type: types.SET_LIVRO, payload: livro })
}

export const setMilitares = ({ dispatch, militares }: { dispatch: Dispatch<any>, militares: Militar[] }) => {
    dispatch({ type: types.SET_MILITARES, payload: militares })
}

export const setLivroMilitares = ({
    dispatch,
    data
}: {
    dispatch: Dispatch<any>,
    data: {
        militares: Militar[],
        livro: Livro
    }
}) => {
    dispatch({ type: types.SET_LIVRO_E_MILITARES, payload: data })
}

const types = {
    SET_LIVRO: 'SET_LIVRO',
    SET_MILITARES: 'SET_MILITARES',
    SET_LIVRO_E_MILITARES: 'SET_LIVRO_E_MILITARES'
}

const reducer = (state = initialState, action) => {
    const {salvarLivro} = useElectron()
    switch (action.type) {
        case types.SET_LIVRO:
            salvarLivro(
                {
                    militares:state.militares.map(m => m.props),
                    livro: (action.payload as Livro).props
                }
            )
            return {
                ...state,
                livro: action.payload
            }
        case types.SET_MILITARES:
            return {
                ...state,
                militares: action.payload
            }
        case types.SET_LIVRO_E_MILITARES:
            return {
                ...action.payload
            }
        default:
            return state
    }
}


export default function LivroProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <LivroContext.Provider value={{ state, dispatch }}>
            {children}
        </LivroContext.Provider>
    )


}