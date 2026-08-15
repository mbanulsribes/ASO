---
title: "UT8 · Docker, Compose y Kubernetes"
description: "Contenedores, imágenes, redes, volúmenes, Compose e introducción a Kubernetes"
---

## 🐳 UT8 · Docker, Compose y Kubernetes


!!! info "Cómo trabajaremos"
    Esta unidad pertenece a **2.º ASIR** y se trabaja con **4 horas semanales**:

    - **Lunes (2 h):** práctica autónoma guiada apoyada en este tema.
    - **Martes (2 h):** práctica o problema inicial → preguntas → teoría → consolidación.

    Las prácticas guiadas sirven para aprender la técnica. El **reto final** exige analizar el problema, tomar decisiones, comprobar el resultado y justificar la solución.


!!! info "Carga"
    Esta es la unidad principal de la evaluación: **8 sesiones de 2 horas = 16 horas**.

    El objetivo es dominar un despliegue pequeño con Docker/Compose y comprender qué problema resuelve Kubernetes. Kubernetes se trabajará como **introducción práctica**, no como administración completa de un clúster de producción.

## 1. Qué debes aprender

- diferenciar VM y contenedor;
- distinguir imagen y contenedor;
- gestionar ciclo de vida;
- publicar puertos;
- utilizar logs;
- comprender redes Docker;
- persistir datos con volúmenes;
- escribir Compose YAML;
- desplegar una aplicación multi-contenedor;
- diagnosticar errores básicos;
- comprender Pod, Deployment y Service en Kubernetes.

---

## 📖 2. ¿Qué es un contenedor?

Un contenedor ejecuta una aplicación aislada junto con lo necesario para ejecutarla, compartiendo el kernel del host en el modelo habitual de Docker sobre Linux.

Comparación conceptual:

```text
MÁQUINAS VIRTUALES

hardware
└── hipervisor
    ├── SO + aplicación
    └── SO + aplicación
```

```text
CONTENEDORES

host + kernel
└── motor de contenedores
    ├── aplicación
    └── aplicación
```

!!! note "No digas simplemente que un contenedor es una VM ligera"
    Es una simplificación útil al principio, pero técnicamente el modelo de aislamiento es diferente.

---

## 3. Imagen y contenedor

**Imagen**: plantilla inmutable utilizada para crear contenedores.

**Contenedor**: instancia creada a partir de una imagen.

```text
imagen nginx
    ├── contenedor web1
    ├── contenedor web2
    └── contenedor web3
```

---

## 4. Ciclo de vida

Comandos:

```bash
docker pull nginx
docker run nginx
docker ps
docker ps -a
docker stop NOMBRE
docker start NOMBRE
docker rm NOMBRE
```

Ejemplo:

```bash
docker run -d --name web nginx
```

`-d` ejecuta en segundo plano.

---

## 5. Puertos

Un contenedor puede escuchar en un puerto interno.

Para acceder desde fuera podemos publicar:

```bash
docker run -d --name web -p 8080:80 nginx
```

Interpretación:

```text
HOST:8080 → CONTENEDOR:80
```

!!! warning "Error frecuente"
    Dos contenedores no pueden publicar simultáneamente el mismo puerto del host en la misma IP.

---

## 6. Logs e inspección

```bash
docker logs web
docker inspect web
```

Diagnóstico habitual:

```text
contenedor existe
↓
está ejecutándose
↓
logs
↓
puertos
↓
red
↓
aplicación
```

---

## 7. Datos y persistencia

Los contenedores deben poder eliminarse y recrearse.

Los datos importantes no deberían depender exclusivamente de la capa escribible del contenedor.

Docker ofrece **volúmenes** gestionados.

```bash
docker volume create datos
```

Montaje conceptual:

```text
contenedor
    │
    ▼
volumen datos
    │
    ▼
persistencia independiente del contenedor
```

!!! info "Idea de examen"
    Si eliminas un contenedor y al recrearlo desaparecen todos los datos, probablemente la persistencia no estaba bien diseñada.

---

## 8. Redes Docker

Docker permite que contenedores de una misma aplicación se comuniquen.

En Compose se crea normalmente una red por defecto para el proyecto.

Los servicios pueden resolverse por **nombre de servicio**.

Ejemplo conceptual:

```text
web ─────→ db
           nombre: db
```

No necesitas conocer la IP interna fija de `db`.

---

## 9. Docker Compose

Compose permite declarar una aplicación multi-contenedor en YAML.

La especificación actual utiliza:

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
```

!!! note "`version:`"
    En la Compose Specification actual no necesitas añadir `version: "3"` al principio.

---

## 10. Aplicación con base de datos

Ejemplo didáctico:

```yaml
services:
  web:
    image: wordpress
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wordpress
      WORDPRESS_DB_PASSWORD: ejemplo
      WORDPRESS_DB_NAME: wordpress
    depends_on:
      - db

  db:
    image: mariadb
    environment:
      MARIADB_DATABASE: wordpress
      MARIADB_USER: wordpress
      MARIADB_PASSWORD: ejemplo
      MARIADB_ROOT_PASSWORD: ejemplo-root
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

!!! danger "Credenciales"
    En un entorno real no debemos tratar contraseñas sensibles como texto que se publica alegremente en repositorios.

    En clase utilizaremos credenciales de laboratorio y hablaremos del problema de los secretos.

---

## 11. `docker compose`

Comandos:

```bash
docker compose up -d
docker compose ps
docker compose logs
docker compose down
```

!!! warning "Cuidado al borrar volúmenes"
    Antes de utilizar opciones que eliminan volúmenes, piensa si contienen datos que deseas conservar.

