TASKFLOW - GESTIÓN DE TAREAS CON REACT Y FIREBASE

TaskFlow es una aplicación web desarrollada con React y Firebase que permite a los usuarios autenticarse y gestionar sus tareas personales de forma segura y en tiempo real.

Este proyecto fue construido como prueba técnica, priorizando buenas prácticas, estructura de código y claridad.

---

FUNCIONALIDADES:

AUTENTICACIÓN (FIREBASE AUTHENTICATION)

- Registro de usuarios con correo y contraseña
- Inicio de sesión
- Cierre de sesión
- Protección de rutas (solo usuarios autenticados pueden ver sus tareas)

---

GESTIÓN DE TAREAS (FIRESTORE)

Cada tarea tiene la siguiente estructura:
{
"title": "string",
"description": "string",
"completed": false,
"createdAt": "timestamp",
"userId": "string"
}

---

Funciones disponibles:

- Crear una tarea
- Listar tareas del usuario autenticado
- Editar tareas
- Marcar tareas como completadas
- Eliminar tareas
- Sincronización en tiempo real con Firestore

---

Tecnologías utilizadas:

- React (Vite)
- Firebase
- Firebase Authentication
- Firestore
- React Router DOM
- CSS puro (sin frameworks)
- JavaScript (ES6+)

---

REGLAS DE SEGURIDAD FIRESTORE

rules_version = '2';
service cloud.firestore {
match /databases/{database}/documents {
match /tasks/{taskId} {
allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
allow update: if request.auth != null && request.auth.uid == resource.data.userId;
allow delete: if request.auth != null && request.auth.uid == resource.data.userId;
}
}
}
