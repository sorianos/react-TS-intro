import { useReducer, useEffect } from 'react'

interface AuthState {
  validando: boolean;
  token: string | null;
  username: string;
  nombre: string;
}

const initialState: AuthState = {
  validando: true,
  token: null,
  username: '',
  nombre: ''
}

type LoginPayload = {
  username: string, 
  nombre: string
}

type AuthAction = 
  | { type: 'logout' } 
  | { type: 'login', payload: LoginPayload };

const authReducer = 
  ( state: AuthState, action: AuthAction ): AuthState  => {

  switch ( action.type ) {
    case 'logout':
      return {
        validando: false,
        token: null,
        nombre: '',
        username: ''
      }

    case 'login':
      const {nombre, username} = action.payload
      return {
        validando: false,
        token: 'ABC123',
        nombre,
        username
      }
  
    default:
      return state;
  }
}

export const Login = () => {

  const [{ validando, token, nombre }, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    setTimeout(() => {
      dispatch({type: 'logout'})
    }, 1500)
  }, [])

  const login = () => {
    dispatch({
      type: 'login', 
      payload: {
        nombre: 'Rafa',
        username: 'gaara'
      }
    })
  }

  const logout = () => {
    dispatch({type: 'logout'})
  }

  if ( validando ) {
    return (
      <>
        <h3>Login</h3>
        <div className="alert alert-info">
          Validando...
        </div>
      </>
    )
  }

  return (
    <div>
      
      {
        ( token ) 
          ? <div className="alert alert-success"> Autenticado como: {nombre} </div>
          : <div className="alert alert-danger"> No autenticado</div>
      }


      {
        ( token ) 
          ? ( <button className="btn btn-primary" onClick={ logout } >Logout</button> )
          : ( <button className="btn btn-primary" onClick={ login } >Login</button> )
      }

    </div>
  )
}
