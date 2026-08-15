---
title: "Solucionario · Examen 2.ª Evaluación"
description: "Criterios de corrección · 2.º ASIR"
---

# 🧑‍🏫 Solucionario · 2.ª Evaluación

# 1. GPO + Samba — 3 puntos

## 1.1 GPO — 1 punto

Esperado:

- crear GPO específica, no editar indiscriminadamente `Default Domain Policy`;
- enlazarla a `OU=Direccio`;
- configuración de usuario / preferencias / Drive Maps;
- letra `P:`;
- ruta `\\UBUNTU\Projectes`.

Comprobación:

```powershell
gpupdate /force
gpresult /r
```

Debe explicar que otras OU no deben quedar dentro del ámbito.

## 1.2 Permisos — 1 punto

Permisos:

```text
drwxr-x---
```

Interpretación:

```text
propietario root: rwx
grupo direccio: r-x
otros: ---
```

El grupo no tiene `w`.

Solución trabajada posible:

```bash
sudo chmod 2770 /srv/samba/projectes
```

si el propietario/grupo son coherentes.

También puede proponer:

```bash
chmod 2770
chown/chgrp
```

según la solución implementada.

### Penalizar

`chmod 777` como solución final: no cumple el requisito ni el enfoque del tema.

## 1.3 Diagnóstico — 1 punto

Comandos válidos:

Servicio:

```bash
systemctl status smbd
```

Configuración:

```bash
testparm
```

Permisos:

```bash
ls -ld /srv/samba/projectes
```

Debe verse una secuencia coherente.

---

# 2. Cron/procesos — 1,5 puntos

## 2.1 — 0,6

Problemas:

```cron
backup.sh
backup.log
```

son rutas relativas.

Cron puede utilizar un directorio/entorno diferente al esperado.

También puede mencionar un `PATH` distinto, siempre que lo relacione correctamente con el contenido trabajado.

## 2.2 — 0,5

Ejemplo:

```cron
30 23 * * * /home/admin/backup.sh >> /home/admin/backup.log 2>&1
```

## 2.3 — 0,4

`kill -9` envía `SIGKILL`.

No permite al proceso hacer limpieza normal.

Primero se intenta terminación normal; se usa `SIGKILL` cuando el proceso no responde y se acepta el impacto.

---

# 3. Docker Compose — 4 puntos

## 3.1 — 1,2

Tres puntos esperados:

### A. `localhost`

Dentro de `web`:

```text
localhost
```

se refiere al propio contenedor web.

Debe usar el nombre del servicio:

```text
db
```

### B. MariaDB no necesita publicar puerto

```yaml
ports:
  - "8080:3306"
```

debe eliminarse para el requisito planteado.

Además, intentar publicar `8080` entraría en conflicto con WordPress.

### C. No existe persistencia

Debe declararse un volumen y montarse, por ejemplo en:

```text
/var/lib/mysql
```

## 3.2 — 1,5

Solución posible:

```yaml
services:
  web:
    image: wordpress
    ports:
      - "8080:80"
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wp
      WORDPRESS_DB_PASSWORD: aula
      WORDPRESS_DB_NAME: wp
    depends_on:
      - db

  db:
    image: mariadb
    environment:
      MARIADB_DATABASE: wp
      MARIADB_USER: wp
      MARIADB_PASSWORD: aula
      MARIADB_ROOT_PASSWORD: root-aula
    volumes:
      - db_data:/var/lib/mysql

volumes:
  db_data:
```

No exigir `version:`.

## 3.3 — 0,7

```bash
docker compose up -d
docker compose ps
docker compose logs
```

También se acepta `docker compose logs db`, etc.

## 3.4 — 0,6

Prueba esperada:

```text
desplegar
→ crear dato en aplicación/BD
→ eliminar/recrear contenedor
→ volver a acceder
→ comprobar que el dato permanece
```

No basta con decir «ver el volumen».

---

# 4. Kubernetes — 1,5 puntos

## 4.1 — 0,4

`Deployment`.

## 4.2 — 0,4

El controlador del Deployment debe crear otro Pod para volver al número deseado:

```text
replicas: 2
```

## 4.3 — 0,5

Deployment:

```yaml
labels:
  app: web
```

Service:

```yaml
selector:
  app: frontend
```

No coincide.

Corrección:

```yaml
selector:
  app: web
```

## 4.4 — 0,2

- Pod: unidad básica de ejecución; contiene uno o varios contenedores relacionados.
- Service: proporciona acceso estable a Pods seleccionados por etiquetas.

---

# Por qué este examen tiene nivel de ciclo superior

No pide simplemente:

```text
crear una GPO
crear un share
escribir un cron
levantar Docker
```

El alumnado debe:

- limitar el ámbito de una política;
- relacionar permisos Linux con Samba;
- detectar un problema de entorno de cron;
- decidir cuándo no utilizar `SIGKILL`;
- interpretar redes internas de Compose;
- detectar falta de persistencia;
- demostrar la persistencia;
- relacionar labels y selectors en Kubernetes.

Todo esto está dentro de la teoría y de las prácticas de la evaluación.

---

# Criterio de compensación

Recomendación:

!!! note "Competencias nucleares"
    Para considerar un dominio sólido de la 2.ª evaluación, Docker/Compose y la integración GPO/Samba deben mostrar competencia real.

Una puntuación conseguida únicamente en preguntas explicativas no debería ocultar una ausencia completa de capacidad práctica.
