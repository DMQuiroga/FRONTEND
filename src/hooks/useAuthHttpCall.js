import { useUser } from '../context/UserContext';
import { BACKEND_URL } from '../config';
import { useCallback } from 'react';

// HOOK PARA NUESTRAS PETICIONES:
function useAuthHttpCall() {
  const [user] = useUser();

  // PETICIÓN GET
  const get = useCallback(
    async (url) => {
      const headers = {};
      if (user) headers.Authorization = `${user.token}`;

      const res = await fetch(BACKEND_URL + url, {
        headers,
      });
      const responseBody = await res.json();
      if (!res.ok) {
        throw new Error(res.status + ':' + responseBody.error);
      }

      return responseBody;
    },
    [user]
  );
  // PETICIÓN POST
  const post = async (url, body) => {
    const isFormData = body instanceof FormData;

    const headers = {};
    if (user) headers.Authorization = `${user.token}`;
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const res = await fetch(BACKEND_URL + url, {
      method: 'POST',
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error(res.status + ' ' + responseBody.error);
    }
    return responseBody;
  };
  // PETICION PUT
  const put = async (url, body, user) => {
    const isFormData = body instanceof FormData;
    console.log(body);

    const headers = {};
    if (user) headers.Authorization = `${user.token}`;
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const res = await fetch(BACKEND_URL + url, {
      method: 'PUT',
      headers,
      body: isFormData ? body : JSON.stringify(body),
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error(res.status + ' ' + responseBody.error);
    }
    console.log(responseBody);
    return responseBody;
  };

  // PETICIÓN DELETE
  const del = async (url) => {
    const headers = {};
    if (user) headers.Authorization = `${user.token}`;

    const res = await fetch(BACKEND_URL + url, {
      method: 'DELETE',
      headers,
    });

    const responseBody = await res.json();
    if (!res.ok) {
      throw new Error(res.status + ':' + responseBody.error);
    }
    return responseBody;
  };

  return { get, post, del, put };
}

export default useAuthHttpCall;