---

## 12. Persistencia: cómo demostrarla

Prueba correcta:

```text
1. desplegar aplicación
2. crear dato
3. eliminar/recrear contenedor
4. comprobar que el dato sigue existiendo
```

No basta con declarar `volumes:`: hay que **demostrar** que la persistencia funciona.

---

## 13. Diagnóstico Compose

Si una aplicación no funciona:

```text
docker compose ps
docker compose logs
```

Después comprueba:

- variables de entorno;
- nombre de servicio;
- puerto;
- volumen;
- dependencias;
- aplicación.

---

## 14. ¿Por qué Kubernetes?

Compose funciona muy bien para describir aplicaciones multi-contenedor en un único entorno.

Cuando queremos operar aplicaciones distribuidas a mayor escala aparecen necesidades como:

- mantener réplicas;
- reemplazar instancias que fallan;
- desplegar actualizaciones;
- descubrir servicios;
- distribuir carga;
- administrar un clúster.

Kubernetes es un **orquestador de contenedores**.

!!! note "Alcance de esta UT"
    No aprenderemos a administrar Kubernetes en producción. Queremos entender su modelo básico y ser capaces de leer/desplegar recursos sencillos en un entorno de prácticas.

---

## 15. Pod

El **Pod** es una unidad básica de ejecución en Kubernetes.

Puede contener uno o varios contenedores estrechamente relacionados.

Ejemplo:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx-demo
spec:
  containers:
    - name: nginx
      image: nginx
```

---

## 16. Deployment

En lugar de crear Pods manualmente, normalmente declaramos un **Deployment** para gestionar réplicas y actualizaciones.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
        - name: nginx
          image: nginx
```

Conceptualmente:

```text
Deployment
    │
    ├── Pod
    └── Pod
```

---

## 17. Service

Los Pods pueden cambiar.

Un **Service** proporciona un punto estable para acceder a un conjunto de Pods seleccionados mediante etiquetas.

```text
cliente
  │
Service
  │
├── Pod
└── Pod
```

---

## 🟦 Lunes 15/02 · Sesión 1 — Primeros contenedores

Trabajo autónomo:

```bash
docker run
docker ps
docker stop
docker rm
```

Despliega Nginx y accede desde navegador.

Evidencia:

- imagen;
- contenedor;
- puerto.

---

## 🟧 Martes 16/02 · Sesión 2 — Modelo de contenedores

Práctica inicial:

crea dos contenedores a partir de la misma imagen.

Preguntas:

- ¿imagen o contenedor?
- ¿qué comparten?
- ¿qué ocurre al borrar uno?

Teoría:

- aislamiento;
- imagen;
- contenedor;
- ciclo de vida;
- puertos.

---

## 🟦 Lunes 22/02 · Sesión 3 — Logs y volúmenes

Trabajo:

1. crea contenedor;
2. observa logs;
3. crea volumen;
4. almacena un dato;
5. elimina/recrea;
6. comprueba persistencia.

---

## 🟧 Martes 23/02 · Sesión 4 — Redes y persistencia

Práctica inicial:

dos contenedores deben comunicarse.

Teoría:

- redes;
- DNS interno;
- puertos internos/externos;
- volumen;
- bind mount frente a volumen a nivel introductorio.

---

## 🟦 Lunes 01/03 · Sesión 5 — Compose

Convierte un despliegue manual en un archivo:

```text
compose.yaml
```

Incluye:

```text
services
ports
environment
volumes
```

Ejecuta:

```bash
docker compose up -d
```

---

## 🟧 Martes 02/03 · Sesión 6 — Aplicación multi-contenedor

Construye y explica:

```text
web → base de datos
```

Teoría:

- nombre de servicio;
- red por defecto;
- variables;
- persistencia;
- ciclo `up/down`.

---

## 🟦 Lunes 08/03 · Sesión 7 — Descubrir Kubernetes

A partir de una aplicación ya conocida:

1. identifica qué sería una imagen;
2. despliega/lee un Pod sencillo;
3. despliega/lee un Deployment;
4. cambia el número de réplicas si el laboratorio lo permite.

Comandos orientativos según entorno:

```bash
kubectl get pods
kubectl get deployments
kubectl describe ...
```

---

## 🟧 Martes 09/03 · Sesión 8 — Orquestación y reto

Práctica inicial:

> Si un Pod desaparece bajo un Deployment, ¿qué debería ocurrir?

Teoría:

- Pod;
- Deployment;
- réplica;
- label/selector;
- Service;
- diferencia de propósito entre Compose y Kubernetes.

## 🎯 Reto UT8 · Servicio persistente

###### Escenario

Debes desplegar una aplicación web con datos persistentes.

######## Parte A — Docker Compose

Debes entregar un `compose.yaml` que:

1. utilice al menos dos servicios;
2. tenga comunicación interna por nombre;
3. publique solo los puertos necesarios;
4. utilice un volumen persistente;
5. permita recrear los contenedores sin perder el dato principal;
6. pueda diagnosticarse con `compose ps` y `compose logs`.

######## Parte B — Kubernetes

A partir de un manifiesto sencillo:

1. identifica Pod/Deployment/Service;
2. explica qué recurso mantiene el número deseado de réplicas;
3. modifica las réplicas;
4. comprueba el estado.

!!! abstract "Tipo examen"
    El núcleo práctico será Docker Compose y persistencia. Kubernetes se evaluará a nivel de comprensión y manipulación básica de recursos, salvo que se indique otra cosa antes del examen.
