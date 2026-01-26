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

Estas reglas garantizan:

- Acceso solo a usuarios autenticados
- Aislamiento de datos por usuario
- Protección contra accesos no autorizados

---

INSTALACIÓN Y EJECUCIÓN

1. Clonar el repositorio:
   git clone https://github.com/JuanSebasSilva/Task_Flow.git

2. Instalar dependencias:
   npm install

3. Variables de entorno
   Crear un archivo .env en la raíz del proyecto:
   VITE_FIREBASE_API_KEY=TU_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=TU_SENDER_ID
   VITE_FIREBASE_APP_ID=TU_APP_ID

4. Ejecutar el proyecto:
   npm run dev

---

AUTOR

Desarrollado por Sebastián Silva
Tecnólogo en Análisis y Desarrollo de Software
