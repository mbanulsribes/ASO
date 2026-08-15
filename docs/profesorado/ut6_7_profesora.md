---
title: "UT6-7 · Guía profesora"
description: "Procesos, systemd, cron y monitorización · 4 horas"
---

# 🧑‍🏫 UT6-7 · Procesos y monitorización


!!! info "Marco metodológico fijo"
    - Nivel: **2.º ASIR / CFGS**.
    - Carga: **4 h semanales**: 2 h lunes + 2 h martes.
    - **Lunes:** sesión autónoma, autocontenida y con preparación docente mínima.
    - **Martes:** práctica → preguntas → teoría → consolidación.
    - El reto final debe medir **autonomía, diagnóstico y justificación**, no reproducción mecánica de una receta.


## Alcance

Solo **4 h**.

No profundices en:

- scheduler del kernel;
- todos los estados internos;
- cgroups avanzados;
- tuning complejo.

Sí exige:

```text
observar
identificar
terminar correctamente
gestionar servicio
leer logs
programar
comprobar
```

## Lunes 08/02

Autónomo.

Comandos clave:

```bash
ps aux
top
htop
kill
jobs
systemctl status
```

!!! danger "Corrige una idea del borrador"
    No enseñes `kill -9 PID` como forma normal de matar procesos.

    Primero se intenta una terminación normal y se escala solo si es necesario.

## Martes 09/02

Práctica cron primero.

Para comprobar rápido, haz que programen temporalmente una ejecución próxima.

Después:

```text
cron real
+ rutas absolutas
+ redirección a log
+ comprobación
```

## Tu chuleta

```bash
crontab -e
journalctl -u servicio
systemctl status servicio
```

## Reto

El backup debe generar log y el alumno debe demostrar que cron **ha ejecutado** la tarea, no solo enseñar `crontab -l`.
