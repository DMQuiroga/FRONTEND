import { useUser } from '../context/UserContext';

function useAuthHttpCall() {
  const [user] = useUser();

  const get = async (url) => {
    const headers = {};
    if (user) headers.Authorization = `Bearer ${user.token}`;

    const res = await fetch(import.meta.env.VITE_BACKEND_URL + url, {
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
    if (user) headers.Authorization = `Bearer ${user.token}`;
    if (!isFormData) headers['Content-Type'] = 'application/json';

    const res = await fetch(url, {
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

  return { get, post };
}

export default useAuthHttpCall;
