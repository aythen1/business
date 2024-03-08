import apiBackend from '@/utils/apiBackend'
import { createAsyncThunk } from '@reduxjs/toolkit';

const ID = "test/test";

const encodeVector = (id) => {
  const str = `${id}`
  const base64Str = btoa(str)
  return base64Str
}

const fetchUserFromApi = async (userId) => {
  const response = await fetch(`https://api.example.com/users/${userId}`);
  const data = await response.json();
  return data;
};


// Acción asincrónica
export const setOpenMenuLeft =
  createAsyncThunk('iam/setOpenMenuLeft', async (value, { dispatch }) => {
    try {
      return value;
    } catch (error) {
      throw error;
    }
  });

export const setOpenMenuRight =
  createAsyncThunk('iam/setOpenMenuRight', async (value, { dispatch }) => {
    try {
      return value;
    } catch (error) {
      throw error;
    }
  });

export const setOpenChatBot =
  createAsyncThunk('iam/setOpenChatBot', async (value, { dispatch }) => {
    try {
      return value;
    } catch (error) {
      throw error;
    }
  });


export const setOpenModal =
  createAsyncThunk('iam/setOpenModal', async (value, { dispatch }) => {
    try {
      return value;
    } catch (error) {
      throw error;
    }
  });



// Acción asincrónica
export const fetchUser = createAsyncThunk(
  "iam/fetchUser",
  async (userId, { dispatch }) => {
    try {
      // const user = await fetchUserFromApi(userId);
      // Disparar la acción 'fulfilled' con el usuario obtenido
      // dispatch(setUserFulfilled(user));
      const { data } = await apiBackend.get(`/iam/user/all-uuser`);
      // const { data } = await apiBackend.get(`/assets/directories?${query}`);
      dispatch(setAssets(data.data));
      return data.data.body;
      return user;
    } catch (error) {
      // Disparar la acción 'rejected' con el error
      dispatch(setUserRejected(error.message));
      throw error;
    }
  }
);
// Acción asincrónica
export const fetchUser2 = createAsyncThunk(
  "iam/fetchUser2",
  async (token, { dispatch }) => {
    try {
      // Configura los headers para incluir el token de autorización
      const config = {
        headers: {
          // Asume que el token es un Bearer token
          Authorization: `Bearer ${token}`,
        },
      };
      console.log({ config });
      // Incluye la configuración en la petición GET
      const { data } = await apiBackend.get(`/iam/user/all-user`, config);
      console.log({ data });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

// Acción asincrónica
export const fetchsInvoice =
  createAsyncThunk('iam/fetchsInvoice', async ({ dispatch }) => {
    try {
      console.log('dwciwdcujwunc')
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        '/iam/billing/invoices',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })


export const fetchInvoice =
  createAsyncThunk('iam/fetchInvoice', async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        `/iam/billing/invoice/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });


      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })



export const addInvoice =
  createAsyncThunk('iam/addInvoice', async (invoice, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/billing/invoice',
        {
          invoice,
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return response.data
    } catch (error) {
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })




export const updateInvoice =
  createAsyncThunk('iam/updateInvoice', async ({ billing }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')

      const response = await apiBackend.put(
        '/iam/billing/invoice', {
        billing
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log("rd3rlfrmo bill", response);

      return response.data;
    } catch (error) {
      console.log("Error: ", error.response.data.message);
      throw error.response.data.message;
    }
  }
  );

export const deleteInvoice =
  createAsyncThunk('iam/deleteInvoice', async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')

      const response = await apiBackend.delete(
        '/iam/billing/invoice', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          id
        }
      }
      )

      return response.data
    } catch (error) {
      console.log('err', error)
    }
  })




export const fetchsBilling =
  createAsyncThunk('iam/fetchsBilling', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        '/iam/billing/fetchs',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      return response.data
    } catch (error) {
      console.log('Error: ', error.response.data.message)
      throw error.response.data.message
    }
  });


export const updateBilling =
  createAsyncThunk('iam/updateBilling', async ({ billing }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/billing/update',
        {
          billing
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return response.data
    } catch (error) {
      console.log('Error: ', error.response.data.message)
      throw error.response.data.message
    }
  });


export const login = createAsyncThunk(
  "iam/login",
  async ({ user, password, remember }, { dispatch }) => {
    try {
      const response = await apiBackend.post("/iam/user/login", {
        path: encodeVector(ID),
        remember,
        user,
        password,
      });

      return {
        user: response.data.user,
        token: response.data.token
      }
    } catch (error) {
      console.log('Error: ', error.response.data.message)
      if (error.response.data.message == 301) {
        throw "Token expried resend email"
      } else {
        throw error.response.data.message
      }
    }
  })




export const register =
  createAsyncThunk('iam/register', async ({ user, password }, { dispatch }) => {
    try {
      const response = await apiBackend.post(
        '/iam/user/register',
        {
          path: encodeVector(ID),
          user,
          password
        }
      )

      const token = response.data.token
      return token
    } catch (error) {
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })



export const upgrade =
  createAsyncThunk('iam/userUpgrade', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/user/upgrade',
        {
          upgradedat: new Date(new Date().setMinutes(new Date().getMinutes() + 5)).toISOString()
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return {
        user: response.data.token,
        token: response.data.user
      }
    } catch (error) {
      console.log('error', error)
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })



export const fetchsDefault =
  createAsyncThunk('iam/fetchsDefault', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/load/default',
        {

        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return {
        addons: response.data.addons,
        gpts: response.data.gpts,
        changelogs: response.data.changelogs,
        news: response.data.news
      }
    } catch (error) {
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })



export const updateDefault =
  createAsyncThunk('iam/updateDefault', async ({ table, data }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.put(
        "/iam/load/default",
        {
          table,
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response up", response);

      return response.data;
    } catch (error) {
      console.log("eerrrr", error.response.status);
      if (error.response.status == 400 || error.response.status == 500) {
        throw 500;
      }
    }
  }
  );

export const recoverPassword =
  createAsyncThunk('iam/recoverPassword', async ({ email }, { dispatch }) => {
    try {
      console.log('recover-password')
      const response = await apiBackend.post(
        '/iam/user/recover-password',
        {
          path: encodeVector(ID),
          email
        }
      )

      return 'Send email'
    } catch (error) {
      console.log('eerrfir', error)
      if (error.response.status == 400) {
        throw error.response.data.message
      }
    }
  })


export const updateUser =
  createAsyncThunk('iam/updateUser', async ({ user }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      console.log('t', token, user)
      const response = await apiBackend.post(
        '/iam/user',
        {
          user
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return {
        user: response.data.user,
        token: response.data.token,
      }
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })


export const updatePasswordUser =
  createAsyncThunk('iam/updatePasswordUser', async ({ token, password }, { dispatch }) => {
    try {
      const response = await apiBackend.post(
        '/iam/user/password',
        {
          password
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return {
        token: response.data.token,
        user: response.data.user
      }
    } catch (error) {
      console.log('err', error)
    }
  })



export const confirm =
  createAsyncThunk('iam/confirm', async ({ token }, { dispatch }) => {
    try {
      const response = await apiBackend.post(
        '/iam/user/confirm',
        {
          token
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return {
        user: response.data.user,
        token: response.data.token
      }
    } catch (error) {
      console.log('error', error)
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      } else if (error.response.status == 301) { // token expired
        throw "Token expired"

      } else if (error.response && error.response.status >= 500 && error.response.status < 600) {
        throw 500
      }
    }
  })





export const verify =
  createAsyncThunk('iam/verify', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/user/verify',
        {
          token
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return {
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      if (error.response.status == 400) {
        throw "Ya existe el usuario";
      } else if (
        error.response &&
        error.response.status >= 500 &&
        error.response.status < 600
      ) {
        // localStorage.removeItem('token')
        throw 500;
      }
    }
  }
  );




export const isAuth = (user, password) => {
  const token = localStorage.getItem('token');
  return Boolean(token);
}

export const logout = () => {
  localStorage.removeItem("token");
  return true;
};


// export const addUser = createAsyncThunk(
//   "iam/addUser",
//   async ({ user, tags, group }, { dispatch }) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await apiBackend.post(
//         "/iam/user/add-user",
//         {
//           user,
//           tags,
//           group,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );


export const addUser =
  createAsyncThunk('iam/addUser', async ({ user, tags, group }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/user/add-user',
        {
          user,
          tags,
          group
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('rr', response)
      return response.data
    } catch (error) {
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })


export const deleteUser =
  createAsyncThunk('iam/deleteUser', async ({ id }, { dispatch }) => {
    try {

      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/user/delete-user',
        {
          id
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('delete', response.data)
      return response.data
    } catch (error) {
      console.log('err', error)
    }
  })



export const fetchsUser =
  createAsyncThunk('iam/fetchsUser', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        '/iam/user/all-user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            order: {
              type: 'ASC',
              param: 'createdat'
            }
          },
        });


      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el usuario'
      }
    }
  })





export const addApplication =
  createAsyncThunk('iam/addApplication', async ({ application }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/application/add-application',
        {
          application,
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return response.data
    } catch (error) {
      console.log('ee', error)
      if (error.response.status == 400) {
        throw 'Ya existe la aplicación'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })


export const deleteApplication =
  createAsyncThunk('iam/deleteApplication', async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/application/delete-application',
        {
          id
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('delete', response.data)
      return response.data
    } catch (error) {
      console.log('err', error)
    }
  })



export const fetchsApplication =
  createAsyncThunk('iam/fetchsApplication', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        '/iam/application/all-application',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log('fetchsApplication', response)

      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el application'
      }
    }
  })





export const addPolice =
  createAsyncThunk('iam/addPolice', async ({ police }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/police/add-police',
        {
          police,
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return response.data
    } catch (error) {
      console.log('ee', error)
      if (error.response.status == 400) {
        throw 'Ya existe la police'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })


export const deletePolice =
  createAsyncThunk('iam/deletePolice', async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/police/delete-police',
        {
          id
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('delete', response.data)
      return response.data
    } catch (error) {
      console.log('err', error)
    }
  })



export const fetchsPolice =
  createAsyncThunk('iam/fetchsPolice', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      console.log('to', token)
      const response = await apiBackend.get(
        '/iam/police/all-police',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log('fetchsPolice', response)

      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el police'
      }
    }
  })










export const addApi =
  createAsyncThunk('iam/addApi', async ({ api }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      console.log('token', token, api)
      const response = await apiBackend.post(
        '/iam/api/add-api',
        {
          api,
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return response.data
    } catch (error) {
      console.log('ee', error)
      if (error.response.status == 400) {
        throw 'Ya existe la API'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })


export const deleteApi =
  createAsyncThunk('iam/deleteApi', async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/police/delete-api',
        {
          id
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('delete', response.data)
      return response.data
    } catch (error) {
      console.log('err', error)
    }
  })



export const fetchsApi =
  createAsyncThunk('iam/fetchsApi', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        '/iam/api/all-api',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log('fetchsApi', response)

      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el police'
      }
    }
  })






export const addLog =
  createAsyncThunk('iam/addLog', async ({ log }, { dispatch }) => {
    try {
      const themeColor = localStorage.getItem('themeColor')
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/log/add-log',
        {
          log,
          options: {
            backgroundColor: themeColor
          }
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log("response", response);

      return response.data
    } catch (error) {
      console.log('ee', error)
      if (error.response.status == 400) {
        throw 'Ya existe el logs'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })


export const deleteLogs =
  createAsyncThunk('iam/deleteLogs', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/log/delete-logs',
        {
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      return response.data
    } catch (error) {
      console.log('ee', error)
      if (error.response.status == 400) {
        throw 'Ya existe el logs'
      } else if (error.response.status == 501) {
        throw 'Permision denied'
      }
    }
  })

export const deleteLog =
  createAsyncThunk('iam/deleteLog', async ({ id }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      console.log('token', token, id)
      const response = await apiBackend.post(
        '/iam/log/delete-log',
        {
          id
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('delete', response.data)
      return response.data
    } catch (error) {
      console.log('err', error)
    }
  })



export const fetchsLog =
  createAsyncThunk('iam/fetchsLog', async ({ }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.get(
        '/iam/log/all-log',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      console.log('fetchsLoG', response)

      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el police'
      }
    }
  })






export const sendMail =
  createAsyncThunk('iam/sendMail', async ({ email }, { dispatch }) => {
    try {
      const token = localStorage.getItem('token')
      const response = await apiBackend.post(
        '/iam/send/mail',
        {
          email
        }, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })

      console.log('send email', response)

      return response.data
    } catch (error) {
      console.log('err', error)
      if (error.response.status == 400) {
        throw 'Ya existe el police'
      }
    }
  })

