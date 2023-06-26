//import { useEffect, useState } from "react";
import "./UserForm.css";

const UserForm = () => {
  /* const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulación de obtención de datos de la base de datos
    const fetchUserData = async () => {
      try {
        // Realiza la solicitud a tu API o base de datos para obtener la información del usuario
        const response = await fetch("");
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <p>Cargando...</p>;
  } */

  return (
    <div className="contenedor">
      <h2>Información del Usuario</h2>
      <form className="general">
        <label>Nombres</label>
        {/* <input type="text" value={userData.name} readOnly /> */}
        <input type="text" value="Eduardo" readOnly />

        <label>Apellidos</label>
        {/* <input type="text" value={userData.surname} readOnly /> */}
        <input type="text" value="Castro" readOnly />

        <label>Correo electrónico</label>
        {/* <input type="email" value={userData.email} readOnly /> */}
        <input type="text" value="eduardo@eduardo.com" readOnly />

        <label>Biografía</label>
        {/* <input type="date" value={userData.biography} readOnly /> */}
        <input type="text" value="Estudio en HAB" readOnly />

        <label>Cuenta activa desde</label>
        {/* <input type="date" value={userData.} readOnly /> */}
        <input type="text" value="xx/xx/xxxx" readOnly />

        {/* Agrega más campos de formulario según la información que desees mostrar */}
      </form>
    </div>
  );
};

export default UserForm;
