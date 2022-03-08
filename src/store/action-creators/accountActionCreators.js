import axios from "axios";

export const login = (email, password, onSuccess = null) => {
  return async (dispatch) => {
    try {
      const result = await axios.post("/api/auth/login", {
        email: email,
        password: password,
      });

      if (result && result.data && result.data.ok) {
        const payload = {
          id: result.data.model.id,
          email: result.data.model.email,
          firstname: result.data.model.firstname,
          lastname: result.data.model.lastname,
          roles: result.data.model.roles,
          token: result.data.model.token,
        } 
        console.log(payload);
        dispatch({
          type: "SET_LOG_IN",
          payload
        });
        axios.defaults.headers.common["Authorization"] =
          "bearer " + result.data.model.token;
        if (onSuccess) {
          onSuccess();
        }
      } else {
        dispatch({
          type: "SET_ERRORS",
          payload: {
            errors: [...result.data.errors],
          },
        });
      }
    } catch (e) {
      dispatch({
        type: "SET_ERRORS",
        payload: {
          errors: ["Błąd serwera, spróbuj później"],
        },
      });
    }
  };
};

export const logout = (login, password) => {
  return (dispatch) => {
    dispatch({
      type: "LOG_OUT",
    });
    axios.defaults.headers.common["Authorization"] = null;
  };
};

export const clearErrors = () => {
  return (dispatch) => {
    dispatch({
      type: "CLEAR_ERRORS",
    });
  };
};
