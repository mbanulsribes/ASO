---
title: "UT8 · Guía profesora"
description: "Docker, Compose y Kubernetes · 16 horas"
---

# 🧑‍🏫 UT8 · Docker, Compose y Kubernetes


!!! info "Marco metodológico fijo"
    - Nivel: **2.º ASIR / CFGS**.
    - Carga: **4 h semanales**: 2 h lunes + 2 h martes.
    - **Lunes:** sesión autónoma, autocontenida y con preparación docente mínima.
    - **Martes:** práctica → preguntas → teoría → consolidación.
    - El reto final debe medir **autonomía, diagnóstico y justificación**, no reproducción mecánica de una receta.


## Objetivo real

Que al terminar puedan recibir un pequeño servicio y pensar:

```text
servicios
red
puertos
persistencia
configuración
diagnóstico
```

y expresarlo con Compose.

Kubernetes será una introducción al **modelo de orquestación**, no un curso entero.

## Sesión 1 · Lun 15/02

Autónoma:

```bash
docker run
docker ps
docker stop
docker rm
```

Nginx accesible.

## Sesión 2 · Mar 16/02

Empieza creando dos contenedores de la misma imagen.

Teoría:

```text
imagen ≠ contenedor
VM ≠ contenedor
puerto host ≠ puerto contenedor
```

## Sesión 3 · Lun 22/02

Autónoma: logs + volumen.

## Sesión 4 · Mar 23/02

Redes/persistencia.

### Tu chuleta

```bash
docker logs
docker inspect
docker volume ls
docker network ls
```

## Sesión 5 · Lun 01/03

Autónoma: primer `compose.yaml`.

!!! note "Compose actual"
    No enseñes `version: '3'` como requisito. La Compose Specification actual hace opcional/obsoleto ese encabezado de versión.

## Sesión 6 · Mar 02/03

Aplicación multi-contenedor.

Empieza con:

```text
web no conecta a db
```

Pregunta:

> ¿debe usar `localhost`?

Respuesta conceptual: dentro del contenedor web, `localhost` es **ese propio contenedor**. En Compose se usa normalmente el nombre del servicio para encontrar al otro servicio en la red del proyecto.

## Sesión 7 · Lun 08/03

Kubernetes autónomo, con manifiestos preparados.

No hagas que instalen un clúster complejo durante la sesión.

Trabaja:

```text
Pod
Deployment
replicas
labels
Service
```

## Sesión 8 · Mar 09/03

Problema inicial:

> «Quiero que siempre haya dos instancias de la aplicación.»

Eso introduce `Deployment`.

## Reto

Compose:

- 2+ servicios;
- red;
- volumen;
- persistencia demostrada;
- diagnóstico.

Kubernetes:

- identificar recursos;
- cambiar réplicas;
- comprobar estado.

## Examen

El borrador original proponía Nextcloud con persistencia, una idea adecuada para CFGS. Mantén el principio, pero no les des un YAML casi completo. Deben producir o completar `compose.yaml` y demostrar persistencia. fileciteturn1file1L114-L128

### Comandos salvavidas

```bash
docker ps -a
docker logs NOMBRE
docker inspect NOMBRE
docker compose ps
docker compose logs
docker compose up -d
docker compose down
```

Kubernetes:

```bash
kubectl get pods
kubectl get deployments
kubectl get services
kubectl describe ...
```
