Blog personal.

Este proyecto es un API-REST para un blog personal que permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) en publicaciones de blog, además de la capacidad de subir archivos a la plataforma.
Tecnologías Utilizadas

    Node.js
    Express
    MongoDB

Arquitectura MVC

El proyecto utiliza una arquitectura Modelo-Vista-Controlador (MVC), lo que proporciona una organización clara y escalable del código. La estructura MVC divide la aplicación en tres componentes principales:

    Modelo: Representa los datos y la lógica de negocio. En este proyecto, el modelo se encarga de interactuar con la base de datos MongoDB y gestionar las publicaciones del blog.

    Vista: Es responsable de la presentación de los datos al usuario. En el caso de una API-REST, la vista se simplifica, ya que no hay una interfaz gráfica. Sin embargo, en esta capa se definen los formatos de respuesta de la API, como JSON o XML.

    Controlador: Actúa como intermediario entre el modelo y la vista. Se encarga de recibir las solicitudes del usuario, procesar la lógica de negocio correspondiente utilizando el modelo y devolver las respuestas adecuadas.

Esta arquitectura facilita la incorporación de nuevas características y el mantenimiento a largo plazo del proyecto, ya que cada componente tiene su responsabilidad bien definida.
Características Principales

    Autenticación y autorización: El proyecto implementa un sistema de autenticación y autorización para garantizar que solo los usuarios autenticados puedan realizar acciones como crear, editar o eliminar publicaciones.

    Operaciones CRUD: Los usuarios pueden realizar las operaciones básicas en las publicaciones de blog, lo que les permite crear nuevas entradas, leer el contenido existente, actualizar las publicaciones existentes y eliminar aquellas que ya no son relevantes.

    Subida de archivos: La API permite a los usuarios subir archivos a la plataforma, lo que brinda la posibilidad de incluir imágenes u otros tipos de archivos en las publicaciones de blog.

Instalación

    Clona este repositorio en tu máquina local.
    Instala las dependencias utilizando el comando npm install.
    Configura la conexión a la base de datos en el archivo config.js.
    Ejecuta la aplicación utilizando el comando npm start.
    Accede a la API a través de http://localhost:puerto/api.

Uso
    Para realizar operaciones CRUD en las publicaciones, utiliza las rutas definidas en la API, como /api/posts. Puedes utilizar herramientas como URL o Postman para interactuar con la API.
    
 
    Para subir archivos, envía una solicitud POST a la ruta /api/upload con el archivo adjunto en el cuerpo de la solicitud.

Contribución

Las contribuciones son bienvenidas. Si tienes alguna idea para mejorar este proyecto, siéntete libre de hacer un fork del repositorio y crear una pull request con tus cambios.
Licencia

Este proyecto se distribuye bajo la licencia MIT. Puedes encontrar más detalles en el archivo LICENSE.
