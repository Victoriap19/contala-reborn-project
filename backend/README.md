
# Contala Backend API

Backend en Django REST Framework para la aplicación Contala.

## Requisitos

- Python 3.11+
- PostgreSQL (recomendado para producción)

## Configuración inicial

1. Clona este repositorio
2. Crea un entorno virtual:
   ```
   python -m venv venv
   source venv/bin/activate  # En Windows: venv\Scripts\activate
   ```
3. Instala las dependencias:
   ```
   pip install -r requirements.txt
   ```
4. Copia el archivo de ejemplo de variables de entorno:
   ```
   cp .env.example .env
   ```
5. Edita `.env` con tus configuraciones

## Configuración de la base de datos

Para desarrollo local, puedes usar SQLite (por defecto). Para producción, configura PostgreSQL:

```
DATABASE_URL=postgres://usuario:contraseña@localhost:5432/contala_db
```

## Ejecutar migraciones

```
python manage.py migrate
```

## Crear superusuario

```
python manage.py createsuperuser
```

## Ejecutar el servidor

```
python manage.py runserver
```

El servidor estará disponible en http://localhost:8000

## API Endpoints

- `/admin/`: Panel de administración Django
- `/api/token/`: Obtener token JWT
- `/api/token/refresh/`: Refrescar token JWT
- `/api/accounts/users/`: CRUD de usuarios
- `/api/accounts/creators/`: Listar creadores
- `/api/accounts/creator-profiles/`: CRUD de perfiles de creadores
- `/api/accounts/portfolio/`: CRUD de ítems de portafolio
- `/api/accounts/social-networks/`: CRUD de redes sociales
- `/api/projects/projects/`: CRUD de proyectos
- `/api/projects/proposals/`: CRUD de propuestas
- `/api/projects/invitations/`: CRUD de invitaciones
- `/api/projects/messages/`: CRUD de mensajes
- `/api/projects/convocatorias/`: CRUD de convocatorias
- `/api/projects/applications/`: CRUD de aplicaciones a convocatorias

## Despliegue en producción

Para desplegar en producción:

1. Configura las variables de entorno:
   - `DEBUG=False`
   - `SECRET_KEY=tu_clave_secreta`
   - `ALLOWED_HOSTS=tu_dominio.com`

2. Configura una base de datos PostgreSQL

3. Ejecuta las migraciones:
   ```
   python manage.py migrate
   ```

4. Recopila los archivos estáticos:
   ```
   python manage.py collectstatic
   ```

5. Usa Gunicorn como servidor WSGI:
   ```
   gunicorn core.wsgi:application --bind 0.0.0.0:8000
   ```

6. Configura un proxy inverso (Nginx/Apache) para servir la aplicación
