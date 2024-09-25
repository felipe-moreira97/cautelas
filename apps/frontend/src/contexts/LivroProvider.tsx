"use client"
import { Livro } from "cautelas"
import { Militar } from "common"
import { Dispatch, useReducer } from "react"
import { LivroContext } from "./LivroContext"

const initialState: {
    livro: Livro,
    militares: Militar[]
} = {
    livro: null,
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
    console.log(data)
    dispatch({ type: types.SET_LIVRO_E_MILITARES, payload: data })
}

const types = {
    SET_LIVRO: 'SET_LIVRO',
    SET_MILITARES: 'SET_MILITARES',
    SET_LIVRO_E_MILITARES: 'SET_LIVRO_E_MILITARES'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LIVRO:
            return {
                ...state,
                livro: action.payload
            }
        case types.SET_MILITARES:
            return {
                ...state,
                militares: action.ppayload
            }
        case types.SET_LIVRO_E_MILITARES:
            return {
                ...action.payload
            }
        default:
            return state
    }
}


export function LivroProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <LivroContext.Provider value={{ state, dispatch }}>
            {children}
        </LivroContext.Provider>
    )


}