import { useUser } from '../context/UserContext';
import { BACKEND_URL } from '../config';

function useAuthHttpCall() {
  const [user] = useUser();

  const get = async (url) => {
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
  };

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

  return { get, post, del };
}

export default useAuthHttpCall;
