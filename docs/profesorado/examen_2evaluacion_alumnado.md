---
title: "Examen · 2.ª Evaluación · ASO"
description: "2.º ASIR · GPO, Samba, procesos, Docker y Kubernetes"
---

# 📝 Examen · 2.ª Evaluación

**Módulo:** Administración de Sistemas Operativos  
**Curso:** 2.º ASIR  
**Duración:** 120 minutos  
**Puntuación:** 10 puntos

---

## Indicaciones

!!! info "Criterio"
    El examen plantea situaciones equivalentes a las practicadas, pero no reproduce literalmente los retos.

Debes:

- interpretar los requisitos;
- comprobar el estado antes de cambiar configuraciones;
- justificar los diagnósticos;
- utilizar las herramientas vistas en clase;
- demostrar persistencia cuando se solicite.

---

# Caso: infraestructura de Mediterrània Lab

La empresa **Mediterrània Lab** utiliza:

- dominio `aso.local`;
- clientes Windows;
- Ubuntu Server con Samba;
- tareas programadas en Linux;
- aplicaciones desplegadas con Docker;
- un entorno Kubernetes de prácticas.

Debes resolver varias incidencias antes de entregar la infraestructura.

---

# 1. GPO + Samba: acceso departamental — 3 puntos

Existe la OU:

```text
OU=Direccio
```

Los usuarios de esta OU deben recibir automáticamente:

```text
P:
```

apuntando a:

```text
\\UBUNTU\Projectes
```

Ningún usuario de otras OU debe recibir esa unidad.

El recurso Samba ya existe, pero los usuarios de `Direccio` pueden abrirlo y **no pueden crear archivos**.

En Ubuntu:

```text
directorio: /srv/samba/projectes
propietario: root
grupo: direccio
permisos: drwxr-x---
```

Los usuarios afectados pertenecen al grupo Linux:

```text
direccio
```

La configuración Samba permite escritura a los usuarios autorizados.

## 1.1 GPO — 1 punto

Describe/configura una GPO que:

- mapee `P:`;
- utilice la ruta indicada;
- afecte solo a `OU=Direccio`.

Indica también cómo forzarías y comprobarías su aplicación desde el cliente.

## 1.2 Diagnóstico Samba — 1 punto

Explica por qué los usuarios pueden leer pero no escribir teniendo en cuenta:

```text
drwxr-x---
```

Propón un cambio de permisos coherente con lo trabajado, **sin utilizar `chmod 777`**.

## 1.3 Método de diagnóstico — 1 punto

Debes demostrar o describir el siguiente recorrido:

```text
red
→ servicio Samba
→ smb.conf
→ usuario/grupo
→ permisos Linux
→ acceso desde Windows
```

Incluye al menos un comando de comprobación para:

- servicio;
- configuración Samba;
- permisos del directorio.

---

# 2. Procesos, servicios y cron — 1,5 puntos

Un script:

```text
/home/admin/backup.sh
```

funciona cuando el administrador ejecuta:

```bash
/home/admin/backup.sh
```

pero la tarea programada no genera ninguna copia.

El `crontab` contiene:

```cron
30 23 * * * backup.sh >> backup.log 2>&1
```

## 2.1

Explica **dos problemas potenciales** de esa línea teniendo en cuenta lo trabajado sobre el entorno de `cron`. **(0,6 p)**

## 2.2

Escribe una versión más robusta de la línea utilizando rutas absolutas y log. **(0,5 p)**

## 2.3

Un proceso no responde a una terminación normal. Explica por qué:

```bash
kill -9 PID
```

no debería ser siempre la primera opción y cuándo tendría sentido utilizarlo. **(0,4 p)**

---

# 3. Docker Compose: localizar y corregir fallos — 4 puntos

Un compañero ha preparado este archivo:

```yaml
services:
  web:
    image: wordpress
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: localhost
      WORDPRESS_DB_USER: wp
      WORDPRESS_DB_PASSWORD: aula
      WORDPRESS_DB_NAME: wp
    depends_on:
      - db

  db:
    image: mariadb
    ports:
      - "8080:3306"
    environment:
      MARIADB_DATABASE: wp
      MARIADB_USER: wp
      MARIADB_PASSWORD: aula
      MARIADB_ROOT_PASSWORD: root-aula
```

Requisitos reales:

1. WordPress debe ser accesible desde el host por el puerto `8080`.
2. WordPress debe conectarse a MariaDB mediante la red interna de Compose.
3. No es necesario publicar MariaDB al host.
4. La base de datos debe **persistir aunque eliminemos y recreemos los contenedores**.

## 3.1 Análisis — 1,2 puntos

Identifica y explica **tres decisiones/problemas** del archivo que deben modificarse para cumplir los requisitos.

## 3.2 Corrección — 1,5 puntos

Escribe el `compose.yaml` corregido.

No se pide utilizar técnicas de secretos no trabajadas; las credenciales son de laboratorio.

## 3.3 Comprobación — 0,7 puntos

Indica qué comandos utilizarías para:

- desplegar;
- comprobar el estado;
- consultar logs.

## 3.4 Persistencia — 0,6 puntos

Describe una prueba práctica que demuestre que el volumen realmente conserva los datos después de recrear el contenedor de base de datos.

!!! warning "No basta"
    Escribir `volumes:` no demuestra por sí solo que la persistencia funcione.

---

# 4. Kubernetes: interpretar, no memorizar — 1,5 puntos

Se proporciona:

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
---
apiVersion: v1
kind: Service
metadata:
  name: web-svc
spec:
  selector:
    app: frontend
  ports:
    - port: 80
      targetPort: 80
```

## 4.1 — 0,4 puntos

¿Qué recurso es responsable de mantener el número deseado de réplicas?

## 4.2 — 0,4 puntos

Si uno de los Pods gestionados desaparece, ¿qué comportamiento esperarías?

## 4.3 — 0,5 puntos

El Service no encuentra los Pods.

Localiza la incoherencia del manifiesto y propón la corrección.

## 4.4 — 0,2 puntos

Explica brevemente la función de:

```text
Pod
Service
```

---

# ✅ Comprobación final

- [ ] La GPO se limita al ámbito pedido.
- [ ] No has resuelto permisos con `777`.
- [ ] La línea cron utiliza rutas coherentes.
- [ ] El Compose utiliza red interna por nombre de servicio.
- [ ] La base de datos utiliza persistencia.
- [ ] Has explicado cómo probar la persistencia.
- [ ] Has detectado el selector incorrecto de Kubernetes.
