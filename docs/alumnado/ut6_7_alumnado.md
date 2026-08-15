---
title: "UT6-7 · Procesos, servicios, planificación y monitorización"
description: "Procesos, señales, systemd, cron y análisis de recursos"
---

## 📊 UT6-7 · Procesos, servicios, planificación y monitorización


!!! info "Cómo trabajaremos"
    Esta unidad pertenece a **2.º ASIR** y se trabaja con **4 horas semanales**:

    - **Lunes (2 h):** práctica autónoma guiada apoyada en este tema.
    - **Martes (2 h):** práctica o problema inicial → preguntas → teoría → consolidación.

    Las prácticas guiadas sirven para aprender la técnica. El **reto final** exige analizar el problema, tomar decisiones, comprobar el resultado y justificar la solución.


!!! note "Unidad compacta"
    Disponemos de **4 horas**. No estudiaremos internals del kernel en profundidad. Nos centraremos en las herramientas que un administrador necesita para observar y actuar.

## 1. Qué debes aprender

- diferenciar programa y proceso;
- identificar PID y PPID;
- observar consumo;
- utilizar señales;
- gestionar procesos;
- comprender servicios `systemd`;
- consultar logs básicos;
- programar tareas con `cron`;
- comprobar que una tarea realmente se ejecuta.

---

## 📖 2. Programa y proceso

Un programa es código almacenado.

Un **proceso** es una instancia en ejecución.

```text
programa: /usr/bin/python3
             ↓ ejecutar
proceso PID 3210
```

Puede haber varios procesos del mismo programa.

---

## 3. PID

Cada proceso posee un identificador:

```text
PID
```

Herramientas:

```bash
ps
ps aux
pgrep
```

Ejemplo:

```bash
ps aux | grep nginx
```

---

## 4. Monitorización

Herramientas interactivas:

```bash
top
htop
```

Permiten observar:

- CPU;
- memoria;
- procesos;
- carga.

!!! warning "Un valor alto no implica automáticamente un fallo"
    Debes observar contexto, duración y función del proceso antes de terminarlo.

---

## 5. Señales

`kill` envía señales.

Ejemplo:

```bash
kill PID
```

solicita normalmente una terminación mediante `SIGTERM`.

Forzar:

```bash
kill -9 PID
```

envía `SIGKILL`.

!!! danger "`kill -9` no es el primer paso"
    `SIGKILL` impide al proceso realizar limpieza. Utilízalo cuando una terminación normal no funciona y entiendas las consecuencias.

---

## 6. Segundo plano

```bash
comando &
```

ejecuta un proceso en background de la shell.

Herramientas relacionadas:

```bash
jobs
fg
bg
nohup
```

---

## 7. Servicios con systemd

Un servicio administrado por systemd no es lo mismo que dejar simplemente un comando en segundo plano.

Comandos:

```bash
systemctl status servicio
systemctl start servicio
systemctl stop servicio
systemctl restart servicio
systemctl enable servicio
```

---

## 8. Logs

Para servicios systemd:

```bash
journalctl
journalctl -u servicio
```

!!! tip "Diagnóstico"
    Ante un servicio que no arranca:

    ```text
    status → logs → configuración → corregir → reiniciar → comprobar
    ```

---

## 9. Cron

`cron` permite programar ejecuciones.

Editor del usuario:

```bash
crontab -e
```

Formato:

```text
minuto hora día_mes mes día_semana comando
```

Ejemplo:

```cron
30 23 * * * /home/alumno/backup.sh
```

Ejecuta a las 23:30 todos los días.

!!! warning "Cron y entorno"
    Una tarea puede funcionar manualmente y fallar desde cron por rutas, permisos o variables de entorno.

    Utiliza rutas absolutas y registra salida cuando estés diagnosticando.

Ejemplo:

```cron
30 23 * * * /home/alumno/backup.sh >> /home/alumno/backup.log 2>&1
```

---

## 🟦 Lunes 08/02 · Sesión 1 — Observar y controlar

###### Trabajo autónomo

1. abre `top`;
2. instala/utiliza `htop` si procede;
3. identifica PID;
4. ejecuta un proceso en segundo plano;
5. localízalo;
6. termina primero de forma normal;
7. prueba `systemctl status` sobre servicios conocidos.

###### Evidencia

Explica por qué no deberías comenzar siempre con:

```bash
kill -9
```

---

## 🟧 Martes 09/02 · Sesión 2 — Cron y reto

###### Práctica inicial

Programa una tarea sencilla cada pocos minutos para comprobar inmediatamente que funciona.

Después cambia a la planificación real.

###### Teoría

- cron;
- rutas absolutas;
- logs;
- entorno;
- comprobación.

## 🎯 Reto UT6-7 · Automatización verificable

Programa el script de backup de la UT1 para que:

1. se ejecute diariamente a la hora indicada;
2. escriba un log;
3. permita comprobar si terminó correctamente;
4. no dependa del directorio desde el que se ejecute.

Además, debes diagnosticar un `cron` preparado que no funciona.

!!! abstract "Tipo examen"
    No bastará escribir una línea de crontab: debes ser capaz de comprobar si la tarea realmente se ejecutó y localizar errores básicos.
