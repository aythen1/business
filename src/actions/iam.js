// userActions.js
import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';



const ID = 'test/test'


const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}

// Simula una operación asincrónica (deberías reemplazarlo con tu lógica real)
const fetchUserFromApi = async (userId) => {
  // Lógica para obtener el usuario desde una API
  // Puedes usar bibliotecas como axios o fetch aquí
  // Ejemplo simplificado:
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
};

// Acción asincrónica
export const fetchUser = 
createAsyncThunk('iam/fetchUser', async (userId, { dispatch }) => {
  try {
    const user = await fetchUserFromApi(userId);
    // Disparar la acción 'fulfilled' con el usuario obtenido
    dispatch(setUserFulfilled(user));
    return user;
  } catch (error) {
    // Disparar la acción 'rejected' con el error
    dispatch(setUserRejected(error.message));
    throw error;
  }
});

// Acción asincrónica
export const fetchsBilling = 
createAsyncThunk('iam/fetchsBilling', async ({token}, { dispatch }) => {
  try {
    const response = await apiBackend.post(
      '/iam/billing/fetchs',
      {
        token
      }
    )

    return response.data
  } catch (error) {
    console.log('Error: ', error.response.data.data.message)
    throw error.response.data.data.message
  }
});


export const updateBilling = 
createAsyncThunk('iam/updateBilling', async ({token, billing}, { dispatch }) => {
  try {
    const response = await apiBackend.post(
      '/iam/billing/update',
      {
        token,
        billing
      }
    )

    return response.data
  } catch (error) {
    console.log('Error: ', error.response.data.data.message)
    throw error.response.data.data.message
  }
});


export const login = 
createAsyncThunk('iam/login', async ({user, password}, { dispatch }) => {
  try {
    const response = await apiBackend.post(
      '/iam/user/login',
      {
        path: encodeVector(ID),
        user,
        password
      }
    )
    return {
      user: response.data.data.user, 
      token: response.data.data.token
    }
  } catch (error) {
    console.log('Error: ', error.response.data.data.message)
    throw error.response.data.data.message
  }
})




export const register = 
createAsyncThunk('iam/register', async ({user, password}, { dispatch }) => {
  try {
    
    const response = await apiBackend.post(
      '/iam/user/register',
      {
        path: encodeVector(ID),
        user,
        password
      }
      )
      

      const token = response.data.data.token
    return token 
  } catch (error) {
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }
  }
})



export const upgrade = 
createAsyncThunk('iam/userUpgrade', async ({token}, { dispatch }) => {
  try {
    
    const response = await apiBackend.post(
      '/iam/user/upgrade',
      {
        token,
        upgradedat: new Date(new Date().setMinutes(new Date().getMinutes() + 5)).toISOString()
      }
      )
      
    return {
      user: response.data.data.token,
      token: response.data.data.user
    } 
  } catch (error) {
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }
  }
})



export const fetchsDefault = 
createAsyncThunk('iam/fetchsDefault', async ({token}, { dispatch }) => {
  try {    
    const response = await apiBackend.post(
      '/iam/load/default',
      {
        token
      }
      )
      
    return {
      changelogs: response.data.changelogs,
      news: response.data.news
    } 
  } catch (error) {
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }
  }
})


export const recoverPassword = 
createAsyncThunk('iam/recoverPassword', async ({email}, { dispatch }) => {
  try {
    console.log('recover-password')
    const response = await apiBackend.post(
      '/iam/user/recover-password',
      {
        path: encodeVector(ID),
        email
      }
      )

    console.log('uuu', response)
    return 'Send email'
      // const token = response.data.data.token
    // return token 
  } catch (error) {
    console.log('eerrfir', error)
    if(error.response.status == 400){
      throw error.response.data.message
    }
  }
})


export const updateUser = 
createAsyncThunk('iam/updateUser', async ({token, user}, { dispatch }) => {
  try {

    console.log('t', token, user)

    const response = await apiBackend.post(
      '/iam/user',
      {
        token,
        user
      }
      )

    return {
      user: response.data.data.user,
      token: response.data.data.token,
    }
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }
  }
})


export const updatePasswordUser = 
createAsyncThunk('iam/updatePasswordUser', async ({token, password}, { dispatch }) => {
  try {

    console.log('t', token, password)

    const response = await apiBackend.post(
      '/iam/user/password',
      {
        token,
        password
      }
      )

      console.log('response', response)
    return {
      token: response.data.data.token,
      user: response.data.data.user
    }
  } catch (error) {
    console.log('err', error)
  }
})





export const verify = 
createAsyncThunk('iam/verify', async (token, { dispatch }) => {
  try {
    const response = await apiBackend.post(
      '/iam/user/verify',
      {
        token
      }
      )

    return {
      user: response.data.data.user,
      token: response.data.data.token
    }
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }else if(error.response && error.response.status >= 500 && error.response.status < 600){
      // localStorage.removeItem('token')
      throw 500
    }
  }
})




// export const isAuth = 
// createAsyncThunk('iam/auth', async (user, password, { dispatch }) => {
//   try {
//     const token = localStorage.getItem('token');
//     return Boolean(token);
//   } catch (error) {

//   }
// })


export const isAuth = (user, password) => {
    const token = localStorage.getItem('token');
    return Boolean(token);
}

export const logout = () => {
  localStorage.removeItem('token');
  return true
};





//
//
//
//
//



export const addUser = 
createAsyncThunk('iam/addUser', async ({token, user, tags, group}, { dispatch }) => {
  try {

    console.log('token', token, user, tags, group)
    const response = await apiBackend.post(
      '/iam/user/add-user',
      {
        token,
        user,
        tags,
        group
      }
      )

    console.log('rr', response)
    return response.data
  } catch (error) {
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }else if(error.response.status == 501){
      throw 'Permision denied'
    }
  }
})


export const deleteUser = 
createAsyncThunk('iam/deleteUser', async ({token, id}, { dispatch }) => {
  try {

    console.log('token', token, id)
    const response = await apiBackend.post(
      '/iam/user/delete-user',
      {
        token,
        id
      }
      )

    console.log('delete', response.data)
    return response.data
  } catch (error) {
    console.log('err', error)
  }
})



export const fetchsUser = 
createAsyncThunk('iam/fetchsUser', async ({token}, { dispatch }) => {
  try {
    const response = await apiBackend.get(
      '/iam/user/all-user', 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
    });

    console.log('res', response)

    return response.data
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el usuario'
    }
  }
})





export const addApplication = 
createAsyncThunk('iam/addApplication', async ({token, application}, { dispatch }) => {
  try {

    console.log('token', token, application)
    const response = await apiBackend.post(
      '/iam/application/add-application',
      {
        token,
        application,
      }
      )

    return response.data
  } catch (error) {
    console.log('ee', error)
    if(error.response.status == 400){
      throw 'Ya existe la aplicación'
    }else if(error.response.status == 501){
      throw 'Permision denied'
    }
  }
})


export const deleteApplication = 
createAsyncThunk('iam/deleteApplication', async ({token, id}, { dispatch }) => {
  try {

    console.log('token', token, id)
    const response = await apiBackend.post(
      '/iam/application/delete-application',
      {
        token,
        id
      }
      )

    console.log('delete', response.data)
    return response.data
  } catch (error) {
    console.log('err', error)
  }
})



export const fetchsApplication = 
createAsyncThunk('iam/fetchsApplication', async ({token}, { dispatch }) => {
  try {
    const response = await apiBackend.get(
      '/iam/application/all-application', 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
    });

    console.log('fetchsApplication', response)

    return response.data
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el application'
    }
  }
})





export const addPolice = 
createAsyncThunk('iam/addPolice', async ({token, police}, { dispatch }) => {
  try {

    console.log('token', token, police)
    const response = await apiBackend.post(
      '/iam/police/add-police',
      {
        token,
        police,
      }
      )

    return response.data
  } catch (error) {
    console.log('ee', error)
    if(error.response.status == 400){
      throw 'Ya existe la police'
    }else if(error.response.status == 501){
      throw 'Permision denied'
    }
  }
})


export const deletePolice = 
createAsyncThunk('iam/deletePolice', async ({token, id}, { dispatch }) => {
  try {

    console.log('token', token, id)
    const response = await apiBackend.post(
      '/iam/police/delete-police',
      {
        token,
        id
      }
      )

    console.log('delete', response.data)
    return response.data
  } catch (error) {
    console.log('err', error)
  }
})



export const fetchsPolice = 
createAsyncThunk('iam/fetchsPolice', async ({token}, { dispatch }) => {
  try {
    console.log('to', token)
    const response = await apiBackend.get(
      '/iam/police/all-police', 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
    });

    console.log('fetchsPolice', response)

    return response.data
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el police'
    }
  }
})










export const addApi = 
createAsyncThunk('iam/addApi', async ({token, api}, { dispatch }) => {
  try {

    console.log('token', token, api)
    const response = await apiBackend.post(
      '/iam/api/add-api',
      {
        token,
        api,
      }
      )

    return response.data
  } catch (error) {
    console.log('ee', error)
    if(error.response.status == 400){
      throw 'Ya existe la API'
    }else if(error.response.status == 501){
      throw 'Permision denied'
    }
  }
})


export const deleteApi = 
createAsyncThunk('iam/deleteApi', async ({token, id}, { dispatch }) => {
  try {

    console.log('token', token, id)
    const response = await apiBackend.post(
      '/iam/police/delete-api',
      {
        token,
        id
      }
      )

    console.log('delete', response.data)
    return response.data
  } catch (error) {
    console.log('err', error)
  }
})



export const fetchsApi = 
createAsyncThunk('iam/fetchsApi', async ({token}, { dispatch }) => {
  try {
    console.log('to', token)
    const response = await apiBackend.get(
      '/iam/api/all-api', 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
    });

    console.log('fetchsApi', response)

    return response.data
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el police'
    }
  }
})






export const addLog = 
createAsyncThunk('iam/addLog', async ({token, log}, { dispatch }) => {
  try {

    console.log('token', token, log)
    const response = await apiBackend.post(
      '/iam/log/add-log',
      {
        token,
        log,
      }
      )

    return response.data
  } catch (error) {
    console.log('ee', error)
    if(error.response.status == 400){
      throw 'Ya existe el logs'
    }else if(error.response.status == 501){
      throw 'Permision denied'
    }
  }
})


export const deleteLog = 
createAsyncThunk('iam/deleteLog', async ({token, id}, { dispatch }) => {
  try {

    console.log('token', token, id)
    const response = await apiBackend.post(
      '/iam/log/delete-log',
      {
        token,
        id
      }
      )

    console.log('delete', response.data)
    return response.data
  } catch (error) {
    console.log('err', error)
  }
})



export const fetchsLog = 
createAsyncThunk('iam/fetchsLog', async ({token}, { dispatch }) => {
  try {
    console.log('to', token)
    const response = await apiBackend.get(
      '/iam/log/all-log', 
      {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Puedes agregar otros parámetros de la solicitud GET aquí si es necesario
    });

    console.log('fetchsLoG', response)

    return response.data
  } catch (error) {
    console.log('err', error)
    if(error.response.status == 400){
      throw 'Ya existe el police'
    }
  }
})